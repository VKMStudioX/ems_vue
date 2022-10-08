<template>
  <div class="switch">
      <span
          class="switch__label"
          :class="value
          ? 'switch__label--active'
          : 'switch__label--inactive'"
      >Active</span>

    <div class="switch__wrapper"
         :class="value
            ? 'switch__wrapper--active'
            : 'switch__wrapper--inactive'"
    >

      <input
          id="toggle-on"
          class="switch__toggle switch__toggle-left"
          name="toggle"
          :value="true"
          v-model="value"
          type="radio"
          checked
      >
      <label for="toggle-on" class="switch__container">

        <SvgIcon
            :icon="value
            ? 'checkmark'
            : 'lines'"
            :class="value
            ? 'switch__icon--checkmark '
            : 'switch__icon--lines'"
        />

      </label>
      <input
          id="toggle-off"
          class="switch__toggle switch__toggle-right"
          name="toggle"
          :value="false"
          v-model="value"
          type="radio"
      >
      <label for="toggle-off" class="switch__container">
        <SvgIcon
            :icon="value
            ? 'lines'
            : 'close'"
            :class="value
            ? 'switch__icon--lines'
            : 'switch__icon--close'"
        />
      </label>
    </div>
    <span
        class="switch__label"
        :class="!value
            ? 'switch__label--active'
            : 'switch__label--inactive'"
    >Inactive</span>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Switch",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}

</script>

<style scoped>

</style>