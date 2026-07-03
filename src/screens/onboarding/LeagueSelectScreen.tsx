import { StyleSheet, Text, View } from 'react-native'

export function LeagueSelectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>리그 선택 (EPL / FIFA World Cup)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
