<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import { resolveDinoTypeByEggIndex, resolveEggIconByIndex } from '../utils/eggAssets'

const router = useRouter()

const statusOptions = [
  '認真的',
  '閃耀的',
  '熱血的',
  '慵懶的',
  '害羞的',
  '大膽的',
  '神秘的',
  '忙碌的',
  '奔跑的',
  '愛吃的',
  '無敵的',
  '可愛的',
  '乖巧的',
  '強壯的',
  '香香的',
  '高高的',
  '活潑的',
  '帥氣的',
  '調皮的',
  '幽默的',
  '愛睡覺的',
  '愛學習的',
  '愛乾淨的',
  '愛旅行的',
  '不可思議的',
  '鬼靈精怪的',
  '擅長樂器的',
]

const statusListEl = ref<HTMLElement | null>(null)
const canScrollUp = ref(false)
const canScrollDown = ref(false)

let resizeObserver: ResizeObserver | undefined

const currentDinoType = computed(() =>
  resolveDinoTypeByEggIndex(hatchSession.selectedEggIndex),
)
const fullName = computed(() => `${hatchSession.dinoStatus}${currentDinoType.value}`)
const currentEggIconUrl = computed(() => resolveEggIconByIndex(hatchSession.selectedEggIndex))
const isValid = computed(() => hatchSession.dinoStatus.length > 0)

function pickRandomOption(options: string[]): string {
  if (options.length === 0) {
    return ''
  }
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex] ?? ''
}

function syncDinoTypeFromEgg() {
  hatchSession.dinoType = currentDinoType.value
}

function assignRandomStatus() {
  hatchSession.dinoStatus = pickRandomOption(statusOptions)
}

watch(
  () => hatchSession.selectedEggIndex,
  () => {
    syncDinoTypeFromEgg()
  },
)

watchEffect(() => {
  hatchSession.dinoName = fullName.value
})

function selectStatus(status: string) {
  hatchSession.dinoStatus = status
}

function updateScrollLimits() {
  const el = statusListEl.value
  if (!el) {
    canScrollUp.value = false
    canScrollDown.value = false
    return
  }

  const tolerance = 2
  canScrollUp.value = el.scrollTop > tolerance
  canScrollDown.value = el.scrollTop + el.clientHeight < el.scrollHeight - tolerance
}

function scrollStatus(dir: 1 | -1) {
  const el = statusListEl.value
  if (!el) {
    return
  }
  if (dir < 0 && !canScrollUp.value) {
    return
  }
  if (dir > 0 && !canScrollDown.value) {
    return
  }
  el.scrollBy({ top: dir * 88, behavior: 'smooth' })
}

function goNext() {
  if (!isValid.value) {
    return
  }
  syncDinoTypeFromEgg()
  hatchSession.dinoName = fullName.value
  void router.push({ name: 'avatar-capture' })
}

onMounted(() => {
  syncDinoTypeFromEgg()
  assignRandomStatus()

  void nextTick(() => {
    updateScrollLimits()
    const el = statusListEl.value
    if (!el) {
      return
    }

    resizeObserver = new ResizeObserver(() => updateScrollLimits())
    resizeObserver.observe(el)
  })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <section class="step-page naming-page">
    <DoctorNote>
      <template #title>替恐龍命名</template>
      <p>幫你的恐龍蛋</p>
      <p>決定狀態吧！</p>
    </DoctorNote>

    <StepMiddleSurface>
      <div class="naming-card">
        <div class="naming-preview">
          <img
            :src="currentEggIconUrl"
            class="egg-mini"
            :alt="`${currentDinoType}蛋`"
          />
          <p class="result-bubble">{{ fullName }}</p>
        </div>

        <section class="naming-picker">
          <header class="col-tab">狀態</header>
          <div class="col-sheet">
            <div class="col-scroll-wrap">
              <button
                type="button"
                class="scroll-nudge scroll-up"
                :class="{ 'scroll-nudge--limit': !canScrollUp }"
                :disabled="!canScrollUp"
                aria-label="狀態清單向上"
                @click="scrollStatus(-1)"
              >
                <svg viewBox="0 0 64 64" class="scroll-arrow-icon" aria-hidden="true">
                  <defs>
                    <radialGradient id="blue-gradient-up" cx="50%" cy="50%" r="72%">
                      <stop offset="0%" stop-color="#3747F6" />
                      <stop offset="100%" stop-color="#8D8CFB" />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="16,44 32,16 48,44"
                    fill="#ffffff"
                    stroke="#ffffff"
                    stroke-width="14"
                    stroke-linejoin="round"
                  />
                  <polygon
                    points="16,44 32,16 48,44"
                    fill="url(#blue-gradient-up)"
                    stroke="url(#blue-gradient-up)"
                    stroke-width="8"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <div ref="statusListEl" class="chip-scroll" @scroll="updateScrollLimits">
                <button
                  v-for="status in statusOptions"
                  :key="status"
                  type="button"
                  class="pick-pill"
                  :class="{ 'pick-pill--on': hatchSession.dinoStatus === status }"
                  @click="selectStatus(status)"
                >
                  {{ status }}
                </button>
              </div>

              <button
                type="button"
                class="scroll-nudge scroll-down"
                :class="{ 'scroll-nudge--limit': !canScrollDown }"
                :disabled="!canScrollDown"
                aria-label="狀態清單向下"
                @click="scrollStatus(1)"
              >
                <svg viewBox="0 0 64 64" class="scroll-arrow-icon" aria-hidden="true">
                  <defs>
                    <radialGradient id="blue-gradient-down" cx="50%" cy="50%" r="72%">
                      <stop offset="0%" stop-color="#3747F6" />
                      <stop offset="100%" stop-color="#8D8CFB" />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="16,20 32,48 48,20"
                    fill="#ffffff"
                    stroke="#ffffff"
                    stroke-width="14"
                    stroke-linejoin="round"
                  />
                  <polygon
                    points="16,20 32,48 48,20"
                    fill="url(#blue-gradient-down)"
                    stroke="url(#blue-gradient-down)"
                    stroke-width="8"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </StepMiddleSurface>

    <BottomActionBar :disabled="!isValid" @next="goNext" />
  </section>
</template>

<style scoped>
.naming-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 0;
}

.naming-card {
  font-family: var(--font-zh);
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: transparent;
  border-radius: clamp(16px, 3vmin, 24px);
  padding: clamp(12px, 2vh, 18px) clamp(10px, 4vw, 36px) clamp(14px, 2vh, 20px);
  margin-inline: auto;
  box-shadow: none;
  border: none;
}

@media (max-width: 390px) {
  .naming-card {
    padding: 12px 10px 14px;
  }
}

@media (min-width: 680px) {
  .naming-card {
    padding: clamp(14px, 2vh, 28px) clamp(12px, 3.2vw, 40px) clamp(16px, 2vh, 30px);
  }
}

@media (min-width: 800px) {
  .naming-card {
    max-width: 740px;
  }
}

.naming-preview {
  display: flex;
  align-items: center;
  gap: clamp(20px, 4vmin, 32px);
  margin-bottom: clamp(14px, 2vmin, 32px);
  padding: 0 clamp(16px, 2vw, 32px);
}

@media (max-width: 390px) {
  .naming-preview {
    gap: 12px;
    margin-bottom: clamp(2px, 6vmin, 10px);
    padding: 0 10px;
  }
}

@media (min-width: 680px) {
  .naming-preview {
    gap: clamp(24px, 3vw, 36px);
    margin-bottom: clamp(18px, 2vmin, 26px);
    padding: 0 clamp(36px, 6vw, 120px);
  }
}

.egg-mini {
  flex-shrink: 0;
  width: clamp(48px, 12vmin, 64px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(2px 3px 0 rgba(0, 40, 160, 0.3));
}

@media (max-width: 390px) {
  .egg-mini {
    width: clamp(36px, 13vmin, 64px);
  }
}

@media (min-width: 680px) {
  .egg-mini {
    width: clamp(54px, 9.5vmin, 82px);
  }
}

.result-bubble {
  position: relative;
  margin: 0;
  flex: 1;
  min-height: clamp(56px, 10vmin, 72px);
  display: grid;
  place-items: center;
  border-radius: clamp(20px, 3vmin, 28px);
  background-color: #4a69ff;
  color: #ffffff;
  font-size: clamp(18px, 6vw, 32px);
  font-weight: normal;
  letter-spacing: 0.06em;
  line-height: 1.3;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(2px 3px 0 rgba(0, 40, 160, 0.3));
}

.result-bubble::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px 12px 10px 0;
  border-style: solid;
  border-color: transparent #4a69ff transparent transparent;
}

@media (max-width: 390px) {
  .result-bubble {
    font-size: clamp(14px, 6vw, 36px);
    min-height: clamp(44px, 13vw, 56px);
  }

  .result-bubble::before {
    left: -8px;
    border-width: 8px 10px 8px 0;
  }

}



@media (min-width: 680px) {
  .result-bubble {
    font-size: clamp(32px, 4.2vw, 54px);
    min-height: clamp(64px, 9vmin, 92px);
    border-radius: clamp(20px, 4vmin, 42px);
  }

  .result-bubble::before {
    left: -16px;
    border-width: 11px 18px 11px 0;
  }
}

.naming-picker {
  --col-tab-font-size: clamp(16px, 3.6vw, 32px);
  flex: 1 1 0%;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.col-tab {
  font-family: inherit;
  align-self: flex-start;
  margin: 0 14px -6px 0;
  min-width: clamp(56px, 22vw, 140px);
  padding: 0 clamp(12px, 3vmin, 24px) clamp(6px, 1vmin, 10px) clamp(12px, 5vmin, 24px);
  text-align: center;
  font-size: var(--col-tab-font-size);
  font-weight: normal;
  letter-spacing: 0.3em;
  color: #ffffff;
  background: #4a69ff;
  border-radius: 16px 16px 0 0;
  position: relative;
  z-index: 1;
}

.col-tab::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: -22px;
  width: 28px;
  background: inherit;
  border-radius: 0 12px 0 0;
  transform-origin: bottom right;
  transform: skewX(29deg);
  z-index: -1;
}

@media (max-width: 390px) {
  .naming-picker {
    --col-tab-font-size: clamp(14px, 4.5vw, 24px);
  }

  .col-tab {
    padding: 0 clamp(10px, 3vmin, 20px) clamp(5px, 1vmin, 9px) clamp(10px, 5vmin, 20px);
  }

  .col-tab::after {
    right: -14px;
    width: 20px;
    border-radius: 0 6px 0 0;
  }
}

@media (min-width: 680px) {
  .naming-picker {
    --col-tab-font-size: clamp(30px, 3.6vw, 50px);
  }

  .col-tab {
    margin: 0 18px -8px 0;
    padding: 0 clamp(14px, 2vw, 32px) clamp(8px, 0.9vw, 18px) clamp(14px, 3vw, 36px);
    letter-spacing: 0.22em;
  }

  .col-tab::after {
    right: -32px;
    width: 36px;
    border-radius: 0 8px 0 0;
  }
}

@media (min-width: 940px) {
  .col-tab::after {
    right: -38px;
    width: 36px;
    border-radius: 0 8px 0 0;
  }
}

.col-sheet {
  position: relative;
  z-index: 2;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: clamp(2px, 0.5vmin, 4px) clamp(10px, 3vmin, 16px);
  border-radius: clamp(12px, 2vmin, 16px);
  background: linear-gradient(180deg, #ffbce5 40%, rgba(255, 188, 229, 0) 100%);
  border: 2px solid #ffffff;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.25);
}

@media (max-width: 390px) {
  .col-sheet {
    padding: 2px 10px;
  }
}

@media (min-width: 680px) {
  .col-sheet {
    padding: clamp(4px, 0.5vw, 8px) clamp(12px, 1.2vw, 18px);
  }
}

.col-scroll-wrap {
  flex: 1 1 0%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-nudge {
  font-family: inherit;
  width: clamp(48px, 12vmin, 68px);
  height: auto;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.scroll-arrow-icon {
  width: clamp(32px, 7vmin, 44px);
  height: auto;
  display: block;
  transition: transform 0.15s ease;
}

@media (max-width: 390px) {
  .scroll-arrow-icon {
    width: clamp(22px, 6.5vw, 30px);
  }
}

@media (min-width: 680px) {
  .scroll-arrow-icon {
    width: clamp(36px, 2.8vw, 50px);
  }
}

.scroll-nudge:active:not(:disabled) {
  transform: translateY(1px) scale(0.9);
}

.scroll-nudge--limit {
  cursor: default;
}

.scroll-nudge--limit .scroll-arrow-icon polygon:first-of-type {
  fill: #e3e7ee;
  stroke: #e3e7ee;
}

.scroll-nudge--limit .scroll-arrow-icon polygon:last-of-type {
  fill: #b8c0cc;
  stroke: #b8c0cc;
}

.chip-scroll {
  width: 100%;
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(8px, 1.2vmin, 16px);
  padding: clamp(4px, 0.8vmin, 8px) 4px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  align-content: start;
}

.chip-scroll::-webkit-scrollbar {
  display: none;
}

@media (max-width: 390px) {
  .chip-scroll {
    gap: clamp(6px, 4.2vw, 10px);
    padding: 4px 2px;
  }
}

@media (min-width: 680px) {
  .chip-scroll {
    gap: clamp(12px, 1.6vw, 24px);
    padding: clamp(6px, 0.8vw, 10px) 6px;
  }
}

.pick-pill {
  font-family: inherit;
  width: 100%;
  min-height: clamp(40px, 6vmin, 48px);
  padding: 0 clamp(8px, 1.5vmin, 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  border-radius: 999px;
  font-size: clamp(17px, 3.8vw, 24px);
  font-weight: normal;
  letter-spacing: 0.06em;
  line-height: 1;
  color: #3a4460;
  background: linear-gradient(
    180deg,
    #ffffff 24%,
    #fffbfb 45%,
    #ffffff 50%,
    #fffbfb 65%,
    #ffeef8 76%,
    #ffd9ef 100%
  );
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

@media (min-width: 391px) and (max-width: 679px) {
  .pick-pill {
    font-size: clamp(18px, 3.4vw, 22px);
    min-height: clamp(42px, 5.6vw, 52px);
    padding: 0 8px;
    letter-spacing: 0.04em;
  }
}

@media (max-width: 390px) {
  .pick-pill {
    font-size: clamp(12px, 4.2vw, 19px);
    min-height: clamp(34px, 5.2vw, 40px);
    padding: 0 6px;
  }
}

@media (min-width: 680px) {
  .pick-pill {
    font-size: clamp(28px, 2.9vw, 42px);
    min-height: clamp(56px, 5.4vmin, 74px);
    padding: 0 clamp(10px, 1vw, 14px);
  }
}

.pick-pill--on {
  color: #ffffff;
  background: linear-gradient(180deg, #ff5aae 0%, #ff40a0 48%, #e8308f 100%);
}

@media (min-width: 1025px) {
  .naming-card {
    max-width: 700px;
    padding: 18px 20px 22px;
  }

  .naming-preview {
    gap: 20px;
    margin-bottom: 20px;
    padding: 0 28px;
  }

  .egg-mini {
    width: 72px;
  }

  .result-bubble {
    font-size: clamp(28px, 2.3vw, 38px);
    min-height: clamp(66px, 6vmin, 84px);
  }

  .result-bubble::before {
    left: -14px;
    border-width: 10px 15px 10px 0;
  }

  .naming-picker {
    padding: 0 clamp(10px, 1vw, 24px);
  }

  .col-tab::after {
    right: -38px;
    width: 36px;
  }

  .chip-scroll {
    gap: clamp(12px, 1.2vw, 18px);
  }

  .pick-pill {
    font-size: clamp(22px, 1.7vw, 30px);
    min-height: clamp(52px, 4.8vmin, 62px);
    padding: 0 10px;
  }

  .scroll-arrow-icon {
    width: 42px;
  }
}
</style>
