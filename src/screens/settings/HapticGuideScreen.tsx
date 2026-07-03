import { StyleSheet, Text, View } from 'react-native'

export function HapticGuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>햅틱 패턴 가이드 (이벤트별 진동 다시 듣기)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
