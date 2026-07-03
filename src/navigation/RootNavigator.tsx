import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OnboardingNavigator } from './OnboardingNavigator'
import { MainTabNavigator } from './MainTabNavigator'
import { MatchDetailScreen } from '../screens/matchDetail/MatchDetailScreen'
import { HapticGuideScreen } from '../screens/settings/HapticGuideScreen'
import { useOnboardingStatus } from '../store/onboardingStatus'

export type RootStackParamList = {
  Onboarding: undefined
  MainTabs: undefined
  MatchDetail: { fixtureId: string }
  HapticGuide: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const isOnboardingComplete = useOnboardingStatus((state) => state.isComplete)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingComplete && (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen
          name="MatchDetail"
          component={MatchDetailScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name="HapticGuide" component={HapticGuideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
