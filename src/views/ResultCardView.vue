<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'

import { hatchSession, resetHatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import PrintReadyModal from '../components/PrintReadyModal.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import { resolveEggIconByIndex } from '../utils/eggAssets'
import { buildZhCanvasFont, ensureZhFontLoaded } from '../utils/fonts'
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
import downloadIconUrl from '../assets/images/Download.png'

const router = useRouter()
const cardBackgrounds = [cardBg1Url, cardBg2Url, cardBg3Url, cardBg4Url, cardBg5Url] as const

type DinoHumanLayout = {
  imageUrl: string
  faceX: number
  faceY: number
  faceWidth: number
  keepOriginalAvatar?: boolean
}

const dinoHumanLayoutsByEggIndex: readonly DinoHumanLayout[] = [
  { imageUrl: dinoHumanLightUrl, faceX: 0.6261, faceY: 0.3822, faceWidth: 0.2156 },
  { imageUrl: dinoHumanClayUrl, faceX: 0.650, faceY: 0.3890, faceWidth: 0.2 },
  { imageUrl: dinoHumanMusicUrl, faceX: 0.530, faceY: 0.450, faceWidth: 0.1633 },
  { imageUrl: dinoHumanBrushUrl, faceX: 0.535, faceY: 0.4103, faceWidth: 0.1467 },
  { imageUrl: dinoHumanFlashUrl, faceX: 0.5022, faceY: 0.5056, faceWidth: 0.1533 },
]
const descriptionBodyByName: Record<string, string> = {
  閃電怪:
    '外型酷似褶傘蜥，穿梭在叢林深處，喜歡透過鏡頭捕捉日常的風景，「走到哪、拍到哪」是拍拍怪的名言，多半是閃光怪正在舉行個人秀。',
  音樂怪:
    '擁有火龍的輪廓及藝術氣息，耳朵靈、節奏強，棲息在火山岩洞中，能從日常生活裡找到各種節拍，將火焰與節奏融合共奏。',
  筆刷怪:
    '保留始祖鳥優美輪廓，翱翔在色彩斑斕的叢林天際，喜歡利用雙翼與尾羽筆刷灑下色彩與生機，無論是在高山還是深谷。',
  黏土怪:
    '棲息在濕潤的沼澤邊緣，擁有半液態黏土構成的劍龍輪廓，喜歡研究各種工藝技術，用柔軟的泥土軀體帶來溫暖包容。',
  燈光怪:
    '擁有尖牙與鋸齒背的暴龍體型，喜歡研究燈光技術，當在黑暗中迷失方向時，燈光怪便會現身驅散黑暗，成為指引希望的燈塔。',
}
const selectedCardBgUrl =
  cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)] ?? cardBg1Url
const resultName = computed(() => hatchSession.dinoName || '可愛的恐龍')
const avatarUrl = computed(() => hatchSession.avatarDataUrl)
const currentDinoHumanLayout = computed(
  () => dinoHumanLayoutsByEggIndex[hatchSession.selectedEggIndex] ?? dinoHumanLayoutsByEggIndex[0],
)
const currentEggIconUrl = computed(() => resolveEggIconByIndex(hatchSession.selectedEggIndex))
const resultDescription = computed(
  () => `${resultName.value}，${descriptionBodyByName[hatchSession.dinoType] ?? descriptionBodyByName.燈光怪}`,
)
const generatedCardUrl = ref<string | null>(null)
const showPrintModal = ref(false)
const barcodeValue = computed(() => String(VueCookies.get('imageName') ?? ''))


function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight
  const targetRatio = width / height
  const sourceWidth = imageRatio > targetRatio ? image.naturalHeight * targetRatio : image.naturalWidth
  const sourceHeight = imageRatio > targetRatio ? image.naturalHeight : image.naturalWidth / targetRatio
  const sourceX = (image.naturalWidth - sourceWidth) / 2
  const sourceY = (image.naturalHeight - sourceHeight) / 2

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
}

function drawCenteredImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  centerX: number,
  centerY: number,
  width: number,
) {
  const rect = getCenteredImageRect(image, centerX, centerY, width)
  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height)
}

function getCenteredImageRect(
  image: HTMLImageElement,
  centerX: number,
  centerY: number,
  width: number,
) {
  const height = width * (image.naturalHeight / image.naturalWidth)
  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
  }
}

function drawCircularAvatar(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  centerX: number,
  centerY: number,
  size: number,
) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
  ctx.clip()
  drawImageCover(ctx, image, centerX - size / 2, centerY - size / 2, size, size)
  ctx.restore()
}

function measureLetterSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  letterSpacing: number,
) {
  return [...text].reduce((width, char, index) => {
    return width + ctx.measureText(char).width + (index > 0 ? letterSpacing : 0)
  }, 0)
}

function drawLetterSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  letterSpacing: number,
) {
  let x = centerX - measureLetterSpacedText(ctx, text, letterSpacing) / 2
  for (const char of text) {
    ctx.fillText(char, x, y)
    x += ctx.measureText(char).width + letterSpacing
  }
}

function wrapTextByWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  letterSpacing: number,
) {
  const lines: string[] = []
  let currentLine = ''

  for (const char of text) {
    const nextLine = currentLine + char
    if (currentLine && measureLetterSpacedText(ctx, nextLine, letterSpacing) > maxWidth) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = nextLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

async function generateResultCardImage() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cardWidth = 1000
  const cardHeight = 1500
  const displayScale = cardWidth / 340
  canvas.width = cardWidth
  canvas.height = cardHeight

  await ensureZhFontLoaded()

  const [cardBg, dinoHuman, eggIcon, avatar] = await Promise.all([
    loadImage(selectedCardBgUrl),
    loadImage(currentDinoHumanLayout.value.imageUrl),
    loadImage(currentEggIconUrl.value),
    avatarUrl.value ? loadImage(avatarUrl.value) : Promise.resolve(null),
  ])

  ctx.clearRect(0, 0, cardWidth, cardHeight)
  drawImageCover(ctx, cardBg, 0, 0, cardWidth, cardHeight)

  const dinoHumanRect = getCenteredImageRect(dinoHuman, cardWidth * 0.5, cardHeight * 0.34, cardWidth * 0.64)
  const dinoHumanLayout = currentDinoHumanLayout.value
  const avatarCenterX = dinoHumanLayout.keepOriginalAvatar
    ? cardWidth * 0.5
    : dinoHumanRect.x + dinoHumanRect.width * dinoHumanLayout.faceX
  const avatarCenterY = dinoHumanLayout.keepOriginalAvatar
    ? cardHeight * 0.34
    : dinoHumanRect.y + dinoHumanRect.height * dinoHumanLayout.faceY
  const avatarSize = dinoHumanLayout.keepOriginalAvatar
    ? cardWidth * 0.22
    : cardWidth * 0.22 * (dinoHumanLayout.faceWidth / 0.1633)

  if (avatar) {
    drawCircularAvatar(ctx, avatar, avatarCenterX, avatarCenterY, avatarSize)
  }

  drawCenteredImage(ctx, dinoHuman, cardWidth * 0.5, cardHeight * 0.34, cardWidth * 0.64)
  drawCenteredImage(ctx, eggIcon, cardWidth * 0.5, cardHeight * 0.59, cardWidth * 0.13)

  const textLeft = cardWidth * 0.13
  const textWidth = cardWidth * 0.74
  const textTop = cardHeight * 0.66
  const nameFontSize = 20 * displayScale
  const descFontSize = 14 * displayScale
  const nameLetterSpacing = nameFontSize * 0.4
  const descLetterSpacing = descFontSize * 0.05
  const nameTopOffset = 30 * displayScale
  const nameShadowOffset = 2 * displayScale
  const descriptionGap = 8 * displayScale

  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.font = buildZhCanvasFont(nameFontSize)
  ctx.fillStyle = '#fff7ff'
  ctx.shadowColor = 'rgba(255, 83, 206, 0.65)'
  ctx.shadowBlur = 12
  drawLetterSpacedText(ctx, resultName.value, cardWidth / 2, textTop + nameTopOffset, nameLetterSpacing)
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(88, 20, 112, 0.65)'
  drawLetterSpacedText(
    ctx,
    resultName.value,
    cardWidth / 2,
    textTop + nameTopOffset + nameShadowOffset,
    nameLetterSpacing,
  )
  ctx.fillStyle = '#fff7ff'
  drawLetterSpacedText(ctx, resultName.value, cardWidth / 2, textTop + nameTopOffset, nameLetterSpacing)

  ctx.font = buildZhCanvasFont(descFontSize)
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = 'rgba(78, 235, 255, 0.35)'
  ctx.shadowBlur = 10

  const descLines = wrapTextByWidth(ctx, resultDescription.value, textWidth, descLetterSpacing)
  const descLineHeight = descFontSize * 1.5
  const descStartY = textTop + nameTopOffset + nameFontSize * 1.15 + descriptionGap
  descLines.forEach((line, index) => {
    drawLetterSpacedText(
      ctx,
      line,
      textLeft + textWidth / 2,
      descStartY + index * descLineHeight,
      descLetterSpacing,
    )
  })

  generatedCardUrl.value = canvas.toDataURL('image/png')
}

onMounted(() => {
  void generateResultCardImage()
})

function backHome() {
  resetHatchSession()
  void router.replace({ name: 'home' })
}

function preparePrint() {
  showPrintModal.value = true

}

function closePrintModal() {
  showPrintModal.value = false
}

function downloadResultCard() {
  if (!generatedCardUrl.value) {
    return
  }

  const link = document.createElement('a')
  link.href = generatedCardUrl.value
  link.download = `${resultName.value}.png`
  link.click()
}
</script>

<template>
  <section class="step-page result-page">
    <DoctorNote>
      <template #title>孵化完成</template>
      <p>恭喜你！</p>
      <p>成功孵化你的恐龍！</p>
    </DoctorNote>

    <StepMiddleSurface tone="purple" class="result-surface">
      <div class="result-card">
        <img
          v-if="generatedCardUrl"
          class="result-card-image"
          :src="generatedCardUrl"
          :alt="`${resultName}小卡`"
        />
        <div v-else class="result-card-loading">小卡產生中...</div>
      </div>
    </StepMiddleSurface>

    <BottomActionBar
      secondary-label="返回首頁"
      next-label="準備列印"
      :timer-icon-src="downloadIconUrl"
      timer-icon-alt="下載結果小卡"
      :timer-action-disabled="!generatedCardUrl"
      :countdown="false"
      @secondary="backHome"
      @next="preparePrint"
      @timer-action="downloadResultCard"
    />

    <PrintReadyModal
      :open="showPrintModal"
      :barcode-value="barcodeValue"
      @close="closePrintModal"
    />
  </section>
</template>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.result-surface {
  --middle-row-min: 360px;
  --middle-row-max: 72vh;
}

.result-surface :deep(.step-middle-body) {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.result-card {
  position: relative;
  width: min(72vw, 340px, calc((59svh - 24px) * 2 / 3));
  aspect-ratio: 2 / 3;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 28px;
  filter: drop-shadow(0 10px 22px rgba(28, 12, 87, 0.36));
}

.result-card-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  -webkit-user-select: none;
  user-select: none;
}

.result-card-loading {
  height: 100%;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-zh);
  background: rgba(61, 37, 147, 0.45);
}

@media (max-width: 390px) {
  .result-card {
    width: min(78vw, 310px, calc((59svh - 20px) * 2 / 3));
  }

}

@media (min-width: 1025px) {
  .result-card {
    width: min(22vw, 340px, calc((59svh - 24px) * 2 / 3));
  }
}
</style>
