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
        :isEdit="true"
      />
    </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import { createToast } from "@/functions/utils";
import ReminderForm from "@/components/forms/ReminderForm";

export default {
  name: "ManageRemindersEdit",
  components: { ReminderForm },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getAllReminders").then(
        () => {
          store.commit("admin/getReminderById", id);
          loading.value = false;
        },
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // REMINDER DATA FROM STORE
    const reminderData = computed(() => store.getters["admin/reminderData"]);
    const isDOWChanged = ref(false)
    const isHORChanged = ref(false)
    const isTitleChanged = ref(false)
    const isTextChanged = ref(false)
    const isActiveChanged = ref(false)

    // reminderDATA & FORM VALIDATION
    const reminderState = reactive({});
    const handleChangeState = ($event) => {
      reminderState.target = $event;
      isDOWChanged.value =
        reminderState.target.selectedDOW.toString() !== reminderData.value.days_of_week;
      isHORChanged.value =
        reminderState.target.selectedHOR !== reminderData.value.hour_of_reminder;
      isTitleChanged.value =
        reminderState.target.titleOfReminder !== reminderData.value.title_of_reminder;
      isTextChanged.value =
        reminderState.target.texteOfReminder !== reminderData.value.text_of_reminder;
      isActiveChanged.value =
        reminderState.target.activeReminder !== reminderData.value.active_reminder;        
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

        const editReminderData =  {
              id: id && Number(id),
              ...(isDOWChanged.value && {
                days_of_week:
                  reminderState && reminderState.target.selectedDOW.toString(),
              }),
              ...(isHORChanged.value && {
                hour_of_reminder:
                  reminderState && reminderState.target.selectedHOR,
              }),
              ...(isTitleChanged.value && {
                title_of_reminder:
                  reminderState && reminderState.target.titleOfReminder,
              }),
              ...(isTextChanged.value && {
                text_of_reminder:
                  reminderState && reminderState.target.textOfReminder,
              }),
              ...(isActiveChanged.value && {
                active_reminder:
                  reminderState && reminderState.target.activeReminder === true ? 1 : 0,
              }),
            }

        editReminderData.hasOwnProperty("days_of_week")      ||
        editReminderData.hasOwnProperty("hour_of_reminder") ||
        editReminderData.hasOwnProperty("title_of_reminder")  ||
        editReminderData.hasOwnProperty("text_of_reminder")  ||
        editReminderData.hasOwnProperty("active_reminder")  
          ? store
              .dispatch("admin/updateReminder", editReminderData)
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
          : createToast(
              toast,
              "warn",
              "Warning!",
              "Nothing was changed, reminder not edited",
              5000
            );
      } else {
        createToast(
          toast,
          "error",
          "Error!",
          "Bad reminder data, read the hints below inputs",
          5000
        );
      }
    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    return {
      loading, id,
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,
    };
  },
};
</script>

<style lang="scss"></style>
