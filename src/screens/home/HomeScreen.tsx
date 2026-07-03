import { StyleSheet, Text, View } from 'react-native'

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘/예정 경기 목록</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
