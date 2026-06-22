<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import BottomActionBar from '../components/BottomActionBar.vue'
import DoctorNote from '../components/DoctorNote.vue'
import EggShowcaseCard from '../components/EggShowcaseCard.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import circuitBoardBluePurpleUrl from '../assets/images/電路板_藍紫.png'
import { EGG_IDS, resolveEggImageByIndex } from '../utils/eggAssets'

const router = useRouter()
const eggs = [...EGG_IDS]

const currentEggLabel = computed(() => eggs[hatchSession.selectedEggIndex])
const currentEggImageUrl = computed(() => resolveEggImageByIndex(hatchSession.selectedEggIndex))

function prevEgg() {
  hatchSession.selectedEggIndex =
    (hatchSession.selectedEggIndex - 1 + eggs.length) % eggs.length
}

function nextEgg() {
  hatchSession.selectedEggIndex = (hatchSession.selectedEggIndex + 1) % eggs.length
}

function goNext() {
  console.log("Egg:", hatchSession.selectedEggIndex);
  void router.push({ name: 'name' })
}
</script>

<template>
  <section class="step-page egg-select-page">
    <DoctorNote>
      <template #title>挑選恐龍蛋</template>
      <p>wow~</p>
      <p>會出現甚麼恐龍呢?</p>
    </DoctorNote>

    <!-- 恐龍蛋卡片 -->
    <StepMiddleSurface
      class="egg-select-surface"
      :style="{ '--circuit-board-top': `url(${circuitBoardBluePurpleUrl})` }"
    >
      <EggShowcaseCard
        :image-src="currentEggImageUrl"
        :image-alt="currentEggLabel"
        show-navigation
        @prev="prevEgg"
        @next="nextEgg"
      >
        <template #bottom>
        <div class="pagination-dots">
          <span
            v-for="(_, index) in eggs"
            :key="index"
            class="dot"
            :class="{ active: hatchSession.selectedEggIndex === index }"
          />
        </div>
        </template>
      </EggShowcaseCard>
    </StepMiddleSurface>

    <BottomActionBar @next="goNext" />
  </section>
</template>

<style scoped>
.egg-select-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 0;
}

:deep(.step-middle-body) {
  overflow: visible;
}

.egg-select-surface :deep(.step-middle-frame) {
  position: relative;
  overflow: hidden;
}

.egg-select-surface :deep(.step-middle-frame)::before {
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

.egg-select-surface :deep(.step-middle-body) {
  position: relative;
  z-index: 1;
}

.egg-select-page :deep(.egg-showcase-card) {
  height: 100%;
}

.egg-select-page :deep(.egg-stage) {
  overflow: visible;
  padding-top: 0;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 避免 iOS Safari 在 flex 子項上把舞台高度壓到 0 */
  min-height: min(46svh, 360px);
}

.egg-select-page :deep(.egg-visual) {
  flex-shrink: 0;
  transform: translateY(clamp(24px, 4svh, 86px));
}

.egg-select-page :deep(.bottom-slot) {
  flex-shrink: 0;
}

.egg-select-page :deep(.egg-display-image) {
  /* 勿用 max-height: 100% — 父層為 auto 高度時 iOS 會算出 0 並在換圖時持續縮小 */
  max-height: min(46svh, 360px);
  max-width: min(84%, 400px);
  width: auto;
  height: auto;
  object-fit: contain;
  transform: none;
}

@media (min-width: 389px) {
  .egg-select-page :deep(.egg-display-image) {
    max-width: min(88%, 460px);
  }
}

@media (min-width: 389px) and (min-height: 780px) {
  .egg-select-page :deep(.egg-display-image) {
    max-width: min(90%, 500px);
  }
}

.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.pagination-dots .dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #d3d9fc;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.pagination-dots .dot.active {
  background: #3f4ff2;
  border-color: #3f4ff2;
  transform: scale(1.1);
}

</style>
