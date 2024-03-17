import {  watchEffect } from 'vue';
import { useAuthStore } from "@/stores/auth";

async function checkPermission(el,binding) {

    const { value } = binding;
    const authStore = await useAuthStore(); 
    if(!authStore) {
      return
    }
    const permissions = authStore.getPermissions;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = permissions.some(permission => {
        return permissionRoles.includes(permission);
      });

      if (!hasPermission) {
        el.remove();
      }
    } else {
      throw new Error(
        `Necesita tener permisos! como v-permission="['litar-permisos']"`
      );
    }
  }
export default {
  mounted(el, binding) {
    const unwatch = watchEffect(() => {
      checkPermission(el, binding);
    });

    // Limpia el watcher cuando el elemento se destruye
    el._cleanup = () => unwatch();
    // checkPermission(el, binding);
  },
  updated(el, binding) {
    // Solo actualiza si es necesario
    if (binding.value !== binding.oldValue) {
      checkPermission(el, binding);
    }
  },
  unmounted(el) {
    // Limpia el watcher cuando el elemento se destruye
    el._cleanup && el._cleanup();
  }
};
