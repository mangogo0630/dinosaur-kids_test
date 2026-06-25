

<script setup lang="ts">
import JsBarcode from 'jsbarcode'
import { onMounted, nextTick } from 'vue'
const props = defineProps<{
  open: boolean
  barcodeValue: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

onMounted(async () => {
  await nextTick()

    JsBarcode("#barcodeImg", props.barcodeValue)
  
})

</script>

<template>
  <Teleport to="body">
    <div v-show="open" class="print-modal-root">
      <button type="button" class="print-modal-backdrop" aria-label="關閉" @click="emit('close')" />

      <div
        class="print-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="print-modal-title"
      >
        <button type="button" class="print-modal-close" aria-label="關閉" @click="emit('close')">
          ×
        </button>

        <h2 id="print-modal-title" class="print-modal-title">準備列印</h2>

        <div class="print-code-slot" aria-label="列印用 QR 或條碼">
          <svg id="barcodeImg" class="print-code-image"></svg>
        </div>

        <p class="print-code-hint">建議截圖保存，以免遺失條碼。</p>

        <button type="button" class="print-modal-btn" @click="emit('close')">關閉</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.print-modal-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px;
}

.print-modal-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(24, 12, 68, 0.62);
  cursor: pointer;
}

.print-modal-panel {
  position: relative;
  width: min(92vw, 360px);
  padding: 24px 20px 24px 20px;
  border-radius: 24px;
  border: 2px solid rgba(228, 220, 255, 0.95);
  background:
    linear-gradient(180deg, rgba(255, 247, 255, 0.98) 0%, rgba(255, 232, 251, 0.98) 100%);
  box-shadow:
    0 0 0 2px rgba(186, 163, 255, 0.35),
    0 18px 42px rgba(28, 12, 87, 0.38);
  text-align: center;
}

.print-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(90, 66, 214, 0.12);
  color: #4c1d95;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.print-modal-title {
  margin: 0;
  color: #4c1d95;
  font-family: var(--font-zh);
  font-size: clamp(24px, 5vw, 30px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.12em;
}

.print-code-slot {
  width: min(72vw, 220px);
  aspect-ratio: 1;
  margin: 8px auto 0;
  display: grid;
  place-items: center;
  border-radius: 18px;
  border: 2px dashed rgba(124, 58, 237, 0.45);
  background: rgba(255, 255, 255, 0.72);
}

.print-code-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 12px;
  box-sizing: border-box;
}

.print-code-hint {
  margin: 10px 0 0;
  padding: 0 8px;
  color: rgba(76, 29, 149, 0.72);
  font-family: var(--font-zh);
  font-size: clamp(14px, 2.8vw, 24px);
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: 0.04em;
}

.print-code-placeholder {
  margin: 0;
  padding: 0 16px;
  color: rgba(76, 29, 149, 0.72);
  font-family: var(--font-zh);
  font-size: clamp(13px, 3.4vw, 15px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.04em;
}

.print-modal-btn {
  --pill-optical-y: -1px;
  margin-top: 20px;
  width: clamp(104px, 30vw, 148px);
  max-width: 100%;
  min-height: clamp(46px, 6.8vh, 56px);
  padding-top: clamp(6px, 0.65vh, 8px);
  padding-bottom: clamp(9px, 0.95vh, 12px);
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

.print-modal-btn:active {
  transform: translateY(calc(var(--pill-optical-y) + 1px));
  filter: brightness(0.96);
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    inset 0 2px 6px rgba(15, 60, 140, 0.25);
}

@media (min-width: 680px) and (max-width: 1024px) {
  .print-modal-btn {
    min-height: clamp(54px, 7.2vh, 66px);
    font-size: clamp(22px, 3.4vh, 34px);
  }
}

@media (min-width: 1025px) {
  .print-modal-btn {
    min-height: clamp(50px, 5.8vh, 62px);
    font-size: clamp(22px, 2.4vh, 30px);
  }
}
</style>
