

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
  font-family: 'ChaoGangHei', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  font-size: clamp(24px, 5vw, 30px);
  font-weight: 500;
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

.print-code-placeholder {
  margin: 0;
  padding: 0 16px;
  color: rgba(76, 29, 149, 0.72);
  font-family: 'ChaoGangHei', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  font-size: clamp(13px, 3.4vw, 15px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.04em;
}

.print-modal-btn {
  margin-top: 20px;
  min-width: 132px;
  min-height: 44px;
  padding: 0 24px;
  border: 2px solid #ffffff;
  border-radius: 999px;
  background: linear-gradient(180deg, #93c5fd 0%, #60a5fa 45%, #3b82f6 100%);
  color: #ffffff;
  font-family: 'ChaoGangHei', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  font-size: clamp(16px, 4vw, 18px);
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
}
</style>
