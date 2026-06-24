<script setup lang="ts">
import { useRouter } from 'vue-router'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'

const router = useRouter()

function retryUpload() {
  void router.push({ name: 'avatar-capture' })
}
</script>

<template>
  <section class="step-page hatching-failed-page">
    <DoctorNote>
      <template #title>孵化進度</template>
      <p>孵化失敗...</p>
      <p>請按下重新上傳</p>
    </DoctorNote>

    <StepMiddleSurface tone="purple" class="failed-surface">
      <div class="failed-card">
        <div class="failed-cross" aria-hidden="true"></div>
        <p class="failed-message">孵化過程發生錯誤，<br />請重新上傳。</p>
      </div>
    </StepMiddleSurface>

    <BottomActionBar next-label="重新上傳" @next="retryUpload" />
  </section>
</template>

<style scoped>
.hatching-failed-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.failed-surface {
  --middle-bg-color: #5e2d86;
  --middle-bg-gradient: linear-gradient(180deg, #7C2377 0%, #72237c 52%, #35154e 100%);
  --middle-frame-shadow:
    inset 0 0 0 2px rgba(255, 239, 239, 0.22),
    inset 0 -16px 48px rgba(231, 224, 255, 0.45),
    0 0 0 2px rgba(186, 163, 255, 0.35),
    0 0 46px rgba(255, 120, 210, 0.55);
}

.failed-card {
  height: 100%;
  min-height: 0;
  display: grid;
  place-items: center;
  align-content: center;
  gap: clamp(14px, 3vmin, 28px);
  padding: clamp(14px, 3.5vh, 32px) clamp(10px, 3vw, 24px);
  text-align: center;
}

.failed-cross {
  position: relative;
  width: clamp(124px, 22vmin, 190px);
  height: clamp(124px, 22vmin, 190px);
  margin: 0 auto;
  filter:
    drop-shadow(0 0 2px rgba(255, 238, 88, 0.6))
    drop-shadow(0 0 1px rgba(255, 215, 40, 0.5))
    drop-shadow(0 0 15px rgba(255, 215, 40, 0.2))
}

.failed-cross::before,
.failed-cross::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: clamp(34px, 6.4vmin, 48px);
  height: 100%;
  background: radial-gradient(circle, #ffee58 0%, #fff59d 70%, #fffbe6 100%);
  border-radius: 12px;
  transform-origin: center;
}

.failed-cross::before {
  transform: translateX(-50%) rotate(45deg);
}

.failed-cross::after {
  transform: translateX(-50%) rotate(-45deg);
}

.failed-message {
  margin: 0;
  color: #ffffff;
  font-family: var(--font-zh);
  font-size: clamp(15px, 4.4vw, 30px);
  line-height: 1.35;
  letter-spacing: 0.04em;
  text-shadow:
    0 3px 0 rgba(18, 33, 102, 0.45),
    0 0 10px rgba(22, 37, 124, 0.4);
}

@media (max-width: 390px) {
  .failed-card {
    gap: 12px;
    padding: 12px 10px 20px;
  }

  .failed-cross {
    width: clamp(110px, 30vmin, 156px);
    height: clamp(110px, 30vmin, 156px);
  }

  .failed-cross::before,
  .failed-cross::after {
    width: clamp(28px, 7.2vmin, 40px);
    border-radius: 10px;
  }

  .failed-message {
    font-size: clamp(14px, 5.2vw, 22px);
    line-height: 1.32;
  }
}

@media (min-width: 680px) {
  .failed-card {
    gap: clamp(16px, 3.2vh, 32px);
    padding: clamp(16px, 4vh, 40px) clamp(12px, 4vw, 28px);
  }

  .failed-cross {
    width: clamp(140px, 24vmin, 220px);
    height: clamp(140px, 24vmin, 220px);
  }

  .failed-cross::before,
  .failed-cross::after {
    width: clamp(38px, 6vmin, 54px);
    border-radius: 12px;
  }

  .failed-message {
    font-size: clamp(16px, calc(14px + 3.3vmin), 46px);
  }
}

@media (min-width: 1025px) {
  .failed-cross {
    width: clamp(150px, 20vmin, 210px);
    height: clamp(150px, 20vmin, 210px);
  }

  .failed-cross::before,
  .failed-cross::after {
    width: clamp(40px, 5.2vmin, 52px);
  }

  .failed-message {
    font-size: clamp(20px, 2.4vh, 34px);
    line-height: 1.3;
  }
}

:deep(.bottom-center) {
  --pill-fixed-width: clamp(132px, 40vw, 220px);
}

@media (min-width: 1025px) {
  :deep(.bottom-center) {
    --pill-fixed-width: clamp(180px, 24vw, 280px);
  }
}
</style>
