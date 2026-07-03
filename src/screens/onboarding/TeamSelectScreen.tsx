import { StyleSheet, Text, View } from 'react-native'

export function TeamSelectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심 팀 선택</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
