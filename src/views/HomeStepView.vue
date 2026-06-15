<script setup lang="ts">
import { useRouter , useRoute } from 'vue-router'
import VueCookies from 'vue-cookies'
import { resetHatchSession } from '../stores/hatchSession'
import mainLogoUrl from '../assets/images/MainLogo.png'
import cafLogoUrl from '../assets/images/CafLogo.png'
import doctorImageUrl from '../assets/images/Doctor.png'

const router = useRouter()
const route = useRoute()

function goToEggStep() {
  resetHatchSession()
   HandleShowID()
  

  void router.push({   name: 'egg'  })
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
      
      <div class="hero-illustration">
        <img class="hero-doctor-image" :src="doctorImageUrl" alt="博士角色" decoding="async" />
      </div>
    </div>

    <div class="action-dock">
      <button class="primary-btn" @click="goToEggStep">進入孵化室</button>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  justify-content: center;
  padding-top: clamp(24px, 5svh, 60px);
  padding-bottom: calc(clamp(88px, 16svh, 132px) + env(safe-area-inset-bottom));
}

.hero-panel {
  text-align: center;
  width: min(100%, var(--device-max-width));
  margin-inline: auto;
  padding: 20px 16px 0;
}

.hero-brand-slot {
  position: relative;
  width: 100%;
  margin: 0 auto 10px;
  padding-inline: clamp(44px, 12vw, 80px);
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
  height: clamp(80px, 22svh, 260px);
  width: auto;
  max-width: min(94vw, 560px);
  object-fit: contain;
  filter: brightness(1.16) saturate(1.24) contrast(1.08);
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
  margin: -6px 0 0;
  padding-bottom: 8px;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 5px;
  line-height: 1.08;
}

.sub-title {
  margin: 0 0 18px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.05;
  font-family: 'Sweet Sans Pro', Arial, Helvetica, sans-serif;
}

.hero-illustration {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.hero-doctor-image {
  width: min(88vw, 360px);
  height: auto;
  object-fit: contain;
}

.action-dock {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: min(100%, var(--device-max-width));
  padding: 12px var(--shell-padding) max(12px, env(safe-area-inset-bottom));
  z-index: 15;
  background: transparent;
  border-top: none;
  backdrop-filter: none;
  padding-bottom: 40px;
}

.primary-btn {
  width: 100%;
  min-height: 52px;
  border-radius: 12px;
  border: 2px solid #1f1f1f;
  color: #fff;
  font-weight: 700;
  background: linear-gradient(180deg, #b199f3 0%, #1930fb 100%);
  border: 3px solid #ffffff;
  border-radius: 999px;
  box-shadow:
    0 0 16px rgba(255, 255, 255, 0.8),
    inset 0 4px 12px rgba(255, 255, 255, 0.9),
    inset 0 -4px 8px rgba(30, 40, 200, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 4px;
  text-indent: 4px;
  min-height: 68px;
  width: 85%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
  transition: all 0.2s ease;
}

@media (min-width: 1025px) {
  .home-page {
    padding-top: clamp(30px, 5svh, 70px);
    padding-bottom: clamp(110px, 18svh, 160px);
  }

  .action-dock {
    left: 50%;
    transform: translateX(-50%);
    width: min(100%, var(--device-max-width));
  }
}

.primary-btn:hover {
  background: linear-gradient(180deg, #c4aef5 0%, #3046ff 100%);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.9),
    inset 0 4px 12px rgba(255, 255, 255, 1),
    inset 0 -4px 8px rgba(30, 40, 200, 0.2),
    0 6px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.primary-btn:active {
  background: linear-gradient(180deg, #9b81df 0%, #1324ca 100%);
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.5),
    inset 0 2px 6px rgba(255, 255, 255, 0.6),
    inset 0 -2px 6px rgba(30, 40, 200, 0.2);
  transform: translateY(1px);
}
</style>
