import { StyleSheet, Text, View } from 'react-native'

export function MatchDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>경기 상세 (스코어, 상태, 이벤트 요약)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
