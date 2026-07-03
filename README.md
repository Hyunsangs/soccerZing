# soccerZing (Haptic Football)

화면을 보지 않아도, 진동 패턴만으로 축구 경기의 흐름(골 / VAR / 카드 / 하프타임 / 종료)을 몸으로 느끼는 iOS 앱입니다.

> "화면을 보지 않아도, 경기가 지금 어떻게 흘러가고 있는지 몸이 먼저 안다." — [docs/01-vision.md](docs/01-vision.md)

## 프로젝트 문서

기획 배경부터 아키텍처까지는 [docs/](docs/) 참고.

| 문서 | 내용 |
| --- | --- |
| [01-vision.md](docs/01-vision.md) | 프로젝트 비전 |
| [02-persona.md](docs/02-persona.md) | 유저 페르소나 |
| [03-scenario.md](docs/03-scenario.md) | 유저 시나리오 |
| [04-mvp-scope.md](docs/04-mvp-scope.md) | MVP 범위 |
| [05-user-flow.md](docs/05-user-flow.md) | 유저 플로우 |
| [06-ia.md](docs/06-ia.md) | 정보 구조(IA) |
| [07-feature-list.md](docs/07-feature-list.md) | 기능 리스트 |
| [08-haptic-design.md](docs/08-haptic-design.md) | 햅틱 디자인 (핵심) |
| [09-api-architecture.md](docs/09-api-architecture.md) | API 아키텍처 |
| [10-backend-architecture.md](docs/10-backend-architecture.md) | 백엔드 아키텍처 |
| [11-tech-stack.md](docs/11-tech-stack.md) | 기술 스택 |
| [12-folder-structure.md](docs/12-folder-structure.md) | 폴더 구조 |
| [13-release-plan.md](docs/13-release-plan.md) | 릴리즈 플랜 |
| [14-risks.md](docs/14-risks.md) | 리스크 |

작업 방식, 코드/커밋 규칙은 [CLAUDE.md](.claude/CLAUDE.md) 참고.

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| 앱 | React Native (Expo, TypeScript) |
| 백엔드 | Firebase Cloud Functions |
| DB | Firestore |
| 푸시 | Firebase Cloud Messaging (FCM) |
| 외부 데이터 | API-Football |
| 상태관리 | Zustand + Firestore 실시간 구독 |

## 시작하기

### 사전 준비

- Node.js는 `.nvmrc`에 명시된 버전 사용 (`nvm use`)
- 앱 실행용 Firebase 설정값은 `.env.example`을 복사해 `.env`로 채워넣기 (커밋 금지)

### 앱 (루트)

```bash
yarn install
yarn ios          # iOS 시뮬레이터 실행
yarn typecheck
yarn lint
yarn test
```

### 백엔드 (functions/)

```bash
cd functions
yarn install
yarn build
yarn test
firebase emulators:start   # 로컬 Functions + Firestore 에뮬레이션
```

## 폴더 구조

앱은 `src/{screens,components,navigation,services,hooks,store,types,constants}`, 백엔드는 `functions/src/`로 분리되어 있습니다. 자세한 구조는 [12-folder-structure.md](docs/12-folder-structure.md) 참고.
