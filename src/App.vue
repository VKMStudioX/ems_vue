<template>
  <div>
      <SvgSprite />
      <Toast />
      <ConfirmPopup />
      <component :is="layout">
        <router-view></router-view>
      </component>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SvgSprite from "@/components/commons/SvgSprite";

const defaultLayout = 'AppLayout'
export default {
  name: "App",
  components: {SvgSprite},
  setup() {
    const route = useRoute();
    const layout = computed(() => { return (route.meta.layout || defaultLayout) })
    return { layout }
  }
};
</script>

<style lang="scss"></style>
