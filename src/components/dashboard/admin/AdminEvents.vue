<template>
  <div>
    <div v-if="loading && !userEvents.length > 0">
      <Loader />
    </div>
    <div v-else class="p-mx-4 p-my-2">
      <FullCalendar :key="userEvents" :options="options" />
    </div>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "AdminEvents",
  components: { FullCalendar },
  setup() {
    const store = useStore();
    const isAdmin = computed(() => store.getters["auth/userIsAdmin"]);
    const userEvents = computed(() => store.getters["admin/allUsersEvents"]);

    const loading = ref(true);
    onMounted(async () => {
        await store.dispatch("admin/getAllUsersEvents").then(
          () => (loading.value = false),
          (error) => console.error(error)
        );
    });

    const options = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),

      headerToolbar: {
        left: "prev,next today",
        center: "title",
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      height: "85vh",
      events: [
        ...userEvents.value.reminders,
        ...userEvents.value.remindersBG,
        ...userEvents.value.absencesBG,
      ],
      eventBackgroundColor: "#666",
      eventTextColor: "#fff",
      initialView:  "dayGridWeek",
    });

    return { options, isAdmin, loading, userEvents };
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