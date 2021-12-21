<template>
    <div>
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else class="p-mx-4 p-my-2">
            <UsersTable
                :users="users"
                :loading="loading"
                :key="loading"
                @deleteUser="handleDeleteUser($event)"
                @editUser="handleEditUser($event)"
                @newUser="handleNewUser()"
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
import UsersTable from "@/components/tables/UsersTable";

export default {
    name: "ManageUsers",
    components: { UsersTable },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();
        // const route = useRoute();

        const users = computed(() => store.getters["admin/allUsers"]);
        const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

        const loading = ref(true);

        const getAllUsers = () => {
            store.dispatch("admin/getAllUsers").then(
                () => (loading.value = false),
                (error) => console.error(error)
            );
        };

        onMounted(async () => {
            await getAllUsers();
        });

        const handleDeleteUser = (id) => {
            loading.value = true;
            store
                .dispatch("admin/deleteUser", id)
                .then(
                    (res) => {
                        createToast(toast, "warn", "Success!", `${res.data.message}`, 2000);
                        getAllUsers();
                    },
                    (error) => console.error(error)
                )
                .catch(() => {
                    createToast(toast, "error", "Error!", `${errorMsg.value}`, 2000);
                    loading.value = false;
                });
        };

        const handleEditUser = (id) => {
            router.push({
                path: "/dashboard/edit-user",
                query: { id: id },
            });
        };

        const handleNewUser = () => {
            router.push({
                path: "/dashboard/new-user",
            });
        };

        return {
            users,
            loading,
            handleDeleteUser,
            handleEditUser,
            handleNewUser,
        };
    },
};
</script>

<style scoped></style>
