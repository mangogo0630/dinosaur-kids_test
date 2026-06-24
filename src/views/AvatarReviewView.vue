<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'

const route = useRoute()
const router = useRouter()
const forceReviewFail = computed(() => route.query.reviewFail === '1')

onMounted(() => {
  // 檢查用設定（網址加 ?reviewFail=1）
  if (forceReviewFail.value) {
    void router.replace({ name: 'hatching-failed' })
    return
  }

  if (!hatchSession.avatarDataUrl) {
    // 流程錯誤，導向孵化失敗頁
    void router.replace({ name: 'hatching-failed' })
  }
})

function retake() {
  void router.push({ name: 'avatar-capture' })
}
  
function goHatching() {
  void router.push({ name: 'hatching' })
}
</script>

<template>
  <section class="step-page review-flow">
    <DoctorNote>
      <template #title>確認頭像</template>
      <p>確認沒問題的話，</p>
      <p>就能啟動孵化囉！</p>
    </DoctorNote>

    <StepMiddleSurface size="compact" layout="content">
      <div class="sketch-card review-card">
        <div class="preview-stage">
          <img
            v-if="hatchSession.avatarDataUrl"
            :src="hatchSession.avatarDataUrl"
            alt="拍攝的大頭貼"
            class="captured-image"
          />
          <div v-else class="preview-placeholder">
            <p class="camera-icon" aria-hidden="true">🖼️</p>
            <p class="camera-text">照片載入中...</p>
          </div>
        </div>
      </div>
    </StepMiddleSurface>

    <BottomActionBar
      secondary-label="重新拍攝"
      next-label="開始孵化"
      @secondary="retake"
      @next="goHatching"
    />
  </section>
</template>

<style scoped>
.sketch-card {
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 14px;
  background: #fff;
}

.review-flow {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.review-card {
  width: clamp(320px, 84vw, 980px);
  max-width: calc(100vw - 16px);
  flex: 1 1 auto;
  min-height: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: transparent;
  border: none;
  box-shadow: none;
}

@media (min-width: 1025px) {
  .review-card {
    width: clamp(320px, 62vw, 560px);
    max-width: calc(100vw - 32px);
  }
}

.preview-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  border-radius: 20PX;
  overflow: hidden;
}

.captured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  color: #d3d7de;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
    #111826;
}

.camera-icon {
  margin: 0;
  font-size: 46px;
}

.camera-text {
  margin: 0;
  font-size: 14px;
}
</style>
