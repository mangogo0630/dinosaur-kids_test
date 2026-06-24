import cafLogoUrl from '../assets/images/CafLogo.png'
import cameraFaceUrl from '../assets/images/CameraFace.png'
import coverBgUrl from '../assets/images/CoverBG.png'
import dialogBgUrl from '../assets/images/Dialog.png'
import doctorImageUrl from '../assets/images/Doctor.png'
import downloadIconUrl from '../assets/images/Download.png'
import flashDecoUrl from '../assets/images/FlashDeco1.png'
import mainLogoUrl from '../assets/images/MainLogo.png'
import titleBgUrl from '../assets/images/TitleBg.png'
import circuitBoardBluePurpleUrl from '../assets/images/電路板_藍紫.png'
import circuitBoardPinkUrl from '../assets/images/電路板_粉.png'
import cardBg1Url from '../assets/images/恐龍小卡_底圖1.png'
import cardBg2Url from '../assets/images/恐龍小卡_底圖2.png'
import cardBg3Url from '../assets/images/恐龍小卡_底圖3.png'
import cardBg4Url from '../assets/images/恐龍小卡_底圖4.png'
import cardBg5Url from '../assets/images/恐龍小卡_底圖5.png'
import dinoHumanBrushUrl from '../assets/images/IMG_DinoHuman_Brush.png'
import dinoHumanClayUrl from '../assets/images/IMG_DinoHuman_Clay.png'
import dinoHumanFlashUrl from '../assets/images/IMG_DinoHuman_Flash.png'
import dinoHumanLightUrl from '../assets/images/IMG_DinoHuman_Light.png'
import dinoHumanMusicUrl from '../assets/images/IMG_DinoHuman_Music.png'
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
import {
  ensureCriticalFontsLoaded,
  ensureTimerFontLoaded,
} from './fonts'

const CRITICAL_IMAGE_URLS = [
  coverBgUrl,
  mainLogoUrl,
  cafLogoUrl,
  doctorImageUrl,
  titleBgUrl,
  dialogBgUrl,
  egg01Url,
  egg02Url,
  egg03Url,
  egg04Url,
  egg05Url,
  eggIcon01Url,
  eggIcon02Url,
  eggIcon03Url,
  eggIcon04Url,
  eggIcon05Url,
  circuitBoardBluePurpleUrl,
] as const

const DEFERRED_IMAGE_URLS = [
  circuitBoardPinkUrl,
  flashDecoUrl,
  cameraFaceUrl,
  downloadIconUrl,
  cardBg1Url,
  cardBg2Url,
  cardBg3Url,
  cardBg4Url,
  cardBg5Url,
  dinoHumanLightUrl,
  dinoHumanClayUrl,
  dinoHumanMusicUrl,
  dinoHumanBrushUrl,
  dinoHumanFlashUrl,
] as const

const MIN_LOADER_VISIBLE_MS = 480

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })
}

export async function preloadCriticalAssets(timeoutMs = 12000): Promise<void> {
  const total = 1 + CRITICAL_IMAGE_URLS.length
  let done = 0

  const tickProgress = () => {
    done += 1
    updateBootstrapProgress(done, total)
  }

  await Promise.race([
    Promise.all([
      ensureCriticalFontsLoaded().then(tickProgress),
      ...CRITICAL_IMAGE_URLS.map((url) => preloadImage(url).then(tickProgress)),
    ]),
    delay(timeoutMs),
  ])

  updateBootstrapProgress(total, total)
}

function updateBootstrapProgress(done: number, total: number): void {
  const percent = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0
  const fill = document.querySelector<HTMLElement>('.bootstrap-progress-fill')
  const shell = document.querySelector<HTMLElement>('.bootstrap-progress-shell')

  if (fill) {
    fill.style.width = `${percent}%`
  }

  if (shell) {
    shell.setAttribute('aria-valuenow', String(percent))
  }
}

export function preloadDeferredAssets(): void {
  void Promise.all([
    ensureTimerFontLoaded(),
    ...DEFERRED_IMAGE_URLS.map((url) => preloadImage(url)),
  ])
}

export function dismissBootstrapLoader(): void {
  const loader = document.getElementById('bootstrap-loader')
  if (!loader) {
    return
  }

  loader.classList.add('bootstrap-loader--hide')
  loader.setAttribute('aria-busy', 'false')

  window.setTimeout(() => {
    loader.remove()
  }, 360)
}

export async function waitForMinLoaderVisible(startedAt: number): Promise<void> {
  const elapsed = performance.now() - startedAt
  if (elapsed < MIN_LOADER_VISIBLE_MS) {
    await delay(MIN_LOADER_VISIBLE_MS - elapsed)
  }
}
