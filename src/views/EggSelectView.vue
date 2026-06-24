<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import BottomActionBar from '../components/BottomActionBar.vue'
import DoctorNote from '../components/DoctorNote.vue'
import EggShowcaseCard from '../components/EggShowcaseCard.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import circuitBoardBluePurpleUrl from '../assets/images/電路板_藍紫.png'
import { EGG_IDS, resolveDinoTypeByEggIndex, resolveEggImageByIndex } from '../utils/eggAssets'

const router = useRouter()
const eggs = [...EGG_IDS]

const currentEggLabel = computed(() => eggs[hatchSession.selectedEggIndex])
const currentEggImageUrl = computed(() => resolveEggImageByIndex(hatchSession.selectedEggIndex))
const currentDinoType = computed(() => resolveDinoTypeByEggIndex(hatchSession.selectedEggIndex))

function prevEgg() {
  hatchSession.selectedEggIndex =
    (hatchSession.selectedEggIndex - 1 + eggs.length) % eggs.length
}

function nextEgg() {
  hatchSession.selectedEggIndex = (hatchSession.selectedEggIndex + 1) % eggs.length
}

function goNext() {
  console.log("Egg:", hatchSession.selectedEggIndex);
  hatchSession.dinoType = resolveDinoTypeByEggIndex(hatchSession.selectedEggIndex)
  void router.push({ name: 'name' })
}
</script>

<template>
  <section class="step-page egg-select-page">
    <DoctorNote>
      <template #title>挑選恐龍蛋</template>
      <p>wow~</p>
      <p>會出現甚麼怪獸呢?</p>
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
          <div class="egg-bottom-footer">
            <p class="egg-dino-name">{{ currentDinoType }}</p>
            <div class="pagination-dots">
              <span
                v-for="(_, index) in eggs"
                :key="index"
                class="dot"
                :class="{ active: hatchSession.selectedEggIndex === index }"
              />
            </div>
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

.egg-bottom-footer {
  position: relative;
}

.egg-dino-name {
  --egg-name-lift: clamp(14px, min(4.5vw, 2.8svh), 26px);
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + var(--egg-name-lift));
  margin: 0;
  padding-inline: 12px;
  text-align: center;
  font-family: var(--font-zh);
  font-size: clamp(18px, min(6.4vw, 3svh), 34px);
  font-weight: 400;
  letter-spacing: clamp(0.08em, 1.1vw, 0.14em);
  text-indent: clamp(0.08em, 1.1vw, 0.14em);
  line-height: 1.12;
  color: #3f4ff2;
  pointer-events: none;
  -webkit-text-stroke: clamp(1px, 0.32vw, 2px) #ffffff;
  paint-order: stroke fill;
  text-shadow:
    0 0 1px #ffffff,
    0 1px 0 #ffffff,
    0 0 clamp(6px, 1.8vw, 10px) rgba(255, 255, 255, 0.9);
}

@media (max-width: 390px) {
  .egg-dino-name {
    --egg-name-lift: clamp(12px, min(5vw, 2.6svh), 20px);
    font-size: clamp(16px, min(6.8vw, 2.8svh), 26px);
  }
}

@media (min-width: 680px) {
  .egg-dino-name {
    --egg-name-lift: clamp(16px, min(3.2vw, 2.6svh), 28px);
    font-size: clamp(24px, min(3.8vw, 2.5svh), 38px);
  }
}

@media (min-width: 1025px) {
  .egg-dino-name {
    --egg-name-lift: clamp(18px, 2.4svh, 30px);
    font-size: clamp(26px, min(2.6vw, 2.2svh), 36px);
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
