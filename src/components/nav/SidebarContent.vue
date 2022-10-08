<template>
  <div class="sidebar">
    <img src="~@/assets/img/logo.png" alt="logo" class="sidebar__logo sidebar--active" />

    <div class="text-primary">
      Time tracking
      <Countdown
          v-if="loggedIn"
          :timeLimit="1800"
          @start="countdownStart()"
          @change="countdownChange($event)"
          @end="countdownEnd()"
          @warning="countdownWarning()"
      />
    </div>

    <div class="sidebar__divider"></div>

    <div class="sidebar__menu">
      <SidebarMenu @linkClicked="linkClicked()" />
    </div>

    <div class="sidebar__user-panel">
      <SvgIcon icon="profile-circle" class="sidebar__user-panel--icon" />
      <span class="text-primary">{{ user.user.first_name }}</span>
    </div>

    <div class="sidebar__logout">
      <Button type="button" class="button button--secondary-outline button--small-font-size" @click="logOut()">
        <span>Logout</span>
      </Button>
    </div>


  </div>
</template>

<script>
import SidebarMenu from "@/components/nav/SidebarMenu";
import Countdown from "@/components/commons/Countdown";
import {createToast} from "@/functions/utils";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";
import {computed, ref} from "vue";

export default {
  name: "SidebarContent",
  components: {SidebarMenu, Countdown},
  setup(props, {emit}) {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const loggedIn = computed(() => store.getters["auth/userIsLogged"]);
    const userEmail = computed(() => store.getters["auth/userEmail"]);
    const user = computed(() => store.getters["auth/user"]);

    const isCollapsed = ref(true);

    const logOut = () => {
      router.push("/login");
      store.dispatch("auth/logout").then(
          (res) => {
            window.sessionStorage.removeItem("timePassed");
            createToast(
                toast,
                "info",
                res.message ? res.message : "Logged out!",
                "",
                2000
            );
          },
          (error) => {
            createToast(
                toast,
                "error",
                "Not logged",
                error.message ? error.message : "Not logged out",
                2000
            );
          }
      );
    };
    const countdownStart = () => {
      // function for event handling when the countdown is started, but at this moment nothing there
    };
    const countdownChange = ($event) => {
      window.sessionStorage.setItem("timePassed", $event);
    };
    const countdownEnd = () => {
      window.sessionStorage.removeItem("timePassed");
      logOut();
    };
    const countdownWarning = () => {
      createToast(
          toast,
          "warn",
          "The session time is coming to an end",
          `Click on the timer for refresh session time`,
          2000
      );
    };

    const linkClicked = () => {
      emit('linkClicked')
    }

    return {
      isCollapsed,
      loggedIn,
      userEmail,
      user,
      logOut,
      countdownStart,
      countdownChange,
      countdownEnd,
      countdownWarning,
      linkClicked
    }
  },
  emits: ['linkClicked'],
}
</script>

<style scoped>

</style>