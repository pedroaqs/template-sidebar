<template>
  <div class="admin-main-container">
    <el-row>
      <el-col :span="appStore.isPhone? 3:2" :xs="3" :sm="3" :md="2" :lg="1">
        <v-icon
          :name="appStore.sidebarActive?'hi-solid-menu':'io-close'"
          style="color: var(--el-text-color-primary)"
          scale="2"
          @click="appStore.toggleSideBar()"
        />
      </el-col>
      <el-col :span="appStore.isPhone? 15:11" :xs="15" :sm="15" :md="11" :lg="11">
        <div style="display: flex; align-items: center">
          <v-icon v-if="PageInfo.icon" :name="PageInfo.icon" style="margin-right: 15px" scale="2" />
          <h4 v-if="appStore.isPhone">{{ PageInfo.title || 'CERSA' }}</h4>
          <h2 v-else>{{ PageInfo.title || 'CERSA' }}</h2>
        </div>
      </el-col>
      <el-col :span="appStore.isPhone?6:11" :xs="6" :sm="6" :md="11" :lg="12">
        <sidebar-user />
      </el-col>
    </el-row>
    <el-divider />
    <el-card style="height: calc(100vh -130px)">
      <RouterView />
    </el-card>
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
  padding: 20px;
  color: var(--el-text-color-primary);
  transition: margin-left 0.3s ease; /* Agrega una transición para el deslizamiento */
}

</style>
