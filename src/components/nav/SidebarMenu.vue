<template>
<div class="menu">
  <RouterLink
      @click="linkClicked()"
      :to="menuItems[0].to"
      class="menu__link"
      :class="actualPath.includes(menuItems[0].to) ? 'menu__link--active' : ''"
  >
    <SvgIcon :icon="menuItems[0].icon" class="menu__icon" />
    {{ menuItems[0].label }}
  </RouterLink>
  <span class="menu__link menu__link--header" :class="menuItemsSubAdmin.some(v => v.to === actualPath) || menuItemsSubAdmin.some(v => v.to === actualPath) ? 'menu__link--category-active' : ''">
    <SvgIcon :icon="menuItems[1].icon" class="menu__icon" />
    {{ menuItems[1].label }}
  </span>
</div>
  <div class="menu menu--subcategory">
    <RouterLink
        @click="linkClicked()"
        v-for="menuItemSub in userIsAdmin ? menuItemsSubAdmin : menuItemsSubUser"
        :key="menuItemSub.index"
        :to="menuItemSub.to"
        class="menu__link"
        :class="actualPath.includes(menuItemSub.to) ? 'menu__link--active' : ''"
    >
      <SvgIcon :icon="menuItemSub.icon" class="menu__icon" />
      {{ menuItemSub.label }}
    </RouterLink>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import SvgIcon from "@/components/commons/SvgIcon";

export default {
  name: "SidebarMenu",
  components: {SvgIcon},
  setup(props, {emit}) {
    const route = useRoute();
    const store = useStore();
    const userIsAdmin = computed(() => store.getters["auth/userIsAdmin"]);
    const actualPath = computed(() => { return route.path; });

    const menuItems = ref([
      {
        index: 0,
        label: "Dashboard",
        icon: "dashboard",
        to: "/dashboard",
      },
      {
        index: 1,
        label: "Manage",
        icon: "manage",
        to: "/manage-reminders",
      },
    ]);

    const menuItemsSubAdmin = ref([
      {
        index: 0,
        label: "Reminders",
        icon: "reminders",
        to: "/manage-reminders",
      },
      {
        index: 1,
        label: "Holidays",
        icon: "holidays",
        to: "/manage-holidays",
      },
      {
        index: 2,
        label: "Users",
        icon: "users",
        to: "/manage-users",
      }
      ]);

    const menuItemsSubUser = ref([
      {
        index: 0,
        label: "Absences",
        icon: "holidays",
        pathCheck: "absences",
        to: "/manage-absences",
      }
    ]);

    const linkClicked = () => {
      emit('linkClicked')
    }

    return {
      actualPath,
      menuItems,
      menuItemsSubAdmin,
      menuItemsSubUser,
      userIsAdmin,
      linkClicked
    };
  },
  emits: ['linkClicked']
};
</script>

<style scoped>

</style>