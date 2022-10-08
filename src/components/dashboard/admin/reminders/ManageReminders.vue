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
              navLink2="/manage-reminders"
          />
          <div class="main__container">
            <RemindersTable
                :reminders="reminders"
                :loading="loading"
                :key="loading"
                :isAdmin="isAdmin"
                :isManage="true"
                @deleteReminder="handleDeleteReminder($event)"
                @editReminder="handleEditReminder($event)"
                @newReminder="handleNewReminder()"
            />
          </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { createToast } from "@/functions/utils";
import RemindersTable from "@/components/tables/RemindersTable";
import Header from "@/components/commons/Header";

export default {
    name: "ManageReminders",
    components: { RemindersTable, Header },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();

        const isAdmin = computed(() => store.getters["auth/userIsAdmin"]);
        const reminders = computed(() => store.getters["reminder/allReminders"]);
        const errorMsg = computed(() => store.getters["reminder/apiErrorMsg"]);

        const loading = ref(true);

        const getAllReminders = () => {
            store.dispatch("reminder/getAllReminders").then(
                () => (loading.value = false),
                (error) => console.error(error)
            );
        };

        onMounted(async () => {
            await getAllReminders();
        });

        const handleDeleteReminder = (id) => {
            loading.value = true;
            store
                .dispatch("reminder/deleteReminder", id)
                .then(
                    (res) => {
                        createToast(toast, "success", "Success!", `${res.data.message}`, 2000);
                        getAllReminders();
                    },
                    (error) => console.error(error)
                )
                .catch(() => {
                    createToast(toast, "error", "Error!", `${errorMsg.value}`, 2000);
                    loading.value = false;
                });
        };

        const handleEditReminder = (id) => {
            router.push({
                path: "/edit-reminder",
                query: { id: id },
            });
        };

        const handleNewReminder = () => {
            router.push({
                path: "/new-reminder",
            });
        };

        return {
            reminders,
            loading,
            isAdmin,
            handleDeleteReminder,
            handleEditReminder,
            handleNewReminder,
        };
    },
};
</script>

<style scoped></style>
