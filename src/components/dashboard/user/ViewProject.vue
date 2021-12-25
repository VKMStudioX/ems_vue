<template>
    <div>
    <div v-if="loading">
            <Loader />
        </div>
        <div v-else>
    <form
      @submit.prevent="handleSubmit()"
      @invalid.capture.prevent="handleInvalid()"
    >
    <ProjectInfoTechView 
        :submitted="submitted"
    />
    </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import { createToast } from "@/functions/utils";
import ProjectInfoTechView from "@/components/forms/ProjectInfoTechView";

export default {
  name: "ManageProjectsEdit",
  components: { ProjectInfoTechView,  },
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

    const userId = computed(() => store.getters["auth/userId"]);

    const submitted = ref(false);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      
        //FORMING THE VOID (REQUEST)

        const participateInProjectData =  {
          project_id: id && Number(id),
          user_id: userId.value,
        }

        console.log(participateInProjectData)
          participateInProjectData
          ? store
              .dispatch("admin/participateInProject", participateInProjectData)
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
                    path: "/dashboard/view-projects",
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
              "Something went wrong, not participated in project",
              5000
            );

    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    return {
      loading, id,

      submitted,
      handleSubmit,

      handleInvalid,
    };
  },
};
</script>

<style>

</style>