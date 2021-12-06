<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else class="p-mx-4 p-my-2">
      <EventsCalendar :eventsData="userEvents" :isAdmin="isAdmin"/>
      <RemindersTable
                :reminders="userEvents.reminders"
                :loading="loading"
                :key="loading"
                :isManage="false"
            />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import EventsCalendar from "./EventsCalendar.vue"
import RemindersTable from "@/components/tables/RemindersTable";

export default {
  name: "Events",
  components: { EventsCalendar, RemindersTable },
  setup() {
    const store = useStore();
    const userId = computed(() => store.getters["auth/userId"]);
    const isAdmin = computed(() => store.getters["auth/userIsAdmin"]);
    const userEvents = isAdmin.value
      ? computed(() => store.getters["admin/allUsersEvents"])
      : computed(() => store.getters["user/userEvents"]);

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
    });

    return { 
    isAdmin, 
    loading, 
    userEvents, 
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