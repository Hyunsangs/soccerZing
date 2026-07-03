import { StyleSheet, Text, View } from 'react-native'

/**
 * Only shown when an Apple Watch pairing is detected (docs/05-user-flow.md).
 */
export function WatchSilentModeGuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회의 중에도 몰래 확인하고 싶다면? 워치를 무음 모드로 설정하세요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
