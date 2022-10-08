<template>
  <svg class="icon" :class="class">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>

</style>