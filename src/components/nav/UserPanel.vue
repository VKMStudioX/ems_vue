<template>
  <Panel v-if="loggedIn" :toggleable="true" v-model:collapsed="isCollapsed">
    <template #header>
      <div class="p-user-panel-header">
        <div>
          <font-awesome-icon :icon="['fas', 'user-tag']" class="p-mr-1" />
          {{ userEmail.slice(0, userEmail.indexOf("@")) }}
        </div>
        <Countdown
          v-if="loggedIn"
          :timeLimit="1800"
          @start="countdownStart()"
          @change="countdownChange($event)"
          @end="countdownEnd()"
          @warning="countdownWarning()"
        />
      </div>
    </template>
    <p>
      <a @click.prevent="logOut()" class="p-cursor-pointer"
        ><font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          class="p-mr-2"
        />Logout</a
      >
    </p>
  </Panel>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { createToast } from "../../functions/utils";
import Countdown from "../commons/Countdown";

export default {
  name: "UserPanel",
  components: { Countdown },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const loggedIn = computed(() => store.getters["auth/userIsLogged"]);
    const userEmail = computed(() => store.getters["auth/userEmail"]);
    const user = computed(() => store.getters["auth/user"]);

    const isCollapsed = ref(true);

    const logOut = () => {
      store.dispatch("auth/logout").then(
        (res) => {
          window.sessionStorage.removeItem("timePassed");
          router.push("/login");
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
    };
  },
};
</script>

<style scoped lang="scss">
.p-user-panel-header {
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
}

.p-panel {
  background-color: white !important;
}
</style>
