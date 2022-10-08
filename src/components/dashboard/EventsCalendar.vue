<template>
  <div class="full-calendar" :class="isAdmin ? 'admin-calendar' : 'user-calendar'">
    <FullCalendar
      v-if="eventsData"
      :key="initialView"
      :options="options"
    />
  </div>
</template>

<script>
import "@fullcalendar/core/vdom";
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "Dashboard",
  components: { FullCalendar },
  props: {
    eventsData: {
      type: Object,
      required: true,
      default: () => {},
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    initialView: {
      type: String,
      required: true,
      default: ""
    }
  },
  setup(props) {

    const options = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        // left: "",
        left: props.isAdmin ? "" : "dayGridMonth,dayGridWeek,dayGridDay",
        center: "prev title next",
        right: "today",
      },
      views: {
        dayGrid: {
          dayHeaderFormat:
    {  weekday: 'short',
      ...(props.isAdmin && {
        day: '2-digit',
      }),
    }
        }
           },
      editable: false,
      selectable: false,
      selectMirror: false,
      dayMaxEvents: true,
      height: "100%",
      events: [...props.eventsData.absences, ...props.eventsData.absencesBG],
      initialView: props.initialView
    });

    return {
      options,
    };
  },
};
</script>

<style>
</style>