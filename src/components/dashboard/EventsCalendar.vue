<template>
  <div>
    <FullCalendar
      v-if="eventsData"
      :key="eventsData"
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
  name: "EventsCalendar",
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
    }
  },
  setup(props) {
    const options = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),

      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: props.isAdmin ? "" : "dayGridMonth,timeGridWeek,timeGridDay",
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      height: "52.5vh",
      events: [...props.eventsData.absences, ...props.eventsData.absencesBG],
      eventBackgroundColor: "#666",
      eventTextColor: "#fff",
      initialView: props.isAdmin ? "dayGridWeek" : "dayGridMonth",
    });

    return { options };
  },
};
</script>

<style>
</style>