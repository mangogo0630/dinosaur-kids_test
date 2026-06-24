<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'agree'): void
  (e: 'decline'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-show="open" class="consent-sheet-root">
      <button
        type="button"
        class="consent-backdrop"
        aria-label="關閉同意書"
        @click="emit('decline')"
      />

      <section
        class="consent-sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-sheet-title"
      >
        <div class="consent-scroll">
          <h2 id="consent-sheet-title" class="consent-title">肖像及個人資料使用同意</h2>

          <div class="consent-body">
            <p>
              感謝您參與「2026新北市兒童藝術節」。本互動裝置會為您拍照，並將照片與恐龍等影像合成；合成後的照片會在裝置內顯示、上傳雲端、連線列印為相紙並張貼於現場供領取，參與者於現場及裝置內可看見彼此的照片。
            </p>
            <p>
              勾選下方同意後，即表示您同意新北市政府文化局（以下簡稱本局）及其委辦單位，得於本活動及本局相關業務之推廣、宣傳、報導、紀錄、出版、展示等用途範圍內，以印刷、網路、社群媒體、新聞稿等各種形式，無償使用前述照片（含合成影像）。本局使用時將尊重您的形象，不作情色、誹謗或其他違法、有損名譽之用途。
            </p>
            <p>
              依《個人資料保護法》，上述照片之蒐集、處理及利用以前述目的為範圍。您得隨時向本局申請查詢、停止利用或刪除個人照片；惟已對外發布或現場公開張貼領取者，不在此限。
            </p>
            <p>未滿十八歲者，請由家長或法定代理人閱讀並代為同意。</p>
          </div>
        </div>

        <footer class="consent-footer">
          <div class="consent-actions">
            <button type="button" class="pill-btn pill-btn-compact pill-btn--decline" @click="emit('decline')">
              不同意
            </button>
            <button type="button" class="pill-btn pill-btn-compact pill-btn--pink" @click="emit('agree')">
              同意
            </button>
          </div>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.consent-sheet-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-inline: clamp(14px, 4.5vw, 28px);
  padding-bottom: max(10px, env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.consent-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: linear-gradient(
    to top,
    rgba(255, 130, 195, 0.42) 0%,
    rgba(48, 20, 88, 0.4) 48%,
    rgba(24, 12, 68, 0.32) 100%
  );
  cursor: pointer;
}

.consent-sheet-panel {
  --consent-hex-layer: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='90' viewBox='0 0 52 90'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.52' stroke-width='1.1' d='M26 60L0 45L0 15L26 0L52 15L52 45L26 60L26 90'/%3E%3C/svg%3E");
  --consent-hex-size: 28px 48px;
  position: relative;
  z-index: 1;
  width: min(100%, var(--device-max-width, 768px));
  height: calc(100svh * 0.6);
  max-height: calc(100svh - env(safe-area-inset-top) - 10px);
  display: flex;
  flex-direction: column;
  border-radius: 28px;
  border: 2px solid rgba(255, 255, 255, 0.92);
  background:
    var(--consent-hex-layer),
    linear-gradient(to top, #ffb8fb 0%, #ffd3fb 22%, #ffe0f0 58%, #fff2f9 88%, #ffffff 100%);
  background-size: var(--consent-hex-size), 100% 100%;
  background-position: center bottom, center;
  box-shadow:
    0 -8px 32px rgba(28, 12, 87, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  overflow: hidden;
}

.consent-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: clamp(20px, 3.5svh, 28px) clamp(18px, 4.5vw, 28px) clamp(12px, 2svh, 18px);
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 114, 182, 0.45) transparent;
}

.consent-scroll::-webkit-scrollbar {
  width: 6px;
}

.consent-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(244, 114, 182, 0.45);
}

.consent-title {
  margin: 0 0 clamp(14px, 2.2svh, 20px);
  color: #3f4ff2;
  font-family: var(--font-zh);
  font-size: clamp(22px, 5.2vw, 30px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0.08em;
  text-align: center;
}

.consent-body {
  color: #1a1a1a;
  font-family: var(--font-zh);
  font-size: clamp(11px, min(3vw, 1.5svh), 14px);
  font-weight: 400;
  line-height: 1.62;
  letter-spacing: 0.02em;
}

.consent-body p {
  margin: 0 0 1em;
}

.consent-body p:last-child {
  margin-bottom: 0;
}

.consent-footer {
  flex-shrink: 0;
  padding: clamp(12px, 2svh, 18px) clamp(16px, 4vw, 24px) clamp(14px, 2svh, 18px);
  background: transparent;
}

.consent-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(10px, 2.5vw, 16px);
  max-width: 100%;
  margin-inline: auto;
}

.pill-btn {
  --pill-optical-y: -1px;
  width: 100%;
  margin: 0;
  min-height: clamp(46px, 6.8vh, 56px);
  padding-top: clamp(6px, 0.65vh, 8px);
  padding-bottom: clamp(9px, 0.95vh, 12px);
  padding-inline: 12px;
  border: 2px solid #ffffff;
  border-radius: 999px;
  color: #ffffff;
  font-family: var(--font-zh);
  font-size: clamp(18px, 3vh, 26px);
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transform: translateY(var(--pill-optical-y));
  cursor: pointer;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}

.pill-btn-compact {
  min-height: clamp(42px, 5.8vh, 50px);
  font-size: clamp(16px, 2.8vh, 22px);
  letter-spacing: 0.06em;
}

.pill-btn--decline {
  background: linear-gradient(180deg, #e8ebf2 0%, #cfd5e2 48%, #bcc4d4 100%);
  color: #ffffff;
  text-shadow: 0 1px 0 rgba(70, 80, 100, 0.28);
}

.pill-btn--pink {
  background: linear-gradient(180deg, #ffcde9 0%, #f472b6 50%, #ffabd5 100%);
  text-shadow: 0 1px 0 rgba(120, 15, 80, 0.35);
}

.pill-btn:active:not(:disabled) {
  transform: translateY(calc(var(--pill-optical-y) + 1px));
  filter: brightness(0.96);
}

.pill-btn--decline:active:not(:disabled) {
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    inset 0 2px 6px rgba(80, 90, 110, 0.22);
}

.pill-btn--pink:active:not(:disabled) {
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.18),
    inset 0 2px 6px rgba(140, 15, 90, 0.25);
}

@media (min-width: 680px) {
  .consent-title {
    font-size: clamp(26px, 3.2vw, 32px);
  }

  .consent-body {
    font-size: clamp(15px, 3vw, 18px);
  }

  .pill-btn-compact {
    min-height: clamp(46px, 5.8vh, 54px);
    font-size: clamp(18px, 2.4vh, 24px);
  }
}
</style>
