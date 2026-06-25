<script setup lang="ts">
import doctorImageUrl from '../assets/images/Doctor.png'
</script>

<template>
  <div class="doctor-dialogue-area">
    <div class="doctor-placeholder">
      <slot name="doctor">
        <img class="doctor-image" :src="doctorImageUrl" alt="博士角色" decoding="async" />
      </slot>
    </div>
    <div class="dialogue-container">
      <div class="title-placeholder">
        <span class="title-text"><slot name="title" /></span>
      </div>
      <div class="dialogue-panel">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doctor-dialogue-area {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: clamp(8px, min(4.8vmax, 3.2svh), 20px);
  --dialog-overlap-x: clamp(-28px, max(-4.8vmin, -4.2svh), -10px);
  --title-h: clamp(36px, min(calc(30px + 8vmin), calc(36px + 10svh)), 120px);
  --dialog-h: clamp(32px, min(calc(20px + 12vmin), calc(28px + 12svh)), 140px);
  --title-font-size: clamp(14px, min(calc(14px + 3.3vmin), calc(10px + 4.2svh)), 46px);
  --dialog-font-size: clamp(11px, min(calc(9px + 1.6vmin), calc(8px + 2.4svh)), 40px);
  --title-text-offset-y: clamp(-12px, calc(var(--title-h) * -0.05), -4px);
}

.dialogue-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(4px, min(calc(6px + 0.5vmin), calc(4px + 0.55svh)), 16px);
  margin-left: var(--dialog-overlap-x);
}

.title-placeholder {
  height: var(--title-h);
  width: min(calc(var(--title-h) * 538 / 150), min(70vmin, 58svh));
  background-image: url('../assets/images/TitleBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: grid;
  place-items: center;
  color: white;
  font-family: var(--font-zh);
  font-size: var(--title-font-size);
  font-weight: 400;
  letter-spacing: 2px;
  text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title-text {
  display: block;
  transform: translateY(var(--title-text-offset-y));
}

.doctor-placeholder {
  flex-shrink: 0;
  width: clamp(88px, min(37vmin, 26svh), 240px);
  align-self: flex-end;
  display: grid;
  place-items: center;
}

.doctor-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.dialogue-panel {
  height: var(--dialog-h);
  width: min(calc(var(--dialog-h) * 520 / 176), min(58vmin, 48svh));
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: clamp(2px, 0.5vh, 6px);
  margin-bottom: clamp(4px, 0.8svh, 8px);
  color: #ffffff;
  font-family: var(--font-zh);
  font-size: var(--dialog-font-size);
  font-weight: 400;
  line-height: 1.2;
  text-shadow: none;
  text-align: left;
  box-sizing: border-box;
  padding: calc(var(--dialog-h) * 0.1) calc(var(--dialog-h) * 0.3) calc(var(--dialog-h) * 0.1) calc(var(--dialog-h) * 0.58);
}

:deep(.dialogue-panel p) {
  margin: 0;
  white-space: nowrap;
}

.dialogue-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../assets/images/Dialog.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  z-index: -1;
}

/* 寬扁直式（如 460×639）：寬度大、高度有限時再縮一檔，避免與底欄重疊 */
@media (min-aspect-ratio: 7/10) {
  .doctor-dialogue-area {
    padding-top: clamp(6px, min(3.6vmax, 2.4svh), 14px);
    --title-h: clamp(30px, min(calc(30px + 8vmin), calc(26px + 9.5svh)), 96px);
    --dialog-h: clamp(28px, min(calc(20px + 12vmin), calc(22px + 10.5svh)), 112px);
    --title-font-size: clamp(13px, min(calc(14px + 3.3vmin), calc(9px + 3.6svh)), 40px);
    --dialog-font-size: clamp(10px, min(calc(9px + 1.6vmin), calc(7px + 2.1svh)), 34px);
  }

  .doctor-placeholder {
    width: clamp(80px, min(37vmin, 22svh), 200px);
  }
}

@media (min-aspect-ratio: 7/10) and (max-height: 680px) {
  .doctor-dialogue-area {
    --title-h: clamp(28px, min(calc(28px + 7vmin), calc(22px + 8.8svh)), 88px);
    --dialog-h: clamp(26px, min(calc(18px + 10vmin), calc(18px + 9.5svh)), 104px);
  }

  .doctor-placeholder {
    width: clamp(72px, min(34vmin, 20svh), 180px);
  }
}

</style>
