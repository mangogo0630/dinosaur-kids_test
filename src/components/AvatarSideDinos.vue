<script setup lang="ts">
import captureFlashDinoUrl from '../assets/images/新北兒藝_角色設計_3d_閃光怪去背.png'
import captureLightDinoUrl from '../assets/images/新北兒藝_角色設計_3d_燈光怪去背.png'
</script>

<template>
  <div class="avatar-dino-deck" aria-hidden="true">
    <img
      class="avatar-dino avatar-dino--flash"
      :src="captureFlashDinoUrl"
      alt=""
      decoding="async"
    />
    <img
      class="avatar-dino avatar-dino--light"
      :src="captureLightDinoUrl"
      alt=""
      decoding="async"
    />
  </div>
</template>

<style scoped>
.avatar-dino-deck {
  --avatar-dock-height: max(56px, var(--bottom-bar-height, calc(100svh * 1.5 / 10)));
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--avatar-dock-height);
  z-index: 16;
  width: min(100%, var(--device-max-width, 768px));
  margin-inline: auto;
  padding: 0 clamp(16px, 5vw, 36px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: none;
}

.avatar-dino {
  display: block;
  width: auto;
  object-fit: contain;
  object-position: bottom center;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 10px rgba(20, 12, 72, 0.28));
  -webkit-user-select: none;
  user-select: none;
}

.avatar-dino--flash {
  height: clamp(90px, 22vw, 150px);
  transform: translate(clamp(14px, 5vw, 24px), 2px);
}

.avatar-dino--light {
  height: clamp(94px, 23vw, 150px);
  transform: translate(clamp(8px, 2vw, 2px), 2px);
}

@media (min-width: 680px) {
  .avatar-dino-deck {
    padding-inline: clamp(24px, 6vw, 52px);
  }

  .avatar-dino--flash {
    height: clamp(104px, 36vw, 180px);
    transform: translate(clamp(18px, 2.2vw, 28px), 2px);
  }

  .avatar-dino--light {
    height: clamp(108px, 38vw, 190px);
    transform: translate(clamp(10px, 1.8vw, 4px), 2px);
  }
}

@media (min-width: 1025px) {
  .avatar-dino-deck {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: min(100%, clamp(520px, 70vw, 640px));
  }
}
</style>
