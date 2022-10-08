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
          navTitle3="Edit Reminder"
          navLink2="/manage-reminders"
          :navLink3="`${actualPath}?id=${id}`"
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
        :isEdit="true"
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
import { useRouter, useRoute } from "vue-router";
import { createToast } from "@/functions/utils";
import ReminderForm from "@/components/forms/ReminderForm";
import Header from "@/components/commons/Header";

export default {
  name: "ManageRemindersEdit",
  components: { ReminderForm, Header },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;
    const actualPath = computed(() => {
      return route.path;
    });

    const loading = ref(true);
    onMounted(async () => {
      console.log(id)
      await store.dispatch("reminder/getReminderById", id).then(
        () => {
          loading.value = false;
        },
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["reminder/apiErrorMsg"]);

    // reminderDATA & FORM VALIDATION
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

        const editReminderData =  {
          id: id && Number(id),
          days_of_week: reminderState && reminderState.target.selectedDOW.toString(),
          hour: reminderState && reminderState.target.selectedHOR,
          title: reminderState && reminderState.target.titleOfReminder,
          text: reminderState && reminderState.target.textOfReminder,
          active: reminderState && reminderState.target.activeReminder,
            }

         store
              .dispatch("reminder/updateReminder", editReminderData)
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

      actualPath
    };
  },
};
</script>

<style lang="scss"></style>
