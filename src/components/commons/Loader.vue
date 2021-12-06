<template>
  <div class="p-loader"><ProgressSpinner /></div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped lang="scss">
.p-loader {
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center !important;
  transform: translate(0%, 35vh);
}
</style>
