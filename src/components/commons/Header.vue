<template>
<header class="header">
  <span class="heading-secondary text-primary">{{ title }}</span>
  <div class="header__navbar">
    <div class="header__navbar--container" v-if="navTitle3">
      <RouterLink v-if="navTitle3 && navTitle2 && navLink3" :to="navLink3" class="menu__link header__navbar--link" :class="{'menu__link--active' : actualPath.includes(navLink3) }"> {{ navTitle3}} </RouterLink>
      <span v-if="navTitle3 && navTitle2 && !navLink3" class="text-secondary">{{ navTitle3 }} </span>
    </div>

    <div class="header__navbar--container" v-if="navTitle3 && navTitle2">
      <SvgIcon icon="arrow" class="header__navbar--icon"></SvgIcon>
    </div>

    <div class="header__navbar--container" v-if="navTitle2" >
      <RouterLink v-if="navTitle2 && navLink2" :to="navLink2" class="menu__link header__navbar--link" :class="{'menu__link--active' : actualPath.includes(navLink2) }"> {{ navTitle2 }} </RouterLink>
      <span v-if="navTitle2 && !navLink2" class="text-secondary">{{ navTitle2 }} </span>
    </div>
    <div  class="header__navbar--container" >
      <SvgIcon v-if="navTitle2" icon="arrow" class="header__navbar--icon"></SvgIcon>
    </div>

    <div class="header__navbar--container">
      <RouterLink v-if="navLink1" :to="navLink1" class="menu__link header__navbar--link" :class="{'menu__link--active' : actualPath.includes(navLink1) }"> {{ navTitle1 }} </RouterLink>
      <span  v-if="!navLink1" class="text-secondary">{{ navTitle1 }}</span>
    </div>

  </div>

</header>
</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
      default: 'Dashboard',
    },
    navTitle1: {
      type: String,
      required: true,
      default: 'Dashboard'
    },
    navTitle2: {
      type: String,
      required: false,
      default: ''
    },
    navTitle3: {
      type: String,
      required: false,
      default: ''
    },
    navLink1: {
      type: String,
      required: false,
      default: ''
    },
    navLink2: {
      type: String,
      required: false,
      default: ''
    },
    navLink3: {
      type: String,
      required: false,
      default: ''
    },
  },
  setup() {
  const route = useRoute();
  const actualPath = computed(() => {
    return route.path;
  });

  return {
    actualPath
  }
}
}
</script>

<style scoped>

</style>