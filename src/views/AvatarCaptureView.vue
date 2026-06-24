<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { hatchSession } from '../stores/hatchSession'
import DoctorNote from '../components/DoctorNote.vue'
import BottomActionBar from '../components/BottomActionBar.vue'
import StepMiddleSurface from '../components/StepMiddleSurface.vue'
import cameraFaceUrl from '../assets/images/CameraFace.png'

const router = useRouter()

const videoEl = ref<HTMLVideoElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const stream = ref<MediaStream | null>(null)
const cameraError = ref<string | null>(null)
const isCapturing = ref(false)

async function initCamera() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    })
    stream.value = mediaStream
    if (videoEl.value) {
      videoEl.value.srcObject = mediaStream
    }
  } catch (err) {
    console.error('相機存取失敗:', err)
    cameraError.value = '無法存取相機，請確認瀏覽器權限設定。'
  }
}

function stopCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
}

onMounted(() => {
  void initCamera()
})

onBeforeUnmount(() => {
  stopCamera()
})

function startCapture() {
  if (!stream.value || isCapturing.value) return
  isCapturing.value = true
  void captureFrame()
}

async function captureFrame() {
  if (!videoEl.value || !canvasEl.value) {
    isCapturing.value = false
    return
  }

  const video = videoEl.value
  const canvas = canvasEl.value
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return
  
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const size = Math.min(vw, vh);
  const sx = (vw - size) / 2;
  const sy = (vh - size) / 2;

  canvas.width = size;
  canvas.height = size;



  // 左右翻轉畫布
  ctx.translate(canvas.width, 0)
  ctx.scale(-1, 1)

  ctx.drawImage(
  video,
  sx, sy, size, size,   // source (crop)
  0, 0, size, size      // destination
  );

  // 匯出圖片
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', 0.6)
  )
  hatchSession.avatarDataUrl = dataUrl
  hatchSession.avatarBlob = blob

  stopCamera()
  void router.push({ name: 'avatar-review' })
}
</script>

<template>
  <section class="step-page capture-flow">
    <DoctorNote>
      <template #title>拍攝頭像</template>
      <p>現在對準鏡頭範圍</p>
      <p>自拍一張</p>
    </DoctorNote>

    <StepMiddleSurface size="compact" layout="content">
      <div class="sketch-card capture-card">
        <div class="camera-stage">
          <!-- 攝影機串流 -->
          <video
            v-show="!cameraError"
            ref="videoEl"
            class="camera-video"
            autoplay
            playsinline
            style="transform: scaleX(-1);"
          ></video>

          <!-- 錯誤或載入中的空間 -->
          <div v-if="cameraError" class="camera-placeholder">
            <p class="camera-icon" aria-hidden="true">🚫</p>
            <p class="camera-text">{{ cameraError }}</p>
          </div>
          <div v-else-if="!stream" class="camera-placeholder">
            <p class="camera-icon" aria-hidden="true">📷</p>
            <p class="camera-text">正在開啟相機...</p>
          </div>

          <!-- 對齊框 -->
          <img
            class="face-guide"
            :src="cameraFaceUrl"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </StepMiddleSurface>

    <!-- 擷取畫面 -->
    <canvas ref="canvasEl" style="display: none;"></canvas>

    <BottomActionBar 
      next-label="拍照" 
      :disabled="!stream || isCapturing" 
      @next="startCapture" 
    />
  </section>
</template>

<style scoped>
.sketch-card {
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 14px;
  background: #fff;
}

.capture-flow {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.capture-card {
  width: clamp(320px, 84vw, 980px);
  max-width: calc(100vw - 16px);
  flex: 1 1 auto;
  min-height: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: transparent;
  border: none;
  box-shadow: none;
}

@media (min-width: 1025px) {
  .capture-card {
    width: clamp(320px, 62vw, 560px);
    max-width: calc(100vw - 32px);
  }
}

.camera-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  border-radius: 20px;
  overflow: hidden;
}

.camera-video,
.captured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  color: #d3d7de;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
    #111826;
  z-index: 10;
}

.camera-icon {
  margin: 0;
  font-size: 46px;
}

.camera-text {
  margin: 0;
  font-size: 14px;
}

.face-guide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  z-index: 5;
}

</style>
