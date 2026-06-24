<script setup lang="ts">
import { ref } from 'vue'
import { useRouter , useRoute } from 'vue-router'
import VueCookies from 'vue-cookies'
import { resetHatchSession } from '../stores/hatchSession'
import BottomActionBar from '../components/BottomActionBar.vue'
import PortraitConsentSheet from '../components/PortraitConsentSheet.vue'
import mainLogoUrl from '../assets/images/MainLogo.png'
import cafLogoUrl from '../assets/images/CafLogo.png'

const router = useRouter()
const route = useRoute()
const showConsentSheet = ref(false)

function openConsentSheet() {
  showConsentSheet.value = true
}

function closeConsentSheet() {
  showConsentSheet.value = false
}

function goToEggStep() {
  resetHatchSession()
  HandleShowID()
  closeConsentSheet()
  void router.push({ name: 'egg' })
}

function handleConsentAgree() {
  goToEggStep()
}

function handleConsentDecline() {
  closeConsentSheet()
}
function HandleShowID() {
  
  if (route.query.showid) {
  VueCookies.set('showid', route.query.showid as string, '1d')
  }

  const showid = VueCookies.get('showid')??'noshowid';
  console.log("showid:", showid);

  if (route.query.istablet) {
  VueCookies.set('istablet', route.query.istablet as string, '10d')
  }
  const isTablet = VueCookies.get('istablet');
  console.log("Tablet:", isTablet);
  if(isTablet === 'true'){
    console.log("tablet mode");
  }
  

}

</script>

<template>
  <section class="step-page home-page">
    <div class="hero-panel">
      <div class="hero-brand-slot">
        <img
          class="hero-caf-badge"
          :src="cafLogoUrl"
          alt="新北市兒童藝術節"
          width="200"
          height="200"
          decoding="async"
        />
        <img class="hero-brand-wordmark" :src="mainLogoUrl" alt="2026 怪獸叢林" decoding="async" />
      </div>
      
      <h1 class="main-title hero-glow-title">次元恐龍孵化室</h1>
      <p class="sub-title hero-glow-title">DINO DIMENSION HATCHERY</p>
    </div>

    <BottomActionBar
      bare
      button-tone="pink"
      next-label="進入孵化室"
      :countdown="false"
      :timer-seconds="0"
      @next="openConsentSheet"
    />

    <PortraitConsentSheet
      :open="showConsentSheet"
      @agree="handleConsentAgree"
      @decline="handleConsentDecline"
    />
  </section>
</template>

<style scoped>
.home-page {
  justify-content: flex-start;
  padding-top: clamp(8px, 1.5svh, 18px);
  padding-bottom: calc(clamp(88px, 16svh, 132px) + env(safe-area-inset-bottom));
}

.home-page :deep(.action-dock) {
  bottom: 10px;
}

.home-page :deep(.pill-btn--bare) {
  --pill-optical-y: -2px;
  min-height: clamp(52px, 3vh, 68px);
  height: auto;
  font-size: clamp(26px, 3vh, 40px);
  padding-top: clamp(8px, 0.85vh, 12px);
  padding-bottom: clamp(12px, 1.25vh, 17px);
  padding-inline: 30px;
  letter-spacing: 0.14em;
  white-space: nowrap;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(100%, var(--device-max-width));
  margin-inline: auto;
  padding: 4px 16px 0;
}

.hero-brand-slot {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: clamp(3px, 1svh, 12px) auto 4px;
  box-sizing: border-box;
}

.hero-caf-badge {
  position: fixed;
  top: clamp(12px, 2.4svh, 24px);
  right: clamp(10px, 3vw, 26px);
  width: clamp(46px, 13vmin, 76px);
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  z-index: 40;
}

.hero-brand-wordmark {
  display: block;
  margin-inline: auto;
  margin-bottom: 0;
  height: clamp(100px, 26svh, 300px);
  width: auto;
  max-width: min(98vw, 680px);
  object-fit: contain;
  filter: brightness(1.42) saturate(1.5) contrast(1.14)
    drop-shadow(0 0 14px rgba(255, 210, 255, 0.45));
  mix-blend-mode: screen;
}

/* 主副標題樣式 */
.hero-glow-title {
  color: #ffffff;
  text-shadow:
    0 0 8px rgba(255, 255, 255, 0.4),
    0 0 22px rgba(255, 105, 200, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.2);
}

.main-title {
  margin: 0;
  padding-bottom: 4px;
  margin-top: -8px;
  width: 100%;
  text-align: center;
  font-family: var(--font-zh);
  font-size: clamp(32px, 7.5vw, 46px);
  font-weight: 400;
  letter-spacing: 5px;
  text-indent: 5px;
  line-height: 1.08;
}

.sub-title {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: clamp(4px, 2.5vw, 12px);
  font-weight: 500;
  letter-spacing: 2px;
  text-indent: 2px;
  line-height: 1.05;
  font-family: var(--font-en);
}

@media (min-width: 1025px) {
  .home-page {
    padding-top: clamp(12px, 2svh, 24px);
    padding-bottom: clamp(110px, 18svh, 160px);
  }
}
</style>
