<template>
  <div class="flexgrid">
    <div class="vertical-container">
      <Toast />
      <ConfirmPopup />
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss"></style>
