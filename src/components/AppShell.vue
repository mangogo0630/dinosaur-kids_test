<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopStatusBar from './TopStatusBar.vue'
import coverBgUrl from '../assets/images/CoverBG.png'

const route = useRoute()

const showStatus = computed(() => route.meta.showStatus)
const progressStep = computed(() => route.meta.progressStep)
const progressTotal = computed(() => route.meta.progressTotal)
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="app-frame">
    <div
      class="machine-screen"
      :class="{ homeGradient: isHome }"
      :style="isHome ? { '--home-cover-bg': `url(${coverBgUrl})` } : undefined"
    >
      <TopStatusBar
        v-if="showStatus"
        :step="progressStep"
        :total="progressTotal"
      />

      <main class="step-content" :class="{ withStatus: showStatus }">
        <RouterView />
      </main>

    </div>

    <div class="orientation-blocker" role="alert" aria-live="assertive">
      <div class="orientation-card">
        <p class="orientation-title">請將裝置轉為直式</p>
        <p class="orientation-text">本體驗僅支援直式畫面</p>
      </div>
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
  --home-cover-bg-color: #321cac;
  --home-cover-height: clamp(480px, 82svh, 780px);
  background-color: var(--home-cover-bg-color);
  background-image: var(--home-cover-bg);
  background-size: auto var(--home-cover-height);
  background-position: center bottom;
  background-repeat: no-repeat;
}

@media (min-width: 680px) {
  .machine-screen.homeGradient {
    background-size: 100% auto;
  }
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

.orientation-blocker {
  display: none;
}

@media (orientation: landscape) {
  .orientation-blocker {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 24px;
    background:
      radial-gradient(circle at 50% 20%, rgba(244, 114, 182, 0.32) 0%, transparent 38%),
      linear-gradient(180deg, #1b2175 0%, #321cac 100%);
    color: #ffffff;
    text-align: center;
  }

  .orientation-card {
    width: min(82vw, 420px);
    padding: 28px 24px;
    border: 2px solid rgba(255, 255, 255, 0.82);
    border-radius: 24px;
    background: rgba(35, 24, 112, 0.72);
    font-family: var(--font-zh);
    font-weight: 400;
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.16) inset,
      0 18px 42px rgba(0, 0, 0, 0.32);
  }

  .orientation-title {
    margin: 0;
    font-size: clamp(24px, 5vw, 40px);
    letter-spacing: 0.12em;
    text-indent: 0.12em;
  }

  .orientation-text {
    margin: 12px 0 0;
    font-size: clamp(14px, 2.8vw, 20px);
    letter-spacing: 0.08em;
    text-indent: 0.08em;
  }
}

</style>
