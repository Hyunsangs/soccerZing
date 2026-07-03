# soccerZing (Haptic Football)

화면을 보지 않아도 진동 패턴만으로 축구 경기 흐름(골/VAR/카드/하프타임/종료)을 느끼게 하는 iOS 앱. 자세한 배경은 [docs/](docs/) 참고 (특히 [01-vision.md](docs/01-vision.md), [08-haptic-design.md](docs/08-haptic-design.md)).

## 작업 방식

- **검증 먼저, 화면 나중**: 햅틱/사운드 파형 구분 가능 여부와 API-Football 이벤트 데이터(특히 VAR)는 이 제품이 성립하는지를 결정하는 전제다. 관련 기능을 건드릴 땐 화면 UI보다 이 가정이 아직 유효한지부터 확인한다. ([13-release-plan.md](docs/13-release-plan.md), [14-risks.md](docs/14-risks.md))
- **이벤트 타입은 단일 소스로 관리**: 이벤트 종류(goal/var/yellow_card/red_card/kickoff/halftime/fulltime)와 사운드 파일명 매핑은 앱과 서버(functions)가 같은 상수를 참조해야 한다. 새 이벤트 타입 추가 시 양쪽을 함께 수정.
- **서버는 최소로, 클라이언트가 직접 Firestore를 다룬다**: 단순 CRUD(팔로우 등록/해제, 목록 조회)는 REST API를 새로 만들지 않고 클라이언트가 Firestore SDK로 직접 처리한다. 별도 API 서버가 필요한 로직인지 먼저 판단할 것. ([10-backend-architecture.md](docs/10-backend-architecture.md))
- **API 호출은 항상 서버 중앙 집중**: 클라이언트가 API-Football을 직접 호출하는 코드는 절대 추가하지 않는다 (Rate Limit 즉시 초과). Polling은 항상 `functions/`에서만.
- **작은 단위로 검증하며 진행**: 기능 하나 구현 후 바로 실기기/에뮬레이터로 확인. 특히 백그라운드 알림/진동 관련 변경은 반드시 앱을 완전히 종료한 상태에서 테스트.

## 기술 스택 & 명령어

| 영역 | 기술 |
| --- | --- |
| 앱 | React Native (TypeScript, iOS 우선) |
| 백엔드 | Firebase Cloud Functions (서버리스) |
| DB | Firestore |
| 푸시 | Firebase Cloud Messaging (FCM) |
| 외부 데이터 | API-Football |
| 상태관리 | Zustand (전역 UI/설정 상태) + Firestore `onSnapshot` 구독 훅 (서버 상태) — 별도 서버 상태 라이브러리(React Query 등) 없이 Firestore 실시간 구독으로 충분 |

```bash
# 앱 (루트)
yarn install              # 의존성 설치
yarn ios                  # iOS 시뮬레이터 실행
yarn typecheck            # tsc --noEmit
yarn lint                 # eslint
yarn test                 # jest (RN Testing Library)

# 백엔드 (functions/)
cd functions
yarn install
yarn build                # tsc
yarn test                 # jest
firebase emulators:start  # 로컬에서 Functions + Firestore 에뮬레이션
firebase deploy --only functions   # 배포 (사용자 확인 후에만)
```

## 하지 말아야 할 것

- `any` 타입 금지
- `console.log` 남기지 말 것
- `.env` 파일 커밋 금지

## 코드 규칙

- TypeScript strict 모드
- 들여쓰기 2칸, 세미콜론 없음
- 컴포넌트는 함수형 + hooks만 사용 (클래스 컴포넌트 금지)
- 서버 상태는 Firestore 구독 훅(`src/hooks/`)으로 감싸고, 컴포넌트에서 직접 Firestore 호출하지 않기
- 이벤트 타입/사운드 매핑 등 도메인 상수는 `src/constants/`, `functions/src/`에서 각각 하나의 파일로 관리

## 테스트

- 앱: Jest + React Native Testing Library — 훅/유틸 로직과 화면 렌더링 단위 테스트
- Functions: Jest — Polling/Diff/Fan-out 로직은 API-Football 응답을 목(mock)으로 구성해 diff 감지 정확성 위주로 테스트
- 햅틱/사운드 파형 구분은 자동화 테스트로 검증 불가 → 실기기 블라인드 테스트로만 검증 ([08-haptic-design.md](docs/08-haptic-design.md) 7번 참고)

## 커밋 규칙

- 형식: `feat:` / `fix:` / `refactor:` / `docs:`
- 커밋 메시지는 한글 가능
- PR 단위: 기능 하나당 PR 하나
- 커밋하기 전에 테스트를 거치고 확인하고 커밋