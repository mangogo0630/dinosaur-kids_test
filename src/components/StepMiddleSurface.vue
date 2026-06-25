<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'default' | 'compact'
    tone?: 'default' | 'purple'
    layout?: 'fill' | 'content'
  }>(),
  {
    size: 'default',
    tone: 'default',
    layout: 'fill',
  }
)
</script>

<template>
  <div
    class="step-middle-mount"
    :class="[
      { 'step-middle-mount--compact': size === 'compact' },
      { 'step-middle-mount--purple': tone === 'purple' },
      { 'step-middle-mount--content': layout === 'content' },
    ]"
  >
    <div class="step-middle-frame">
      <div class="step-middle-body">
        <slot />
      </div>
    </div>
    <div class="mid-row-spacer" aria-hidden="true" />
  </div>
</template>

<style scoped>
.step-middle-mount {
  --middle-row-min: 200px;
  --middle-row-max: 68vh;
  --middle-row-svh: calc((8.9 - 3) / 10 * 100svh);
  --middle-hex-layer: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.52' stroke-width='1.1' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E");
  --middle-bg-color: #ffe8fb;
  --middle-bg-gradient: linear-gradient(180deg, #fff7ff 0%, #ffe8fb 38%, #ffbcf5 100%);
  --middle-frame-border: none;
  --middle-frame-shadow: none;
  flex: 1 1 0%;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(var(--middle-row-min), min(var(--middle-row-svh), var(--middle-row-max))) 1fr;
}

.step-middle-mount--compact {
  --middle-row-min: 200px;
  --middle-row-max: 68vh;
  --middle-row-svh: calc((8.3 - 3) / 10 * 100svh);
}

.step-middle-mount--purple {
  --middle-hex-layer: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='%23332187' stroke-opacity='1' stroke-width='1.1' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E");
  --middle-bg-color: #5a42d6;
  --middle-bg-gradient: linear-gradient(180deg, #7d37e6 0%, #5c24a5 42%, #3D2593 100%);
  --middle-frame-border: 2px solid rgba(228, 220, 255, 0.9);
  --middle-frame-shadow:
    inset 0 0 0 2px rgba(255, 239, 239, 0.22),
    inset 0 -16px 48px rgba(231, 224, 255, 0.45),
    0 0 0 2px rgba(186, 163, 255, 0.35),
    0 0 46px rgba(198, 185, 255, 0.42);
}

.step-middle-mount--content {
  grid-template-rows: auto 1fr;
}

.mid-row-spacer {
  min-height: 0;
}

.step-middle-frame {
  --middle-hex-size: 20px 35px;
  grid-row: 1;
  justify-self: center;
  align-self: stretch;
  box-sizing: border-box;
  width: calc(100% * 22 / 24);
  height: 100%;
  border-radius: 24px;
  border: var(--middle-frame-border);
  background-color: var(--middle-bg-color);
  background-image:
    var(--middle-hex-layer),
    var(--middle-bg-gradient);
  background-size: var(--middle-hex-size), 100% 100%;
  background-position: center;
  box-shadow: var(--middle-frame-shadow);
  display: flex;
  flex-direction: column;
}

.step-middle-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.step-middle-mount--content .step-middle-frame {
  width: auto;
  max-width: none;
  height: auto;
  justify-self: center;
  align-self: start;
  display: inline-flex;
}

.step-middle-mount--content .step-middle-body {
  overflow: visible;
}
</style>
