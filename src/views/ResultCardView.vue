<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession, resetHatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import cardBg1Url from '../assets/images/恐龍小卡_底圖1.png'
import cardBg2Url from '../assets/images/恐龍小卡_底圖2.png'
import cardBg3Url from '../assets/images/恐龍小卡_底圖3.png'
import cardBg4Url from '../assets/images/恐龍小卡_底圖4.png'
import cardBg5Url from '../assets/images/恐龍小卡_底圖5.png'
import dinoHumanFlashUrl from '../assets/images/IMG_DinoHuman_Flash.png'
import eggBrushIconUrl from '../assets/images/Img_Icon_Egg_Brush.png'
import eggClayIconUrl from '../assets/images/Img_Icon_Egg_Clay.png'
import eggFlashIconUrl from '../assets/images/Img_Icon_Egg_Flash.png'
import eggLightIconUrl from '../assets/images/Img_Icon_Egg_Light.png'
import eggMusicIconUrl from '../assets/images/Img_Icon_Egg_Music.png'

const router = useRouter()
const cardBackgrounds = [cardBg1Url, cardBg2Url, cardBg3Url, cardBg4Url, cardBg5Url] as const
const eggIconByName: Record<string, string> = {
  音樂怪: eggMusicIconUrl,
  閃電怪: eggFlashIconUrl,
  燈光怪: eggLightIconUrl,
  筆刷怪: eggBrushIconUrl,
  黏土怪: eggClayIconUrl,
}
const descriptionByName: Record<string, string> = {
  閃電怪:
    '自戀閃光的閃光怪，外型酷似褶傘蜥，穿梭在叢林深處，喜歡透過鏡頭捕捉日常的風景，「走到哪、拍到哪」是拍拍怪的名言，當聽見清脆的「啪、啪」掌聲，並看見林間閃爍著強光，多半是閃光怪正在舉行個人秀。',
  音樂怪:
    '鬼靈精怪的音樂怪，擁有火龍的輪廓及藝術氣息，耳朵靈、節奏強，棲息在火山岩洞中，能從日常生活裡找到各種節拍，用那不可預測的音浪把節拍變成有特色的爵士樂曲目，將火焰與節奏融合共奏。',
  筆刷怪:
    '靈活流暢的筆刷怪，保留始祖鳥優美輪廓，翱翔在色彩斑斕的叢林天際，喜歡利用雙翼與尾羽筆刷灑下色彩與生機，無論是在高山還是深谷，都看的到他帶著筆刷為大地畫上流暢的色彩。',
  黏土怪:
    '大肚包容的黏土怪，棲息在濕潤的沼澤邊緣，擁有半液態黏土構成的劍龍輪廓，喜歡研究各種工藝技術，在叢林災害發生時，利用巨大的肚腹提供遮風避雨的場所，用柔軟的泥土軀體帶來溫暖包容。',
  燈光怪:
    '愛搞怪的燈光怪，擁有尖牙與鋸齒背的暴龍體型，喜歡研究燈光技術，當在黑暗中迷失方向時，燈光怪便會現身守護，利用自身的光芒驅散黑暗，成為指引希望的燈塔。',
}
const selectedCardBgUrl =
  cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)] ?? cardBg1Url
const resultName = computed(() => hatchSession.dinoName || '可愛的恐龍')
const avatarUrl = computed(() => hatchSession.avatarDataUrl)
const currentEggIconUrl = computed(() => eggIconByName[hatchSession.dinoType] ?? eggLightIconUrl)
const resultDescription = computed(
  () => descriptionByName[hatchSession.dinoType] ?? descriptionByName.燈光怪,
)

function backHome() {
  resetHatchSession()
  void router.replace({ name: 'home' })
}
</script>

<template>
  <section class="step-page result-page">
    <DoctorNote>
      <template #title>孵化完成</template>
      <p>恭喜你！</p>
      <p>成功孵化你的恐龍！</p>
    </DoctorNote>

    <StepMiddleSurface tone="purple" class="result-surface">
      <div class="result-card">
        <img class="result-card-bg" :src="selectedCardBgUrl" alt="" aria-hidden="true" />
        <img
          v-if="avatarUrl"
          class="result-avatar"
          :src="avatarUrl"
          alt="拍攝的大頭貼"
        />
        <img class="result-dino-human" :src="dinoHumanFlashUrl" alt="" aria-hidden="true" />
        <img class="result-egg-icon" :src="currentEggIconUrl" :alt="`${hatchSession.dinoType}蛋`" />
        <div class="result-copy">
          <p class="result-name">{{ resultName }}</p>
          <p class="result-description">{{ resultDescription }}</p>
        </div>
      </div>
    </StepMiddleSurface>

    <BottomActionBar next-label="返回首頁" @next="backHome" />
  </section>
</template>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.result-surface {
  --middle-row-min: 360px;
  --middle-row-max: 72vh;
}

.result-surface :deep(.step-middle-body) {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.result-card {
  position: relative;
  width: min(72vw, 340px, calc((59svh - 24px) * 2 / 3));
  aspect-ratio: 2 / 3;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 28px;
  container-type: inline-size;
  filter: drop-shadow(0 10px 22px rgba(28, 12, 87, 0.36));
}

.result-card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-avatar {
  position: absolute;
  top: 34%;
  left: 50%;
  width: 22%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.result-dino-human {
  position: absolute;
  top: 34%;
  left: 50%;
  width: 64%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
}

.result-egg-icon {
  position: absolute;
  top: 59%;
  left: 50%;
  width: 13%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 4;
  filter: drop-shadow(0 3px 7px rgba(38, 15, 101, 0.32));
}

.result-copy {
  position: absolute;
  left: 13%;
  right: 13%;
  top: 66%;
  bottom: 6%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #fff;
  text-align: center;
  font-family: 'ChaoGangHei', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  text-shadow:
    0 3px 0 rgba(18, 33, 102, 0.42),
    0 0 10px rgba(78, 235, 255, 0.35);
}

.result-name {
  margin: 22px 0 8px;
  font-size: clamp(16px, 4cqw, 20px);
  line-height: 1.15;
  letter-spacing: 0.4em;
  color: #fff7ff;
  text-shadow:
    0 0 4px rgba(255, 176, 236, 0.5),
    0 0 4px rgba(255, 83, 206, 0.6),
    0 2px 0 rgba(88, 20, 112, 0.65);
}

.result-description {
  margin: 0;
  font-size: clamp(8px, 3.25cqw, 10px);
  line-height: 1.8;
  letter-spacing: 0.08em;
}

:deep(.bottom-center) {
  --pill-fixed-width: clamp(132px, 40vw, 220px);
}

@media (max-width: 390px) {
  .result-card {
    width: min(78vw, 310px, calc((59svh - 20px) * 2 / 3));
  }

  .result-copy {
    left: 12%;
    right: 12%;
    top: 66%;
    bottom: 6%;
  }
}

@media (min-width: 1025px) {
  .result-card {
    width: min(22vw, 340px, calc((59svh - 24px) * 2 / 3));
  }

  :deep(.bottom-center) {
    --pill-fixed-width: clamp(180px, 24vw, 280px);
  }
}
</style>
