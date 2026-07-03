export interface Device {
  deviceId: string
  fcmToken: string
  platform: 'ios' | 'android'
  createdAt: string
}
