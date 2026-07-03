# 10. 백엔드 아키텍쳐

---

## ⑩ Backend Architecture

---

### 1. 결론부터: 백엔드는 반드시 필요합니다

④ MVP Scope 초기에는 "로그인 없음", "최소 기능"을 강조했지만, ⑨ API Architecture에서 확정한 구조(서버가 중앙에서 Polling → Fan-out 푸시) 자체가 **서버 없이는 성립하지 않습니다.** 이유를 명확히 정리하면:

| 이유 | 설명 |
| --- | --- |
| Rate Limit 대응 | 사용자 각자의 폰이 API-Football을 직접 호출하면 즉시 한도 초과. 반드시 서버가 대신 폴링해야 함 |
| Fan-out 푸시 | "이 경기를 팔로우하는 모든 사용자"에게 한 번에 발송하려면 팔로우 관계를 저장하고 매칭하는 서버 로직 필요 |
| 이벤트 Diff 감지 | 이전 폴링 결과와 비교(diff)하려면 상태를 어딘가에 저장해야 함 (클라이언트가 각자 들고 있을 수 없음) |
| 사운드 매핑 관리 | 이벤트 타입 → 사운드 파일 매핑 로직을 중앙에서 관리해야 향후 패턴 조정이 쉬움 |

**즉 "백엔드가 필요한가?"가 아니라 "얼마나 최소한으로 만들 수 있는가"가 이 문서의 진짜 질문입니다.**

---

### 2. MVP 최소 백엔드 구성

MVP 원칙(④)에 따라, 전통적인 "회원가입 + DB + 관리자 페이지"를 갖춘 풀스택 백엔드가 아니라 **딱 필요한 4개 기능만 하는 경량 백엔드**로 설계합니다.

```
┌─────────────────────────────────────────────┐
│                MVP Backend (경량 구성)              │
│                                               │
│  1. Polling Worker  (경기 이벤트 주기적 조회)         │
│  2. Diff Engine     (이전 상태와 비교, 신규 이벤트 감지) │
│  3. Fan-out Service (팔로워 조회 + 푸시 발송)          │
│  4. 최소 데이터 저장소 (팔로우 관계, 디바이스 토큰, 최근 이벤트) │
└─────────────────────────────────────────────┘
```

#### 필요 없는 것 (명시적 배제)

- 회원가입/로그인 시스템 (④ Scope에서 이미 배제 — 대신 익명 디바이스 토큰 기반으로 식별)
- 관리자 대시보드 (수동 모니터링은 로그/알림으로 충분, MVP 단계)
- 복잡한 마이크로서비스 분리 (단일 서버/서버리스 함수 묶음으로 충분)

---

### 3. 추천 구조: 서버리스 우선 (Serverless-First)

MVP 단계에서는 **직접 서버를 상시 운영하는 것보다 서버리스 아키텍처**를 추천합니다.

| 구성 요소 | 추천 방식 | 이유 |
| --- | --- | --- |
| Polling Worker | 스케줄 함수 (Cron 기반, 예: Firebase Cloud Functions Scheduled Function) | 경기 있을 때만 짧은 주기로 실행, 없을 때는 비용 0에 가까움 |
| 데이터 저장 | Firestore (또는 유사 NoSQL) | 스키마가 단순(팔로우 관계, 디바이스 토큰, 최근 이벤트 스냅샷)해서 관계형 DB 불필요, 실시간 SDK로 클라이언트 연동도 쉬움 |
| 푸시 발송 | Firebase Cloud Messaging (FCM) | iOS(APNs)를 FCM이 감싸서 처리 가능, **④ Scope의 확장성 원칙(Android 대비)과 정확히 일치** |
| 인증 (최소) | 익명 디바이스 식별자만 (Firebase Anonymous Auth 또는 자체 UUID 발급) | 로그인 없이도 "이 디바이스가 어떤 경기를 팔로우하는지" 식별 가능 |

> 이 구성을 추천하는 이유는 단순히 "Firebase가 편해서"가 아니라, MVP가 검증되지 않은 상태에서 **트래픽이 0에 가까울 수도, 갑자기 몰릴 수도 있는 불확실성**에 대응하기 좋기 때문입니다. 상시 서버(EC2 등)를 미리 띄워두면 트래픽이 없어도 고정 비용이 나가지만, 서버리스는 사용한 만큼만 비용이 발생합니다. (⑪ Tech Stack에서 이 선택의 근거를 더 상세히 다루겠습니다.)
> 

---

### 4. 데이터 모델 (최소 스키마)

```
[devices]
  - device_id (PK, 익명 식별자)
  - fcm_token (푸시 발송 대상)
  - platform (ios / 향후 android 대비 필드는 미리 마련)
  - created_at

[follows]
  - device_id (FK)
  - fixture_id (팔로우한 경기 ID, API-Football 기준)
  - team_filter (관심 팀 ID, 선택적)
  - created_at

[fixtures_cache]
  - fixture_id (PK)
  - league_id
  - status (예정/진행중/하프타임/종료)
  - last_polled_at
  - last_events_snapshot (직전 폴링 시점의 이벤트 리스트, diff 비교용)

[user_preferences] (설정 탭 대응)
  - device_id (FK)
  - notification_enabled (boolean)
  - favorite_teams (array)
```

> 4개 테이블(컬렉션)로 MVP 전체가 커버됩니다. 이는 ④ Scope에서 "로그인/회원가입 없음"을 결정한 것이 데이터 모델 단순화로 그대로 이어진 결과입니다.
> 

---

### 5. Polling Worker 상세 동작

```
[스케줄 함수, 주기적 실행]
  ↓
1. fixtures_cache에서 "진행중(live)" 상태인 경기 목록 조회
  ↓
2. 각 경기에 대해 follows 테이블에 팔로워가 1명 이상 있는지 확인
   → 팔로워 없는 경기는 폴링 대상에서 제외 (⑨ API Architecture 4-1 원칙)
  ↓
3. 대상 경기에 대해 API-Football /fixtures/events 호출
  ↓
4. last_events_snapshot과 비교(diff) → 신규 이벤트 추출
  ↓
5. 신규 이벤트 있으면:
   a. 이벤트 타입 → 사운드 파일명 매핑
   b. follows 테이블에서 해당 fixture_id를 팔로우하는 device_id 목록 조회
   c. FCM으로 Fan-out 발송 (payload에 sound 파일명 포함)
  ↓
6. fixtures_cache의 last_events_snapshot 갱신
  ↓
7. 경기 상태가 "종료"로 바뀌면 해당 경기를 polling 대상에서 제외
```

---

### 6. 인프라 다이어그램 (전체 조합)

```
┌───────────────────┐
│   API-Football       │
└─────────┬───────────┘
          │ (Scheduled Function, 15~30초 간격)
          ▼
┌─────────────────────────────┐
│   Firebase Cloud Functions      │
│   - Polling Worker              │
│   - Diff Engine                 │
│   - Fan-out 발송 로직             │
└─────────┬───────────────────────┘
          │             ▲
          ▼             │ 읽기/쓰기
┌─────────────────┐     │
│    Firestore        │◄────┘
│  (devices, follows,  │
│   fixtures_cache 등)  │
└─────────────────┘
          │
          ▼
┌─────────────────────┐
│   Firebase Cloud        │
│   Messaging (FCM)       │
└─────────┬───────────────┘
          │
          ▼
┌─────────────┐      ┌──────────────────┐
│  iPhone 알림    │─────▶│  Apple Watch (미러링) │
└─────────────┘      └──────────────────┘

┌─────────────────────┐
│  React Native 앱          │
│  (홈/팔로잉/설정)           │
│  Firestore 직접 조회/구독    │  ← 경기 목록, 팔로우 상태 등은
└─────────────────────┘     클라이언트가 Firestore SDK로 직접 읽기 가능
                              (서버 API를 별도로 안 만들어도 됨)
```

> 마지막 부분이 서버리스 구조의 실질적 이점입니다. "홈 화면에 경기 목록 보여주기", "팔로우 등록/해제" 같은 단순 CRUD는 **React Native 앱이 Firestore SDK로 직접 읽고 쓰면 되므로, 별도의 REST API 서버를 만들 필요가 없습니다.** 백엔드 개발 리소스가 실질적으로 "Polling Worker 로직" 하나에 집중될 수 있습니다.
> 

---

### 7. 운영 관점에서 고려할 점

| 항목 | MVP 대응 |
| --- | --- |
| 모니터링 | Firebase Console의 기본 로그/알림으로 충분 (별도 대시보드 구축 안 함) |
| 장애 대응 | Polling 실패 시 다음 주기에 diff로 자동 보정 (⑨ 문서 4-3 참고), 별도 알림 재전송 로직은 P1로 후순위 |
| 비용 관리 | API-Football 월 호출 한도 근접 시 로그 기반 수동 확인 (자동 알림은 P1) |
| 확장 대비 | fixtures_cache, follows 등 스키마에 `platform` 필드를 미리 넣어둬 Android 확장 시 테이블 구조 변경 최소화 |

---

### 8. MVP 백엔드 결론 요약
| 질문 | 답변 |
| --- | --- |
| 백엔드가 필요한가? | **필요함** (Rate Limit, Fan-out, Diff 감지 때문에 클라이언트만으로 불가능) |
| 최소 구조로 가능한가? | **가능함** — 서버리스 함수 1개(Polling Worker) + Firestore + FCM 조합으로 충분 |
| 별도 REST API 서버가 필요한가? | **불필요** — CRUD성 기능은 클라이언트가 Firestore를 직접 사용 |
| 회원 시스템이 필요한가? | **불필요** — 익명 디바이스 식별자로 충분 |