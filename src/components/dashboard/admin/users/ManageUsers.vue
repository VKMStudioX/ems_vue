<template>
    <div class="app-layout__wrapper">
        <div v-if="loading">
            <Loader />
        </div>
      <div v-else class="main">
        <Header
            class="main__header"
            title="Users"
            navTitle1="Manage"
            navTitle2="Users"
        />
        <div class="main__container">
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
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { createToast } from "@/functions/utils";
import UsersTable from "@/components/tables/UsersTable";
import Header from "@/components/commons/Header";

export default {
    name: "ManageUsers",
    components: { UsersTable, Header },
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
                        createToast(toast, "success", "Success!", `${res.data.message}`, 2000);
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
                path: "/edit-user",
                query: { id: id },
            });
        };

        const handleNewUser = () => {
            router.push({
                path: "/new-user",
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
