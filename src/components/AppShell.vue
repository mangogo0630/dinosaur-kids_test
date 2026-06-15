<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopStatusBar from './TopStatusBar.vue'

const route = useRoute()

const showStatus = computed(() => route.meta.showStatus)
const progressStep = computed(() => route.meta.progressStep)
const progressTotal = computed(() => route.meta.progressTotal)
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="app-frame">
    <div class="machine-screen" :class="{ homeGradient: isHome }">
      <TopStatusBar
        v-if="showStatus"
        :step="progressStep"
        :total="progressTotal"
      />

      <main class="step-content" :class="{ withStatus: showStatus }">
        <RouterView />
      </main>

    </div>
  </div>
</template>

<style scoped>
.machine-screen {
  --machine-hex-size: 24px 41px;
  min-height: 100svh;
  background-color: #4a55e6;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='rgba(0,0,0,0.08)' stroke-width='1.5' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E"),
    linear-gradient(180deg, #1b2175 0%, #4a67e6 25%, #c5d0ff 100%);
  background-size: var(--machine-hex-size), 100% 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
}

.step-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

:deep(.step-page) {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.step-content.withStatus :deep(.step-page) {
  min-height: calc(100svh - 72px);
}

.step-content:not(.withStatus) :deep(.step-page) {
  min-height: 100svh;
}

/* 首頁背景 */
.machine-screen.homeGradient {
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='rgba(0,0,0,0.08)' stroke-width='1.5' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E"),
    linear-gradient(180deg, #142274 0%, #3556d9 48%, #f8c6ef 100%);
}

@media (min-width: 1025px) {
  .machine-screen {
    border-radius: 24px;
    box-shadow: var(--shadow-card);
    overflow: hidden;
    min-height: 100%;
  }

  :deep(.step-page) {
    min-height: calc(100svh - 120px);
  }
}


</style>
