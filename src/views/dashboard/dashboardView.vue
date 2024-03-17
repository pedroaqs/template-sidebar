<template>
  <div>Bienvenido {{ UserInfo }}</div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
export default {
  name: 'DashboardView',
  setup() {
    const authStore = useAuthStore();
    const UserInfo = computed(() => authStore.getUser);
    return {
        UserInfo,
    };
  }
}
</script>
