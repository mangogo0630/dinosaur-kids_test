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
  display: flex;
  justify-content: center;
  padding-top: clamp(12px, 4.8vmax, 24px);
  --dialog-overlap-x: clamp(-28px, -4.8vmin, -10px);
  --title-h: clamp(32px, calc(30px + 8vmin), 120px);
  --dialog-h: clamp(32px, calc(20px + 12vmin), 140px);
  --title-font-size: clamp(16px, calc(14px + 3.3vmin), 46px);
  --dialog-font-size: clamp(12px, calc(9px + 1.6vmin), 40px);
  --title-text-offset-y: clamp(-12px, calc(var(--title-h) * -0.05), -4px);
}

.dialogue-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(4px, calc(6px + 0.5vmin), 16px);
  margin-left: var(--dialog-overlap-x);
}

.title-placeholder {
  height: var(--title-h);
  width: min(calc(var(--title-h) * 538 / 150), 70vmin);
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
  width: clamp(96px, 37vmin, 240px);
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
  width: min(calc(var(--dialog-h) * 520 / 176), 58vmin);
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: clamp(2px, 0.5vh, 6px);
  margin-bottom: 8px;
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

</style>
