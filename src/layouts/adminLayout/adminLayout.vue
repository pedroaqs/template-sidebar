<template>
    <div class="admin-container">
        <side-bar />
        <admin-main-content />
    </div>
</template>

<script>
import SideBar from "./components/SideBar.vue"
import AdminMainContent from "./components/AdminMainContent.vue";
export default {
    name: 'AdminLayout',
    components: { SideBar, AdminMainContent }
}
</script>
<style>
.admin-container{
    display: flex;
}
</style>