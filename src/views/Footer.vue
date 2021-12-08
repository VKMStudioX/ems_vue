<template>
  <div class="p-d-flex p-ai-center p-jc-between p-footer p-p-2">
    <div>
      <span class="p-text-RussoOne p-m-3 p-p-3"
        >Employee Management System</span
      >
    </div>
    <div>
      <span class="p-text-RussoOne p-m-3 p-p-3"
        >&copy; 2021 by Krzysztof Meyer for IT company as a recruitment task.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
.p-footer {
  background-color: var(--surface-a);
  min-height: 22px;
  max-height: 100%;
  font-size: 0.75rem;
  flex-direction: row;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
  }
}
</style>
