import { reactive } from 'vue'

type HatchSessionState = {
  selectedEggIndex: number
  dinoStatus: string
  dinoType: string
  dinoName: string
  showID: string
  imageName: string
  avatarDataUrl: string | null
  avatarBlob: Blob | null
  
}

const initialState = (): HatchSessionState => ({
  selectedEggIndex: 0,
  dinoStatus: '可愛的',
  dinoType: '燈光怪',
  dinoName: '可愛的燈光怪',
  showID: 'no_showid',
  imageName: 'unassigned',
  avatarDataUrl: null,
  avatarBlob: null
})

export const hatchSession = reactive<HatchSessionState>(initialState())

export function resetHatchSession() {
  Object.assign(hatchSession, initialState())
}
