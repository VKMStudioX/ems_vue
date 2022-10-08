<template>
  <div class="app-layout__wrapper">
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else class="dashboard">
      <Header
         class="dashboard__header"
         title="Dashboard"
         navTitle1="Dashboard"
         navLink1="/dashboard"
     />
      <EventsCalendar
          :eventsData="userEvents"
          :isAdmin="isAdmin"
          :initialView="initialView"
          :key="initialView"
          class="dashboard__calendar-container"/>

      <RemindersTable
          class="dashboard__reminder-container"
                :reminders="reminders"
                :loading="loading"
                :key="loading"
                :isAdmin="isAdmin"
                :isManage="false"
                @deleteReminder="handleDeleteReminder($event)"
                @editReminder="handleEditReminder($event)"
            />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import {createToast} from "@/functions/utils";
import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";
import EventsCalendar from "./EventsCalendar.vue"
import RemindersTable from "@/components/tables/RemindersTable";
import Header from "@/components/commons/Header";
import {useWindowSize} from "vue-window-size";

export default {
  name: "Events",
  components: {Header, EventsCalendar, RemindersTable },
  setup() {
    const { width, height } = useWindowSize();
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const userId = computed(() => store.getters["auth/userId"]);
    const isAdmin = computed(() => store.getters["auth/userIsAdmin"]);
    const userEvents = isAdmin.value
      ? computed(() => store.getters["admin/allUsersEvents"])
      : computed(() => store.getters["user/userEvents"]);

    const reminders = computed(() => store.getters["reminder/allReminders"]);

    const initialView = computed(() => {
      return isAdmin.value && width.value > 992
          ? "dayGridWeek"
          : isAdmin.value && width.value < 992
              ? "dayGridDay"
              : "dayGridMonth"
    })

    const getAllReminders = () => {
      store.dispatch("reminder/getAllReminders").then(
          () => (loading.value = false),
          (error) => console.error(error)
      );
    };

    const loading = ref(true);
    onMounted(async () => {
      if (isAdmin.value) {
        await store.dispatch("admin/getAllUsersEvents").then(
          () => (loading.value = false),
          (error) => console.error(error)
        );
      } else {
        await store.dispatch("user/getUserEvents", userId.value).then(
          () => (loading.value = false),
          (error) => console.error(error)
        );
      }
      await getAllReminders()
    });

    const handleDeleteReminder = (id) => {
      loading.value = true;
      store
          .dispatch("reminder/deleteReminder", id)
          .then(
              (res) => {
                createToast(toast, "success", "Success!", `${res.data.message}`, 2000);
                getAllReminders();
              },
              (error) => console.error(error)
          )
          .catch(() => {
            createToast(toast, "error", "Error!", `${errorMsg.value}`, 2000);
            loading.value = false;
          });
    };

    const handleEditReminder = (id) => {
      router.push({
        path: "/edit-reminder",
        query: { id: id },
      });
    };



    return { 
    isAdmin, 
    loading, 
    userEvents,
    reminders,
    initialView,
    handleDeleteReminder,
    handleEditReminder,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.fc-header-toolbar) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>