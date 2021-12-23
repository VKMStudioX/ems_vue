<template>
    <div>
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else class="p-mx-4 p-my-2">
            <ProjectsTable
                :projects="projects"
                :loading="loading"
                :key="loading"
                @deleteProject="handleDeleteProject($event)"
                @editProject="handleEditProject($event)"
                @newProject="handleNewProject()"
            />
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { createToast } from "@/functions/utils";
import ProjectsTable from "@/components/tables/ProjectsTable";

export default {
    name: "ManageProjects",
    components: { ProjectsTable },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();
        // const route = useRoute();

        const projects = computed(() => store.getters["admin/allProjects"]);
        const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

        const loading = ref(true);

        const getAllProjects = () => {
            store.dispatch("admin/getAllProjects").then(
                () => (loading.value = false),
                (error) => console.error(error)
            );
        };

        onMounted(async () => {
            await getAllProjects();
        });

        const handleDeleteProject = (id) => {
            loading.value = true;
            store
                .dispatch("admin/deleteProject", id)
                .then(
                    (res) => {
                        createToast(toast, "warn", "Success!", `${res.data.message}`, 2000);
                        getAllProjects();
                    },
                    (error) => console.error(error)
                )
                .catch(() => {
                    createToast(toast, "error", "Error!", `${errorMsg.value}`, 2000);
                    loading.value = false;
                });
        };

        const handleEditProject = (id) => {
            router.push({
                path: "/dashboard/edit-project",
                query: { id: id },
            });
        };

        const handleNewProject = () => {
            router.push({
                path: "/dashboard/new-project",
            });
        };

        return {
            projects,
            loading,
            handleDeleteProject,
            handleEditProject,
            handleNewProject,
        };
    },
};
</script>

<style scoped></style>
