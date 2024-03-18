<template>
  <div class="admin-main-container">
    <div style="height: 60px; background-color: #ffffff; display: flex; align-items: center; justify-content: end;">
      <SidebarUser />
    </div>
    <div class="px-2" style="">
      <el-scrollbar style="height: calc(100vh - 80px); background-color: f2f3f7;">
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue'
import { useAppStore } from '../../../stores/app'
import { useAuthStore } from '../../../stores/auth'
import SidebarUser from './SidebarUser.vue'

const authStore = useAuthStore()
const appStore = useAppStore()
const PageInfo = computed(() => {
  return authStore.getCurrentPageInfo
})
</script>

<style scoped>
.admin-main-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--el-text-color-primary);
  transition: margin-left 0.3s ease; /* Agrega una transición para el deslizamiento */
}

</style>
