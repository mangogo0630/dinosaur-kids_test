<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import BottomActionBar from '../components/BottomActionBar.vue'
import DoctorNote from '../components/DoctorNote.vue'
import EggShowcaseCard from '../components/EggShowcaseCard.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
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
    <StepMiddleSurface>
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
