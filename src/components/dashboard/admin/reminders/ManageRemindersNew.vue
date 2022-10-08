<template>
  <div class="app-layout__wrapper">
      <div v-if="loading">
            <Loader />
        </div>
        <div v-else class="main">
          <Header
              class="main__header"
              title="Reminders"
              navTitle1="Manage"
              navTitle2="Reminders"
              navTitle3="New Reminder"
              navLink2="/manage-reminders"
              navLink3="/new-reminder"
          />
          <div class="main__container">
    <form
      @submit.prevent="handleSubmit(!validate.$invalid)"
      @invalid.capture.prevent="handleInvalid()"
    >
      <ReminderForm
        @changedVS="handleChangeV$($event)"
        @changedState="handleChangeState($event)"
        :submitted="submitted"
        :isEdit="false"
      />
    </form>
          </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { createToast } from "@/functions/utils";
import ReminderForm from "@/components/forms/ReminderForm";
import Header from "@/components/commons/Header";

export default {
  name: "ManageReminderNew",
  components: { ReminderForm, Header },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("reminder/getNewReminder").then(
        () => (loading.value = false),
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["reminder/apiErrorMsg"]);


    // USERDATA & FORM VALIDATION
    const reminderState = reactive({});
    const handleChangeState = ($event) => {
      reminderState.target = $event;
    };

    const validate = ref({});
    const handleChangeV$ = ($event) => {
      validate.value = $event;
    };

    const submitted = ref(false);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      if (isFormValid) {
        //FORMING THE VOID (REQUEST)

        const reminderData = {
              days_of_week: reminderState && reminderState.target.selectedDOW.map(v => v.id).toString(),
              hour: reminderState && reminderState.target.selectedHOR,
              title: reminderState && reminderState.target.titleOfReminder,
              text: reminderState && reminderState.target.textOfReminder,
              active: reminderState && reminderState.target.activeReminder,
           };

        store
              .dispatch("reminder/newReminder", reminderData)
              .then(
                (res) => {
                  createToast(
                    toast,
                    "success",
                    "Success!",
                    `${res.data.message}`,
                    5000
                  );
                  router.push({
                    path: "/manage-reminders",
                  });
                },
                (error) => {
                  console.error(error);
                }
              )
              .catch(() =>
                createToast(toast, "error", "Error!", `${errorMsg.value}`, 5000)
              )
      } else {
        createToast(
          toast,
          "error",
          "Error!",
          "Bad user data, read the hints below inputs",
          5000
        );
      }
    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    return {
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,

      loading
    };
  },
};
</script>

<style lang="scss"></style>
