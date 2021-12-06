<template>
  <div class="p-grid p-header p-m-0">
    <div class="p-col-2 p-md-2 p-p-2">
      <div class="p-text-uppercase p-text-bold">
        <span class="p-text-OSC p-text-large">
        <font-awesome-icon  :icon="['fas', 'user-cog']" />
          ems
          </span>
      </div>
    </div>

    <div class="p-col-7 p-md-7 p-p-2">
      <MenuTop />
    </div>

    <div class="p-col-3 p-md-3 p-user-panel p-p-2">
      <UserPanel />
    </div>
  </div>
</template>

<script>
import MenuTop from "../components/nav/MenuTop";
import UserPanel from "../components/nav/UserPanel";

export default {
  name: "Header",
  components: { MenuTop, UserPanel },
};
</script>

<style lang="scss">
.p-header {
  background-color: var(--surface-a);
  height: 68px;
}

.p-text-large {
  font-size: 2.5rem;
}

.p-user-panel {
  z-index: 666 !important;
}
</style>
