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
    <ProjectInfoManager 
        @changedVS="handleChangeV$($event)"
        @changedState="handleChangeState($event)"
        :submitted="submitted"
        :isEdit="false"
    />
      <ProjectTechManager
        :submitted="submitted"
        :isEdit="false"
        @selectedTechnologies="handleChangeSelectedTechs($event)"
        @removeTechnologies="handleChangeRemovedTechs($event)"
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
import { createToast, convertDateToUTC } from "@/functions/utils";
import dayjs from "dayjs";
import ProjectInfoManager from "@/components/forms/ProjectInfoManager";
import ProjectTechManager from "@/components/forms/ProjectTechManager";

export default {
  name: "ManageProjectsNew",
  components: { ProjectInfoManager, ProjectTechManager },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getAllProjects").then(
        () => {
          store.dispatch("admin/getNewProject");
          loading.value = false;
        },
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // reminderDATA & FORM VALIDATION
    const projectState = reactive({});
    const handleChangeState = ($event) => {
      projectState.target = $event;
    };

    const projectTechs = ref([]);
    const handleChangeSelectedTechs = ($event) => {
      projectTechs.value = $event;
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

        const newProjectData =  {
          project_info: {
            project_name: projectState && projectState.target.projectName,
            client_name: projectState && projectState.target.clientName,
            project_info: projectState && projectState.target.projectInfo,
            project_start: projectState && dayjs(convertDateToUTC(projectState.target.startDate)).format(
              "YYYY-MM-DD HH:mm:ss"),
            project_end: projectState && dayjs(convertDateToUTC(projectState.target.endDate)).format(
              "YYYY-MM-DD HH:mm:ss"),
          },
          project_users: projectState && projectState.target.projectUsers,
          project_technologies: projectTechs && projectTechs.value,
        }

        console.log(newProjectData)
          newProjectData
          ? store
              .dispatch("admin/newProject", newProjectData)
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
                    path: "/dashboard/manage-projects",
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
              "Nothing was changed, project not edited",
              5000
            );
      } else {
        createToast(
          toast,
          "error",
          "Error!",
          "Bad project data, read the hints below inputs",
          5000
        );
      }

    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    return {
      loading,
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,
      handleChangeSelectedTechs
    };
  },
};
</script>

<style>

</style>