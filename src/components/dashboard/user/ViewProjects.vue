<template>
    <div>
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else class="p-mx-4 p-my-2">
            <ProjectsTable
                :isView="true"
                :projects="projects"
                :loading="loading"
                :key="loading"
                @viewProject="handleViewProject($event)"
            />
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import ProjectsTable from "@/components/tables/ProjectsTable";

export default {
    name: "ManageProjects",
    components: { ProjectsTable },
    setup() {
        const store = useStore();
        const router = useRouter();

        const projects = computed(() => store.getters["admin/allProjects"]);

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

        const handleViewProject = (id) => {
            router.push({
                path: "/dashboard/view-project",
                query: { id: id },
            });
        };

        return {
            projects,
            loading,
            handleViewProject,
        };
    },
};
</script>

<style scoped></style>
2