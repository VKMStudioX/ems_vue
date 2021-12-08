<template>
  <div :class="width > 666 ? 'p-grid' : ''" class="p-header p-m-0">
    <div class=" p-xs-12 p-sm-4 p-md-2 p-p-2">
      <span class="p-text-uppercase p-text-bold p-text-OSC p-text-large">
        <font-awesome-icon  :icon="['fas', 'user-cog']" />
         ems
      </span>
    </div>

    <div class=" p-xs-12 p-sm-4 p-xs-12 p-md-7 p-p-2">
      <MenuTop />
    </div>

    <div class="p-xs-12 p-sm-4 p-md-3 p-user-panel p-p-2">
      <UserPanel />
    </div>
  </div>
</template>

<script>
import MenuTop from "../components/nav/MenuTop";
import UserPanel from "../components/nav/UserPanel";
import { useWindowSize } from "vue-window-size";

export default {
  name: "Header",
  components: { MenuTop, UserPanel },
  setup() {
        const { width, height } = useWindowSize();


        return { width }
  }
};
</script>

<style lang="scss">
.p-header {
  background-color: var(--surface-a);
  height: 68px;

  @media only screen and (max-width: 666px) {
    height: 100%;
  }
}

.p-text-large {
  font-size: 2.5rem;
}

.p-user-panel {
  z-index: 666 !important;
}
</style>
