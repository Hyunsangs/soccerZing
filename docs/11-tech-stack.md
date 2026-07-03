

### 1. 전체 스택 요약

| 영역 | 선택 기술 |
| --- | --- |
| 메인 앱 (iOS) | React Native |
| 워치 진동 | 별도 네이티브 코드 없음 (iPhone 알림 미러링) |
| 백엔드 | Firebase Cloud Functions (서버리스) |
| 데이터베이스 | Firestore |
| 푸시 발송 | Firebase Cloud Messaging (FCM) |
| 외부 데이터 | API-Football |
| 사운드/진동 산출물 | 커스텀 `.caf` 오디오 파일 (오디오 편집 툴로 제작) |

---

### 2. 왜 React Native인가

| 근거 | 설명 |
| --- | --- |
| 팀 역량 | 개발자가 React 기반 개발에 익숙 → MVP 속도가 가장 중요한 단계에서 학습 비용 최소화 |
| 워치 문제와 무관해짐 | Core Haptics/WatchKit 네이티브 브릿지가 전부 배제되면서, RN을 선택함으로써 손해 보는 지점이 사실상 사라짐 |
| 화면 대부분이 단순 CRUD/리스트 UI | 온보딩, 홈, 팔로잉, 설정 등 RN이 가장 잘하는 영역과 일치 |
| 향후 Android 확장 용이성 | 메인 앱 코드(화면, 로직, Firestore 연동)를 거의 그대로 재사용 가능 |

### 3. 왜 Firebase인가

| 근거 | 설명 |
| --- | --- |
| 서버리스로 비용 통제 | 트래픽 불확실한 초기 단계에서 상시 서버 고정비 없이, 쓴 만큼만 과금 |
| Firestore + 클라이언트 SDK 직접 연동 | 별도 REST API 서버 없이 RN 앱이 직접 CRUD 가능, 백엔드 개발 범위 최소화 |
| FCM의 크로스플랫폼 특성 | iOS(APNs)를 감싸서 처리, 향후 Android 확장 시 발송 로직 재사용 (④ Scope의 확장성 원칙과 일치) |
| Scheduled Functions | Polling Worker를 Cron 방식으로 가볍게 구현 가능 |
| 회원 시스템 불필요 | 익명 인증만으로 충분 (④ Scope 결정과 일치), Firebase Anonymous Auth로 최소 구현 |

### 4. 왜 API-Football인가

| 근거 | 설명 |
| --- | --- |
| MVP 예산 적합성 | 무료/저가 플랜으로 초기 검증 가능 (Sportmonks 대비 진입장벽 낮음) |
| REST 기반 단순 구조 | Polling 아키텍처와 자연스럽게 맞음, WebSocket 인프라 불필요 |
| EPL/World Cup 커버리지 | MVP 범위 리그 데이터 지원 확인됨 |
| 리스크 | VAR 이벤트의 정확도/지연은 계약 전 실측 필요 (⑨ 문서에서 이미 명시) |

### 5. 사운드/진동 산출물 제작 도구 (참고)

| 용도 | 추천 도구 |
| --- | --- |
| 파형 설계 및 미리듣기 | Apple의 Haptic 관련 파형 편집 도구, 또는 범용 오디오 편집기(예: GarageBand, Audacity) |
| 최종 `.caf` 변환 | `afconvert` (macOS 내장 커맨드라인 도구)로 표준 오디오 파일을 `.caf`로 변환 |

### 6. 채택하지 않은 대안과 이유

| 대안 | 배제 이유 |
| --- | --- |
| Full Native (Swift/SwiftUI) | 워치 문제가 RN과 무관해진 시점에서, 팀 역량 대비 학습 비용만 늘어남 |
| 자체 서버(Node.js + Express + PostgreSQL 등 상시 운영) | MVP 단계 트래픽 불확실성 대비 고정비 부담, 스키마도 단순해 관계형 DB 이점이 적음 |
| WebSocket 기반 실시간 스트리밍 | API-Football 미지원, 인프라 복잡도 대비 실익 적음 (⑨ 문서 참고) |
| Sportmonks | 가격 진입장벽, MVP 검증 단계엔 과함 |