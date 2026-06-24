import { createRouter, createWebHistory } from 'vue-router'
import HomeStepView from '../views/HomeStepView.vue'
import EggSelectView from '../views/EggSelectView.vue'
import NameInputView from '../views/NameInputView.vue'
import AvatarCaptureView from '../views/AvatarCaptureView.vue'
import AvatarReviewView from '../views/AvatarReviewView.vue'
import HatchingProgressView from '../views/HatchingProgressView.vue'
import HatchingFailedView from '../views/HatchingFailedView.vue'
import ResultCardView from '../views/ResultCardView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    showStatus: boolean
    progressStep: number
    progressTotal: number
    timeoutSec?: number
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeStepView,
      meta: {
        showStatus: false,
        progressStep: 0,
        progressTotal: 5,
      },
    },
    {
      path: '/egg',
      name: 'egg',
      component: EggSelectView,
      meta: {
        showStatus: true,
        progressStep: 1,
        progressTotal: 5,
      },
    },
    {
      path: '/name',
      name: 'name',
      component: NameInputView,
      meta: {
        showStatus: true,
        progressStep: 2,
        progressTotal: 5,
      },
    },
    {
      path: '/avatar/capture',
      name: 'avatar-capture',
      component: AvatarCaptureView,
      meta: {
        showStatus: true,
        progressStep: 3,
        progressTotal: 5,
      },
    },
    {
      path: '/avatar/review',
      name: 'avatar-review',
      component: AvatarReviewView,
      meta: {
        showStatus: true,
        progressStep: 4,
        progressTotal: 5,
      },
    },
    {
      path: '/hatching',
      name: 'hatching',
      component: HatchingProgressView,
      meta: {
        showStatus: true,
        progressStep: 5,
        progressTotal: 5,
      },
    },
    {
      path: '/result',
      name: 'result',
      component: ResultCardView,
      meta: {
        showStatus: false,
        progressStep: 5,
        progressTotal: 5,
      },
    },
    {
      path: '/hatching/failed',
      name: 'hatching-failed',
      component: HatchingFailedView,
      meta: {
        showStatus: true,
        progressStep: 5,
        progressTotal: 5,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
