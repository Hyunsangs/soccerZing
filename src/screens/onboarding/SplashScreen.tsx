import { StyleSheet, Text, View } from 'react-native'

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>화면을 보지 않아도, 경기의 흐름을 몸으로 느껴보세요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, textAlign: 'center', fontWeight: '600' },
})
