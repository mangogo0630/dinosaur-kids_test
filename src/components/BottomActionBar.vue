<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import cafLogoUrl from '../assets/images/CafLogo.png'

const props = withDefaults(
  defineProps<{
    nextLabel?: string
    secondaryLabel?: string
    centerText?: string
    disabled?: boolean
    timerSeconds?: number
    countdown?: boolean
    bare?: boolean
    buttonTone?: 'blue' | 'pink'
    timerIconSrc?: string
    timerIconAlt?: string
    timerActionDisabled?: boolean
  }>(),
  {
    nextLabel: '下一步',
    disabled: false,
    timerSeconds: 60,
    countdown: true,
    bare: false,
    buttonTone: 'blue',
    timerIconAlt: '下載',
    timerActionDisabled: false,
  },
)

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'secondary'): void
  (e: 'timer-action'): void
}>()

const displayValue = ref(props.timerSeconds)
let ticker: number | undefined

function restartDisplay() {
  displayValue.value = props.timerSeconds
  if (ticker !== undefined) {
    window.clearInterval(ticker)
    ticker = undefined
  }
  if (props.timerIconSrc || !props.countdown || props.timerSeconds <= 0) {
    return
  }
  ticker = window.setInterval(() => {
    if (displayValue.value <= 0) {
      if (ticker !== undefined) {
        window.clearInterval(ticker)
        ticker = undefined
      }
      return
    }

    displayValue.value -= 1

    if (displayValue.value > 0) {
      return
    }

    if (ticker !== undefined) {
      window.clearInterval(ticker)
      ticker = undefined
    }

    if (!props.disabled) {
      emit('next')
    }
  }, 1000)
}

onMounted(() => {
  restartDisplay()
})

watch([() => props.timerSeconds, () => props.countdown], () => restartDisplay())

onBeforeUnmount(() => {
  if (ticker !== undefined) {
    window.clearInterval(ticker)
  }
})

const shownTimer = computed(() =>
  props.countdown ? displayValue.value : props.timerSeconds,
)
</script>

<template>
  <div
    class="action-dock"
    :class="[
      { 'deck-bar bottom-bar-layout': !bare },
      { 'action-dock--bare': bare },
    ]"
  >
    <div v-if="!bare" class="logo-slot">
      <img class="logo-img" :src="cafLogoUrl" alt="新北市兒童藝術節" decoding="async" />
    </div>

    <div class="bottom-center" :class="{ 'bottom-center--bare': bare }">
      <p v-if="centerText" class="center-text">{{ centerText }}</p>
      <div v-else-if="secondaryLabel" class="dual-actions">
        <button type="button" class="pill-btn pill-btn-compact" @click="emit('secondary')">
          {{ secondaryLabel }}
        </button>
        <button
          type="button"
          class="pill-btn pill-btn-compact"
          :class="{ 'pill-btn--pink': buttonTone === 'pink' }"
          :disabled="disabled"
          @click="emit('next')"
        >
          {{ nextLabel }}
        </button>
      </div>
      <button
        v-else
        type="button"
        class="pill-btn"
        :class="[
          bare ? 'pill-btn--bare' : 'pill-btn--single',
          { 'pill-btn--pink': buttonTone === 'pink' },
        ]"
        :disabled="disabled"
        @click="emit('next')"
      >
        {{ nextLabel }}
      </button>
    </div>

    <button
      v-if="!bare && timerIconSrc"
      type="button"
      class="timer-ring timer-ring--icon"
      :aria-label="timerIconAlt"
      :disabled="timerActionDisabled"
      @click="emit('timer-action')"
    >
      <img class="timer-ring-icon" :src="timerIconSrc" :alt="timerIconAlt" decoding="async" />
    </button>
    <div v-else-if="!bare" class="timer-ring" aria-live="polite">{{ shownTimer }}</div>
  </div>
</template>

<style scoped>

.action-dock {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: none;
  width: 100%;
  background: transparent;
  z-index: 15;
}

@media (min-width: 1025px) {
  .action-dock {
    left: 50%;
    transform: translateX(-50%);
    width: min(100%, clamp(520px, 70vw, 640px));
  }
}

.action-dock--bare {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px var(--shell-padding) max(12px, env(safe-area-inset-bottom));
}

.bottom-center--bare {
  width: 100%;
  display: flex;
  justify-content: center;
}

.deck-bar {
  --deck-hex-size: 34px 58px;
  box-sizing: border-box;
  height: max(56px, var(--bottom-bar-height, calc(100svh * 1.5 / 10)));
  padding: 0 var(--shell-padding) max(0px, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  border: none;
  border-radius: 22px 22px 0 0;
  background-color: #1e3a8a;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E"),
    linear-gradient(180deg, #3b82f6 0%, #2563eb 42%, #1e3a8a 100%);
  background-size: var(--deck-hex-size), 100% 100%;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.42),
    0 -6px 20px rgba(186, 230, 253, 0.55),
    0 -2px 0 rgba(240, 249, 255, 0.65),
    0 10px 26px rgba(15, 23, 42, 0.32);
}

.bottom-bar-layout {
  display: grid;
  grid-template-columns: clamp(42px, 11vw, 56px) 1fr clamp(42px, 11vw, 56px);
  align-items: center;
  gap: clamp(10px, 2.5vw, 18px);
  min-height: 0;
}

.bottom-center {
  --pill-fixed-width: clamp(104px, 30vw, 148px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dual-actions {
  display: grid;
  grid-template-columns: repeat(2, var(--pill-fixed-width));
  gap: 8px;
  max-width: 100%;
  margin-inline: auto;
}

.center-text {
  margin: 0;
  color: #ffffff;
  font-family: var(--font-zh);
  font-size: clamp(12px, 3.1vh, 48px);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-shadow: 0 1px 0 rgba(15, 50, 120, 0.35);
  text-align: center;
  white-space: nowrap;
}

.logo-slot {
  width: clamp(42px, 9vmin, 54px);
  height: clamp(42px, 9vmin, 54px);
  display: grid;
  place-items: center;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
}

.timer-ring {
  width: clamp(48px, 12vmin, 64px);
  height: clamp(48px, 12vmin, 64px);
  border-radius: 50%;
  border: 3px solid #ffffff;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-family: var(--font-timer);
  font-size: clamp(20px, 4.2vmin, 32px);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  justify-self: end;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  -webkit-user-select: none;
  user-select: none;
}

.timer-ring--icon {
  padding: 0;
  cursor: pointer;
  background: transparent;
  box-sizing: border-box;
  transition:
    transform 0.15s ease,
    filter 0.15s ease,
    opacity 0.15s ease;
}

.timer-ring--icon:active:not(:disabled) {
  transform: scale(0.94);
  filter: brightness(0.95);
}

.timer-ring--icon:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.timer-ring-icon {
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
  pointer-events: none;
}

/*主按鈕*/
.pill-btn {
  --pill-optical-y: 0px;
  width: 100%;
  margin: 0 auto;
  min-height: clamp(46px, 6.8vh, 56px);
  padding-block: clamp(8px, 0.8vh, 11px);
  padding-inline: 20px;
  border: 2px solid #ffffff;
  border-radius: 999px;
  background: linear-gradient(180deg, #93c5fd 0%, #60a5fa 45%, #3b82f6 100%);
  color: #ffffff;
  font-family: var(--font-zh);
  font-size: clamp(20px, 3.2vh, 32px);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transform: translateY(var(--pill-optical-y));
  text-shadow: 0 1px 0 rgba(15, 50, 120, 0.35);
  cursor: pointer;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}

/*單顆按鈕*/
.pill-btn--single {
  width: var(--pill-fixed-width);
  max-width: 100%;
  padding-inline: 6px;
}

.pill-btn--bare {
  width: auto;
  min-width: var(--pill-fixed-width);
  max-width: 100%;
  padding-inline: 20px;
  white-space: nowrap;
}

.pill-btn--pink {
  background: linear-gradient(180deg, #ffcde9 0%, #f472b6 50%, #ffabd5 100%);
  text-shadow: 0 1px 0 rgba(120, 15, 80, 0.35);
}

.pill-btn--pink:active:not(:disabled) {
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    inset 0 2px 6px rgba(140, 15, 90, 0.25);
}

.pill-btn-compact {
  max-width: none;
  font-size: clamp(16px, 2.6vh, 20px);
  letter-spacing: 0.06em;
  min-height: clamp(42px, 5.8vh, 50px);
  padding-block: clamp(7px, 0.75vh, 9px);
  padding-inline: 6px;
}

.pill-btn:hover:not(:disabled) {
  transform: translateY(calc(var(--pill-optical-y) - 1px));
  filter: brightness(1.06);
  box-shadow:
    0 3px 0 rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.pill-btn:active:not(:disabled) {
  transform: translateY(calc(var(--pill-optical-y) + 1px));
  filter: brightness(0.96);
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    inset 0 2px 6px rgba(15, 60, 140, 0.25);
}

.pill-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (min-width: 680px) and (max-width: 1024px) {
  .deck-bar {
    border-radius: 40px 40px 0 0;
    padding: 0 calc(var(--shell-padding) + 20px) max(0px, env(safe-area-inset-bottom));
  }

  .bottom-bar-layout {
    grid-template-columns: clamp(58px, 10vw, 72px) 1fr clamp(58px, 10vw, 72px);
    gap: clamp(14px, 2.2vw, 22px);
  }

  .bottom-center {
    --pill-fixed-width: clamp(132px, 34vw, 210px);
  }

  .dual-actions {
    grid-template-columns: repeat(2, clamp(142px, 28vw, 204px));
    gap: clamp(16px, 3vw, 24px);
  }

  .logo-slot {
    width: clamp(56px, 10vmin, 72px);
    height: clamp(56px, 10vmin, 72px);
  }

  .timer-ring {
    width: clamp(58px, 10vmin, 78px);
    height: clamp(58px, 10vmin, 78px);
    font-size: clamp(24px, 3.8vmin, 34px);
  }

  .pill-btn {
    min-height: clamp(54px, 7.2vh, 66px);
    font-size: clamp(22px, 3.4vh, 34px);
  }

  .pill-btn-compact {
    min-height: clamp(54px, 6.8vh, 64px);
    font-size: clamp(20px, 3.1vh, 28px);
    letter-spacing: 0.08em;
  }
}

/*桌機*/
@media (min-width: 1025px) {
  .bottom-bar-layout {
    grid-template-columns: 56px 1fr 56px;
    gap: 16px;
  }

  .bottom-center {
    --pill-fixed-width: clamp(140px, 19vw, 190px);
  }

  .logo-slot {
    width: 56px;
    height: 56px;
  }

  .timer-ring {
    width: 62px;
    height: 62px;
    border-width: 3px;
    font-size: clamp(24px, 2.8vw, 30px);
  }

  .pill-btn {
    min-height: clamp(50px, 5.8vh, 62px);
    font-size: clamp(22px, 2.4vh, 30px);
  }

  .pill-btn-compact {
    min-height: clamp(46px, 5.2vh, 56px);
    font-size: clamp(18px, 2vh, 24px);
  }

  .center-text {
    font-size: clamp(20px, 2.4vh, 30px);
  }
}
</style>
