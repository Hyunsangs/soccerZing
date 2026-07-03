# 12. 폴더구조

---

React Native 프로젝트 기준 추천 구조입니다. Firebase 연동, 사운드 자산, 화면 구조(⑥ IA)를 반영했습니다.

```
haptic-football/
├── src/
│   ├── screens/
│   │   ├── onboarding/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── HapticPreviewScreen.tsx
│   │   │   ├── LeagueSelectScreen.tsx
│   │   │   ├── TeamSelectScreen.tsx
│   │   │   ├── NotificationPermissionScreen.tsx
│   │   │   └── WatchSilentModeGuideScreen.tsx      # ⑤ 신규 스텝
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── following/
│   │   │   └── FollowingScreen.tsx
│   │   ├── matchDetail/
│   │   │   └── MatchDetailScreen.tsx
│   │   └── settings/
│   │       ├── SettingsScreen.tsx
│   │       └── HapticGuideScreen.tsx
│   │
│   ├── components/
│   │   ├── common/                # 버튼, 카드 등 공통 UI
│   │   ├── match/                 # 경기 카드, 스코어 표시 등
│   │   └── haptic/                # 햅틱 프리뷰 재생 버튼 등
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── OnboardingNavigator.tsx
│   │   └── MainTabNavigator.tsx    # 홈/팔로잉/설정 탭
│   │
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── firestore.ts        # follows, devices CRUD
│   │   │   ├── messaging.ts        # FCM 토큰 등록/수신 처리
│   │   │   └── auth.ts             # 익명 인증
│   │   └── api/
│   │       └── footballApi.ts      # (클라이언트에서 직접 호출 필요한 경우만, 기본은 서버 경유)
│   │
│   ├── hooks/
│   │   ├── useFollowedMatches.ts
│   │   ├── useMatchList.ts
│   │   └── useNotificationPermission.ts
│   │
│   ├── store/                      # 전역 상태 관리 (Zustand/Redux 등)
│   │   ├── userPreferences.ts
│   │   └── onboardingStatus.ts
│   │
│   ├── types/
│   │   ├── match.ts
│   │   ├── event.ts                # 골/VAR/카드 등 이벤트 타입 정의
│   │   └── device.ts
│   │
│   └── constants/
│       ├── hapticEvents.ts         # 이벤트 타입 ↔ 사운드 파일명 매핑 상수
│       └── leagues.ts              # EPL/World Cup ID 상수
│
├── assets/
│   ├── sounds/                     # ⑧ Haptic Design 산출물
│   │   ├── goal.caf
│   │   ├── var.caf
│   │   ├── yellow_card.caf
│   │   ├── red_card.caf
│   │   ├── kickoff.caf
│   │   ├── halftime.caf
│   │   └── fulltime.caf
│   └── images/
│
├── functions/                      # Firebase Cloud Functions (백엔드)
│   ├── src/
│   │   ├── pollingWorker.ts        # ⑩ Polling Worker
│   │   ├── diffEngine.ts           # 이벤트 diff 감지 로직
│   │   ├── fanOutService.ts        # 팔로워 조회 + FCM 발송
│   │   ├── soundMapper.ts          # 이벤트 타입 → 사운드 파일명 매핑
│   │   └── footballApiClient.ts    # API-Football 호출 래퍼
│   └── index.ts
│
├── ios/                             # RN 기본 iOS 네이티브 프로젝트 (별도 워치 타겟 없음)
│
├── firestore.rules                  # Firestore 보안 규칙
├── app.json
├── package.json
└── README.md
```

#### 구조 설계 포인트

- `functions/`가 곧 ⑩ Backend Architecture 문서의 실제 구현체입니다. 앱(`src/`)과 완전히 분리되어 있어, 백엔드 로직 변경이 앱 배포에 영향을 주지 않습니다.
- `constants/hapticEvents.ts`가 ⑧ Haptic Design 문서의 "이벤트 타입 ↔ 사운드 파일" 매핑표를 코드로 그대로 옮긴 파일이 됩니다. 이 파일 하나가 앱과 서버(`soundMapper.ts`) 양쪽에서 동일한 이벤트 타입 값을 참조하는 기준점 역할을 해야 합니다 (④ Scope의 확장성 원칙: "이벤트 타입 표준화").
- `ios/` 안에 별도 watchOS 타겟이 없는 것이 이번 논의의 핵심 결론을 그대로 반영한 부분입니다.