import { StyleSheet, Text, View } from 'react-native'

export function FollowingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>팔로우 중인 경기</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center' },
})
