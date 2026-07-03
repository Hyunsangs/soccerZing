import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SplashScreen } from '../screens/onboarding/SplashScreen'
import { HapticPreviewScreen } from '../screens/onboarding/HapticPreviewScreen'
import { LeagueSelectScreen } from '../screens/onboarding/LeagueSelectScreen'
import { TeamSelectScreen } from '../screens/onboarding/TeamSelectScreen'
import { NotificationPermissionScreen } from '../screens/onboarding/NotificationPermissionScreen'
import { WatchSilentModeGuideScreen } from '../screens/onboarding/WatchSilentModeGuideScreen'

export type OnboardingStackParamList = {
  Splash: undefined
  HapticPreview: undefined
  LeagueSelect: undefined
  TeamSelect: undefined
  NotificationPermission: undefined
  WatchSilentModeGuide: undefined
}

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="HapticPreview" component={HapticPreviewScreen} />
      <Stack.Screen name="LeagueSelect" component={LeagueSelectScreen} />
      <Stack.Screen name="TeamSelect" component={TeamSelectScreen} />
      <Stack.Screen name="NotificationPermission" component={NotificationPermissionScreen} />
      <Stack.Screen name="WatchSilentModeGuide" component={WatchSilentModeGuideScreen} />
    </Stack.Navigator>
  )
}
