import { StyleSheet, Text, View } from 'react-native'

export function NotificationPermissionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림 권한이 없으면 핵심 기능을 사용할 수 없어요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
