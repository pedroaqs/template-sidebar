import { defineStore } from "pinia";

export const useAppStore = defineStore('AppStore',{
    state: () => ({
        isPhone: false,
        sidebarActive: false,
    }),
    actions: {
        checkDeviceType() {
            const userAgent = window.navigator.userAgent.toLowerCase();
            this.isPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            this.sidebarActive = !this.isPhone
        },
        toggleSideBar() {
            this.sidebarActive = !this.sidebarActive
        }
    },
})