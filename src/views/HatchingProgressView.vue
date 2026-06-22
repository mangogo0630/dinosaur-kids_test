<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
import { hatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import EggShowcaseCard from '../components/EggShowcaseCard.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import circuitBoardPinkUrl from '../assets/images/電路板_粉.png'
import flashDecoUrl from '../assets/images/FlashDeco1.png'
import { EGG_IDS, resolveEggImageByIndex } from '../utils/eggAssets'

const router = useRouter()
const route = useRoute()
const progress = ref(0)
const eggs = [...EGG_IDS]
let timerId: number | undefined
const currentEggLabel = computed(() => eggs[hatchSession.selectedEggIndex])
const currentEggImageUrl = computed(() => resolveEggImageByIndex(hatchSession.selectedEggIndex))
const holdHatchingPage = computed(() => route.query.hold === '1')

async function uploadImage() {
  if (!hatchSession.avatarBlob) {
    console.warn('Skip upload: missing avatar blob.')
    return
  }

  const formData = new FormData()
  formData.append('image', hatchSession.avatarBlob)
  const showid = String(VueCookies.get('showid') ?? hatchSession.showID ?? 'no_showid')
  const isTablet = String(VueCookies.get('istablet') ?? 'false')

  console.log('name & egg & showid:', hatchSession.dinoName, hatchSession.selectedEggIndex, showid)
  hatchSession.imageName = String(Date.now())
  VueCookies.set('imageName', hatchSession.imageName, '1d')
  formData.append('filename', `img_${hatchSession.imageName}`)
  formData.append('id', showid)
  formData.append('eggtype', String(hatchSession.selectedEggIndex))
  formData.append('dinotype', hatchSession.dinoType)
  formData.append('displayname', hatchSession.dinoName)
  formData.append('isTablet', isTablet)
  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    if (data.success) {
      console.log('Upload success:', data.filename)
    } else {
      console.error('Upload failed:', data.error)
    }

  } catch (err) {
    console.error('Network error:', err)
  }
}

onMounted(() => {
  // 檢查用設定(網址加 ?hold=1)
  if (holdHatchingPage.value) {
    progress.value = 72
    return
  }

  void uploadImage()

  timerId = window.setInterval(() => {
    progress.value += 4

    if (progress.value < 100) {
      return
    }

    progress.value = 100
    if (timerId) {
      window.clearInterval(timerId)
      timerId = undefined
    }

    void router.replace({ name: 'result' })
  }, 120)
})

onBeforeUnmount(() => {
  if (!timerId) {
    return
  }

  window.clearInterval(timerId)
})
</script>

<template>
  <section class="step-page hatching-page">
    <DoctorNote>
      <template #title>孵化進度</template>
      <p>啟動孵化艙！</p>
      <p>恐龍蛋孵化中...</p>
    </DoctorNote>

    <StepMiddleSurface
      tone="purple"
      class="hatching-surface"
      :style="{
        '--circuit-board-top': `url(${circuitBoardPinkUrl})`,
        '--flash-deco': `url(${flashDecoUrl})`,
      }"
    >
      <EggShowcaseCard
        :image-src="currentEggImageUrl"
        :image-alt="currentEggLabel"
      >
        <span class="flash-deco flash-deco--1" aria-hidden="true" />
        <span class="flash-deco flash-deco--2" aria-hidden="true" />
        <span class="flash-deco flash-deco--3" aria-hidden="true" />

        <template #bottom>
          <div class="hatch-progress-shell" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
            <div class="hatch-progress-track">
              <div class="hatch-progress-fill" :style="{ width: `${progress}%` }" />
            </div>
          </div>
        </template>
      </EggShowcaseCard>
    </StepMiddleSurface>

    <BottomActionBar center-text="孵化中請稍後" />
  </section>
</template>

<style scoped>
.hatching-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.hatching-surface :deep(.step-middle-frame) {
  position: relative;
  overflow: hidden;
}

.hatching-surface :deep(.step-middle-frame)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 58%;
  background-image: var(--circuit-board-top);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  pointer-events: none;
  z-index: 0;
}

.hatching-surface :deep(.step-middle-body) {
  position: relative;
  z-index: 1;
}

.hatching-surface :deep(.egg-visual) {
  transform: translateY(2.2vh);
}

.hatching-surface :deep(.egg-display-image) {
  position: relative;
  z-index: 1;
  transform: none;
  max-height: 100%;
  max-width: min(84%, 400px);
}

@media (min-width: 389px) {
  .hatching-surface :deep(.egg-display-image) {
    max-width: min(88%, 460px);
  }
}

@media (min-width: 389px) and (min-height: 780px) {
  .hatching-surface :deep(.egg-display-image) {
    max-width: min(90%, 500px);
  }
}

.flash-deco {
  position: absolute;
  left: var(--flash-left);
  top: var(--flash-top);
  width: var(--flash-size);
  aspect-ratio: 150 / 253;
  background-image: var(--flash-deco);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
  z-index: 2;
  transform: rotate(var(--flash-rotate));
  animation: flashPulse 1.05s ease-in-out infinite;
}

.flash-deco--1 {
  --flash-left: 13%;
  --flash-top: -12%;
  --flash-size: 22%;
  --flash-rotate: -43deg;
}

.flash-deco--2 {
  --flash-left: 13%;
  --flash-top: 12%;
  --flash-size: 13%;
  --flash-rotate: -60deg;
  animation-delay: 0.18s;
}

.flash-deco--3 {
  --flash-left: 77%;
  --flash-top: 22%;
  --flash-size: 13%;
  --flash-rotate: 10deg;
  animation-delay: 0.36s;
}

@keyframes flashPulse {
  0%,
  100% {
    opacity: 0.72;
    filter: brightness(0.95) drop-shadow(0 0 2px rgba(255, 232, 92, 0.45));
    transform: rotate(var(--flash-rotate)) scale(0.96);
  }

  42% {
    opacity: 1;
    filter: brightness(1.35) drop-shadow(0 0 10px rgba(255, 232, 92, 0.9));
    transform: rotate(var(--flash-rotate)) scale(1.08);
  }

  58% {
    opacity: 0.88;
    filter: brightness(1.1) drop-shadow(0 0 5px rgba(255, 232, 92, 0.65));
    transform: rotate(var(--flash-rotate)) scale(1.02);
  }
}

.hatch-progress-shell {
  box-sizing: border-box;
  width: min(92%, 440px);
  margin: 0 auto;
  padding: 6px;
  border-radius: 999px;
  border: 2px solid rgba(252, 210, 255, 0.65);
  background: linear-gradient(180deg, rgba(45, 34, 146, 0.85) 0%, rgba(49, 36, 163, 0.92) 100%);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.26) inset,
    0 4px 12px rgba(45, 37, 120, 0.35);
}

.hatch-progress-track {
  height: clamp(14px, 2.6vh, 18px);
  border-radius: 999px;
  background: linear-gradient(180deg, #e4e8ff 0%, #9382FE 20%,#9382FE 80%,#e4e8ff 100%);
  overflow: hidden;
}

.hatch-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #ffe898 0%, #ffe169 45%, #ffd84e 100%);
  box-shadow: 0 0 10px rgba(255, 225, 103, 0.75);
  transition: width 0.25s ease;
}
</style>
