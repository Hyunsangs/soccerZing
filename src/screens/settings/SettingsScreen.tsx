import { StyleSheet, Text, View } from 'react-native'

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
