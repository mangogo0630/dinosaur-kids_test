<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
import { hatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import EggShowcaseCard from '../components/EggShowcaseCard.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
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
  let showid = VueCookies.get('showid') ?? hatchSession.showID ?? 'no_showid'

  const isTablet = VueCookies.get('istablet');
  if(isTablet === 'true'){
      showid = 'tablet';
  }
  console.log('name & egg & showid:', hatchSession.dinoName, hatchSession.selectedEggIndex, showid)

  formData.append('filename', `img_${Date.now()}`)
  formData.append('id', showid)
  formData.append('eggtype', String(hatchSession.selectedEggIndex))
  formData.append('displayname', hatchSession.dinoName)

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

    <StepMiddleSurface tone="purple">
      <EggShowcaseCard
        :image-src="currentEggImageUrl"
        :image-alt="currentEggLabel"
      >
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
