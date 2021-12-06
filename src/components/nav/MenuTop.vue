<template>
  <div class="p-d-flex">
    <div v-for="menuItem in menuItems" :key="menuItem.index">
      <Button
        v-if="menuItem.visible === true"
        type="button"
        class="p-button-text p-button-plain"
        :class="actualPath.includes(menuItem.pathCheck) ? 'p-menu-active' : ''"
        @click="
          menuItem.index !== 2
            ? handleNavigation(menuItem.index, 'normal')
            : menuAdminToggle($event)
        "
        aria-haspopup="true"
        aria-controls="overlay_tmenu"
      >
        <font-awesome-icon class="p-mr-2" :icon="['fas', menuItem.icon]" />
        <span class="p-ml-2 p-text-bold">{{ menuItem.label }}</span>
      </Button>
    </div>

    <!-- KPI's menu -->
    <OverlayPanel
      ref="menuAdmin"
      appendTo="body"
      id="overlay_panel"
      style="display: flex; width: 12.5rem;"
      :breakpoints="{ '960px': '75vw' }"
    >
      <div v-for="menuItemAdmin in menuItems[2].children" :key="menuItemAdmin.index">
        <Button
          v-if="menuItemAdmin.visible === true"
          :disabled="menuItemAdmin.pathCheck === 'dcm'"
          type="button"
          class="p-button-text p-button-plain"
          :class="
            ['btn', (actualPath.includes(menuItemAdmin.pathCheck) ? 'p-menu-active' : ''), (menuItemAdmin.pathCheck === 'dcmWatchdog' || menuItemAdmin.pathCheck === 'dcmAvailability' ? 'p-button-sm p-menu-left-small' : '')]
          "
          @click="handleNavigation(menuItemAdmin.index, 'admin')"
        >
          <font-awesome-icon class="p-mr-2" :icon="['fas', menuItemAdmin.icon]" />
          <span class="p-ml-2 p-text-bold">{{ menuItemAdmin.label }}</span>
        </Button>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "MenuTop",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const userIsAdmin = computed(() => store.getters["auth/userIsAdmin"]);
    const actualPath = computed(() => {
      return route.path;
    });

    const menuItems = ref([
      {
        index: 0,
        label: "Dashboard",
        icon: "house-user",
        pathCheck: "dashboard/events",
        to: "/dashboard/events",
        visible: true,
      },
      {
        index: 1,
        label: "Absences",
        icon: "times-circle",
        pathCheck: "dashboard/absences",
        to: "/dashboard/absences",
        visible: userIsAdmin.value === false,
      },
      {
        index: 2,
        label: "Manage",
        icon: "cog",
        pathCheck: "manage",
        to: "/dashboard/manage-reminders",
        visible: userIsAdmin.value === true,
        children: [
          {
            index: 0,
            label: "Reminders",
            icon: "envelope",
            pathCheck: "reminders",
            to: "/dashboard/manage-reminders",
            visible: true,
          },
          {
            index: 1,
            label: "Holidays",
            icon: "calendar-times",
            pathCheck: "/dashboard/manage-holidays",
            to: "/dashboard/manage-holidays",
            visible: true,
          },
          {
            index: 2,
            label: "Users",
            icon: "user",
            pathCheck: "/dashboard/manage-users",
            to: "/dashboard/manage-users",
            visible: true,
          }
        ]
      },
    ]);

    const handleNavigation = (navIndex, type) => {
      router.push({
        path:
          type === "admin"
            ? menuItems.value[2].children[navIndex].to
            : menuItems.value[navIndex].to,
      });
    };

    const menuAdmin = ref();

    const menuAdminToggle = (event) => {
      menuAdmin.value.toggle(event);
    };

    return {
      menuItems,
      actualPath,
      menuAdmin,
      handleNavigation,
      menuAdminToggle,
    };
  },
};
</script>

<style lang="scss">
.p-menu-active {
  border-bottom: 2px solid var(--blue-300) !important;
  color: var(--blue-300) !important;
}
</style>
