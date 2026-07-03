import { StyleSheet, Text, View } from 'react-native'

export function HapticPreviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>골 / VAR / 카드 진동 미리 느껴보기</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
