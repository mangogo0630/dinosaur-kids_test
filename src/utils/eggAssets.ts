import egg01Url from '../assets/images/IMG_Egg_01_Light_incubator.png'
import egg02Url from '../assets/images/IMG_Egg_02_Clay_incubator.png'
import egg03Url from '../assets/images/IMG_Egg_03_Music_incubator.png'
import egg04Url from '../assets/images/IMG_Egg_04_Brush_incubator.png'
import egg05Url from '../assets/images/IMG_Egg_05_Flash_incubator.png'

export const EGG_IDS = ['egg01', 'egg02', 'egg03', 'egg04', 'egg05'] as const

const EGG_IMAGE_URLS: readonly string[] = [
  egg01Url,
  egg02Url,
  egg03Url,
  egg04Url,
  egg05Url,
]

export function resolveEggImageByIndex(index: number): string {
  return EGG_IMAGE_URLS[index] ?? egg01Url
}
