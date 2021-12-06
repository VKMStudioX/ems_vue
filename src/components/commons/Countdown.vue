<template>
  <div @click="isWarning && countdownReset($event)">
    <font-awesome-icon
      :icon="['fas', 'stopwatch']"
      :style="{ color: countdownColor() }"
      class="p-mr-1"
      :class="{ 'p-cursor-pointer': isWarning }"
    />
    <span
      :style="{ color: countdownColor() }"
      :class="{ 'p-cursor-pointer': isWarning }"
      >{{ formattedTimeLeft }}</span
    >
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useConfirm } from "primevue/useconfirm";

export default {
  name: "Countdown",
  props: {
    timeLimit: {
      type: Number,
      required: true,
      default: 75,
    },
    warningTime: {
      type: Number,
      required: false,
      default: 300,
    },
    alertTime: {
      type: Number,
      required: false,
      default: 60,
    },
  },
  setup(props, { emit }) {
    const colorCodes = {
      info: {
        color: "var(--text-color)",
      },
      warning: {
        color: "var(--yellow-500)",
        threshold: props.warningTime,
      },
      alert: {
        color: "var(--pink-300)",
        threshold: props.alertTime,
      },
    };

    const confirm = useConfirm();

    const timePassed = ref(0);
    const timerInterval = ref(0);
    const isWarning = ref(false);

    const onTimesUp = () => clearInterval(timerInterval.value);
    const startTimer = () =>
      (timerInterval.value = setInterval(() => (timePassed.value += 1), 1000));

    const timeLeft = computed(() => {
      return props.timeLimit - timePassed.value;
    });

    const formattedTimeLeft = computed(() => {
      const timeLeftBuffer = timeLeft.value / 60;
      let minutes = parseInt(timeLeftBuffer.toString());
      let seconds = Math.round((timeLeftBuffer - minutes) * 60);
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${minutes}:${seconds}`;
    });

    const countdownReset = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Refresh the session timer?",
        icon: "pi pi-clock",
        accept: () => {
          timePassed.value = 0;
        },
      });
    };

    const countdownColor = () => {
      const { alert, warning, info } = colorCodes;

      if (timeLeft.value <= alert.threshold) {
        return alert.color;
      } else if (timeLeft.value <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    };

    // watcher - end of counting time and logout (in higher component) when the counter reaches the time Limit
    watch(timeLeft, (value) => {
      const { warning } = colorCodes;
      isWarning.value = timeLeft.value <= warning.threshold;
      if (value === 0) {
        onTimesUp();
        emit("end");
      }
    });

    watch(isWarning, (value, prevValue) => {
      if (value !== prevValue && value === true) {
        emit("warning");
      }
    });

    // watcher - save the timePassed to sessionStorage (in higher component) whenever the timePassed has changed (for every one sec)
    watch(timePassed, (value, prevValue) => {
      if (value !== prevValue && value !== props.timeLimit) {
        emit("change", value.toString());
      }
    });

    onMounted(() => {
      timePassed.value = parseInt(sessionStorage.getItem("timePassed") || 0);
      startTimer();
      emit("start");
    });

    return {
      formattedTimeLeft,
      timeLeft,
      isWarning,
      countdownColor,
      countdownReset,
    };
  },
  emits: ["start", "change", "end", "warning"],
};
</script>

<style scoped lang="scss"></style>
