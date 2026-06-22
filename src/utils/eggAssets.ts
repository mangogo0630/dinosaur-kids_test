import egg01Url from '../assets/images/IMG_Egg_01_Light_incubator.png'
import egg02Url from '../assets/images/IMG_Egg_02_Clay_incubator.png'
import egg03Url from '../assets/images/IMG_Egg_03_Music_incubator.png'
import egg04Url from '../assets/images/IMG_Egg_04_Brush_incubator.png'
import egg05Url from '../assets/images/IMG_Egg_05_Flash_incubator.png'
import eggIcon01Url from '../assets/images/Img_Icon_Egg_Light.png'
import eggIcon02Url from '../assets/images/Img_Icon_Egg_Clay.png'
import eggIcon03Url from '../assets/images/Img_Icon_Egg_Music.png'
import eggIcon04Url from '../assets/images/Img_Icon_Egg_Brush.png'
import eggIcon05Url from '../assets/images/Img_Icon_Egg_Flash.png'

export const EGG_IDS = ['egg01', 'egg02', 'egg03', 'egg04', 'egg05'] as const

const EGG_IMAGE_URLS: readonly string[] = [
  egg01Url,
  egg02Url,
  egg03Url,
  egg04Url,
  egg05Url,
]

const EGG_ICON_URLS: readonly string[] = [
  eggIcon01Url,
  eggIcon02Url,
  eggIcon03Url,
  eggIcon04Url,
  eggIcon05Url,
]

export function resolveEggImageByIndex(index: number): string {
  return EGG_IMAGE_URLS[index] ?? egg01Url
}

export function resolveEggIconByIndex(index: number): string {
  return EGG_ICON_URLS[index] ?? eggIcon01Url
}
