<template>
    <div>
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else class="p-mx-4 p-my-2">
            <RemindersTable
                :reminders="reminders"
                :loading="loading"
                :key="loading"
                :isManage="true"
                @deleteReminder="handleDeleteReminder($event)"
                @editReminder="handleEditReminder($event)"
                @newReminder="handleNewReminder()"
            />
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

export default {
    name: "ManageReminders",
    components: { RemindersTable },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();

        const reminders = computed(() => store.getters["admin/allReminders"]);
        const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

        const loading = ref(true);

        const getAllReminders = () => {
            store.dispatch("admin/getAllReminders").then(
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
                .dispatch("admin/deleteReminder", id)
                .then(
                    (res) => {
                        createToast(toast, "warn", "Success!", `${res.data.message}`, 2000);
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
                path: "/dashboard/edit-reminder",
                query: { id: id },
            });
        };

        const handleNewReminder = () => {
            router.push({
                path: "/dashboard/new-reminder",
            });
        };

        return {
            reminders,
            loading,
            handleDeleteReminder,
            handleEditReminder,
            handleNewReminder,
        };
    },
};
</script>

<style scoped></style>
