<template>
  <div class="app-layout">

    <div v-if="windowWidth < 768" class="responsive-menu">
      <SvgIcon icon="arrow-double" class="responsive-menu__icon" @click="toggleSidebar()" />
      <img src="~@/assets/img/logo.png" alt="logo" class="responsive-menu__logo" />

      <Sidebar v-model:visible="sidebarActive">
        <SidebarContent @linkClicked="toggleSidebar()" />
      </Sidebar>

    </div>
    <div v-else>
      <SidebarContent />
    </div>



  <div class="app-layout__main">
          <router-view></router-view>
  </div>

  </div>
</template>

<script>
import {ref} from "vue";
import {useWindowSize} from "vue-window-size";
import SidebarContent from "@/components/nav/SidebarContent"
import SvgIcon from "@/components/commons/SvgIcon";
export default {
  name: "AppLayout",
  components: {SvgIcon, SidebarContent },
  setup() {

   const { width, height } = useWindowSize();
   const sidebarActive = ref(false);

   const toggleSidebar = () => { sidebarActive.value = !sidebarActive.value}

    return {
      windowWidth: width,
      windowHeight: height,
      sidebarActive,
      toggleSidebar,
    }
  }
}
</script>

<style scoped>

</style>