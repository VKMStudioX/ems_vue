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
        :isEdit="true"
    />
      <ProjectTechManager
        :submitted="submitted"
        :isEdit="true"
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
import ProjectInfoManager from "@/components/forms/ProjectInfoManager";
import ProjectTechManager from "@/components/forms/ProjectTechManager";
import dayjs from "dayjs";

export default {
  name: "ManageProjectsEdit",
  components: { ProjectInfoManager, ProjectTechManager },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getAllProjects").then(
        () => {
          store.commit("admin/getProjectById", id);
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

        const editProjectData =  {
          id: id && Number(id),
          project_info: {
            project_name: projectState && projectState.target.projectName,
            client_name: projectState && projectState.target.clientName,
            project_info: projectState && projectState.target.projectInfo,
            project_start: projectState && dayjs(projectState.target.startDate).format("YYYY-MM-DD"),
            project_end: projectState && dayjs(projectState.target.endDate).format("YYYY-MM-DD"),
          },
          project_users: projectState && projectState.target.projectUsers.map(v => v.id),
          project_technologies: projectTechs && projectTechs.value.map(v => v.id),
        }

        console.log(editProjectData)
          editProjectData
          ? store
              .dispatch("admin/updateProject", editProjectData)
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
      loading, id,
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