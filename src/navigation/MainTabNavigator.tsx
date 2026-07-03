import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens/home/HomeScreen'
import { FollowingScreen } from '../screens/following/FollowingScreen'
import { SettingsScreen } from '../screens/settings/SettingsScreen'

export type MainTabParamList = {
  Home: undefined
  Following: undefined
  Settings: undefined
}

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Following" component={FollowingScreen} options={{ title: '팔로잉' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
    </Tab.Navigator>
  )
}
