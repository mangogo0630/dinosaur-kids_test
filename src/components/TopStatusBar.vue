<script setup lang="ts">
const props = defineProps<{
  step: number
  total: number
}>()
</script>

<template>
  <header class="top-status">
    <div class="progress-bar-container" role="progressbar" :aria-valuenow="step" :aria-valuemin="1" :aria-valuemax="total">
      <div 
        v-for="i in total" 
        :key="i"
        class="progress-segment"
        :class="{ active: i === step }"
      ></div>
    </div>
  </header>
</template>

<style scoped>
.top-status {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  display: flex;
  /* gap: 2px; */ 
}

.progress-segment {
  flex: 1; 
  background-color: #b199f3; 
  position: relative;
}

.progress-segment.active {
  background-color: #ffde59; 
  box-shadow: 0 0 10px rgba(255, 222, 89, 0.9);
  z-index: 2; 
}
</style>
