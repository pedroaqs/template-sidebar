<template>
  <div :class="{ 'sidebar-hidden': isCollapse }" class="sidebar-container">
    <div style="display: flex">
      <div class="main-router py-2 px-2">
        <div style="height: 50px; display: flex; justify-content: center; align-items: center;">
          <img src="@/assets/img/sidebar_firs_logo.png" width="40"/>
        </div>
        <div style="display: flex; height: calc(100vh - 80px); flex-direction: column; align-items: center; justify-content: center;">
          <div>
            icono1
          </div>
          <div>
            icono2
          </div>
        </div>
      </div>
      <div>
        <div class="sidebar-header">
          <v-icon
            id="icon-close"
            :name="appStore.sidebarActive ? 'hi-solid-menu' : 'io-close'"
            style="color: var(--el-bg-color-page); margin-left: 85%"
            scale="2"
            @click="appStore.toggleSideBar()"
          />
          <img class="sidebar-image" src="@/assets/img/admin-template.png" alt="Main Logo" />
        </div>
        <div class="sidebar-body">
          <el-scrollbar style="height: 80vh">
            <el-menu default-active="/dashboard/index">
              <sidebar-item
                v-for="route in MenuItems"
                :key="route.path"
                :item="route"
                :base-path="route.path"
              />
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import SidebarItem from './sidebarItem.vue'
import { useAppStore } from '../../../stores/app'

// const isCollapse = ref(true);
const authStore = useAuthStore()
const appStore = useAppStore()
const MenuItems = computed(() => {
  return authStore.userAccessRoutes || []
})
const isCollapse = computed(() => {
  return appStore.sidebarActive
})
</script>

<style>
.sb-icon-close {
  display: none;
}
.sidebar-container {
  width: 450px;
  height: 100vh;
  background-color: var(--template-color-primary);
  transition: margin-left 0.3s ease;
  overflow: hidden;
  padding: 15px 0;
  display: block;
}

.sidebar-hidden {
  display: none;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
}

.sidebar-image {
  padding: 25px;
  max-height: 300px;
}

.sidebar-body {
  padding: 10px 0;
}

#icon-close {
  display: none;
}
.main-router {
  width: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Media query para pantallas más pequeñas (por ejemplo, dispositivos móviles) */
@media screen and (max-width: 600px) {
  .sidebar-container {
    position: absolute;
    z-index: 9999;
    display: block;
    width: 80vw; /* Ancho para dispositivos móviles */
    transform: translateX(0);
    transition: transform 0.4s ease;
  }

  .sidebar-hidden {
    margin-left: -70vw; /* Oculta el sidebar hacia la izquierda en dispositivos móviles */
    transform: translateX(-100%);
  }
  #icon-close {
    display: block;
  }
}
</style>
