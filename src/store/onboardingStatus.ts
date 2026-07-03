import { create } from 'zustand'

interface OnboardingStatusState {
  isComplete: boolean
  markComplete: () => void
}

export const useOnboardingStatus = create<OnboardingStatusState>((set) => ({
  isComplete: false,
  markComplete: () => set({ isComplete: true }),
}))
