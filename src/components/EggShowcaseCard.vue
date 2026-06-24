<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    imageSrc: string
    imageAlt: string
    imageHueRotate?: number
    showNavigation?: boolean
  }>(),
  {
    imageHueRotate: 0,
    showNavigation: false,
  },
)

const imageStyle = computed(() => {
  if (!props.imageHueRotate) {
    return undefined
  }

  return { filter: `hue-rotate(${props.imageHueRotate}deg)` }
})

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

const slots = useSlots()
const hasBottomSlot = computed(() => Boolean(slots.bottom))
</script>

<template>
  <div class="egg-showcase-card">
    <button
      v-if="props.showNavigation"
      class="nav-arrow left"
      type="button"
      aria-label="上一顆蛋"
      @click="emit('prev')"
    >
      <svg viewBox="0 0 64 64" class="arrow-icon">
        <defs>
          <radialGradient id="blue-gradient-left" cx="50%" cy="50%" r="72%">
            <stop offset="0%" stop-color="#3747F6" />
            <stop offset="100%" stop-color="#8D8CFB" />
          </radialGradient>
        </defs>
        <polygon
          points="44,16 16,32 44,48"
          fill="#ffffff"
          stroke="#ffffff"
          stroke-width="14"
          stroke-linejoin="round"
        />
        <polygon
          points="44,16 16,32 44,48"
          fill="url(#blue-gradient-left)"
          stroke="url(#blue-gradient-left)"
          stroke-width="8"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="egg-stage">
      <div class="egg-visual">
        <img
          class="egg-display-image"
          :src="props.imageSrc"
          :alt="props.imageAlt"
          :style="imageStyle"
          decoding="async"
        />
        <slot />
      </div>
    </div>

    <button
      v-if="props.showNavigation"
      class="nav-arrow right"
      type="button"
      aria-label="下一顆蛋"
      @click="emit('next')"
    >
      <svg viewBox="0 0 64 64" class="arrow-icon">
        <defs>
          <radialGradient id="blue-gradient-right" cx="50%" cy="50%" r="72%">
            <stop offset="0%" stop-color="#3747F6" />
            <stop offset="100%" stop-color="#8D8CFB" />
          </radialGradient>
        </defs>
        <polygon
          points="20,16 48,32 20,48"
          fill="#ffffff"
          stroke="#ffffff"
          stroke-width="14"
          stroke-linejoin="round"
        />
        <polygon
          points="20,16 48,32 20,48"
          fill="url(#blue-gradient-right)"
          stroke="url(#blue-gradient-right)"
          stroke-width="8"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div v-if="hasBottomSlot" class="bottom-slot">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.egg-showcase-card {
  background: transparent;
  border-radius: 24px;
  padding: 18px 16px 20px;
  border: none;
  position: relative;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: none;
}

.egg-stage {
  flex: 1 1 0%;
  min-height: 0;
  display: grid;
  place-items: center;
}

.egg-visual {
  position: relative;
  display: inline-grid;
  place-items: center;
}

.egg-display-image {
  width: auto;
  height: auto;
  max-width: min(84%, 400px);
  max-height: min(46vh, 360px);
  display: block;
  transform: translateY(2.2vh);
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  padding: clamp(8px, 2vw, 16px);
}

.nav-arrow.left {
  left: clamp(-20px, -2.5vw, -8px);
}

.nav-arrow.right {
  right: clamp(-20px, -2.5vw, -8px);
}

.arrow-icon {
  width: clamp(52px, 12vw, 84px);
  height: auto;
  transition: transform 0.15s ease;
}

.nav-arrow:active .arrow-icon {
  transform: scale(0.85);
}

.bottom-slot {
  margin-top: 20px;
}
</style>
