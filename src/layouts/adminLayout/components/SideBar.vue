<template>
  <div class="sidebar-container">
    <div style="display: flex">
      <div class="main-routes">
        <div style="height: 50px; display: flex; justify-content: center; align-items: center">
          <img src="@/assets/img/sidebar_firs_logo.png" width="40" />
        </div>
        <div
          style="
            display: flex;
            height: calc(100vh - 80px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            list-style: none;
            color: #ffffff !important;
          "
        >
          <div v-for="ruta in rutasBase" :key="ruta.name" class="my-2">
            <div v-if="!ruta.meta.hidden">
              <router-link :to="ruta.name" custom>
                <el-tooltip
                  class="tooltip"
                  effect="dark"
                  :content="ruta.meta.title"
                  placement="right"
                >
                  <v-icon
                    :name="ruta.meta.icon"
                    scale="1.5"
                    class="main-link"
                    :class="{ mainactive: selectedMain.name == ruta.name }"
                    @click="setSelectetMain(ruta)"
                  />
                </el-tooltip>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="children-routes" style="flex-grow: 1">
        <div>
          <img src="@/assets/img/admin-template.png" alt="Main Logo" />
        </div>
        <div>
          <h4>{{ selectedMain.meta.title }}</h4>
        </div>
        <div>
          <!-- <sidebar-item v-for="route in selectedMain.children" :key="route.path" :item="route" :base-path="route.path"/> -->
          <div v-for="child in selectedMain?.children" :key="child.name">
            <!-- <div v-if="child.children != null && child.children?.length > 0">
              <SidebarItem v-for="route in child.children"  :key="route.path" :item="route" :base-path="route.path" />
            </div> -->
            <div>
              <router-link :to="child.path" custom v-slot="{ isActive, navigate }">
                <div @click="navigate">
                  <v-icon
                    :name="child.meta.icon"
                    class="childrenroute mx-2"
                    :class="{ childrenactive: isActive }"
                  />
                  {{ child.meta.title }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'
// import SidebarItem from './sidebarItem.vue'

const router = useRouter()
const route = useRoute()

const rutasBase = computed(() => router.getRoutes().filter((r) => r.meta.main))
const selectedMain = ref(route.matched[0])
const setSelectetMain = (ruta) => {
  selectedMain.value = ruta
}
// const rutasHijasyNietas = computed(() => { return router.children })
</script>

<style scoped>
.sidebar-container {
  background-color: #506fe4;
}
.main-routes {
  width: 60px;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #506fe4;
}
.children-routes {
  width: 220px;
  height: 100vh;
  padding: 10px;
  background-color: #ffffff;
}

.main-link {
  color: #989ba0;
}

.main-link:focus {
  outline: none;
}
.main-link:active {
  outline: none;
}
.main-link:focus-visible {
  outline: none;
}

.tooltip:active {
  background-color: #384d9f;
}
.mainactive:focus {
  outline: none;
}
.mainactive:focus-visible {
  outline: none;
}
.mainactive:active {
  outline: none;
}
.mainactive {
  color: #ffffff;
  background-color: #384d9f;
  /* padding: 7px; */
  /* background-color: ; */
}

.childrenroute {
  color: #989ba0;
}
.childrenroute:hover {
  color: #506fe4;
}
.childrenactive {
  color: #506fe4;
}
/* 
@media screen and (max-width: 600px) {
  
} */
</style>
