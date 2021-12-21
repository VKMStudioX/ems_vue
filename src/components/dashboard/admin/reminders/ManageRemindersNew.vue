<template>
  <div>
      <div v-if="loading">
            <Loader />
        </div>
        <div v-else>
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
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { createToast } from "@/functions/utils";
import ReminderForm from "@/components/forms/ReminderForm";

export default {
  name: "ManageReminderNew",
  components: { ReminderForm },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getNewReminder").then(
        () => (loading.value = false),
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);


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
              days_of_week: reminderState && reminderState.target.selectedDOW.toString(),
              hour_of_reminder: reminderState && reminderState.target.selectedHOR,
              title_of_reminder: reminderState && reminderState.target.titleOfReminder,
              text_of_reminder: reminderState && reminderState.target.textOfReminder,
              active_reminder: reminderState && reminderState.target.activeReminder,
           };

        store
              .dispatch("admin/newReminder", reminderData)
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
                    path: "/dashboard/manage-reminders",
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
