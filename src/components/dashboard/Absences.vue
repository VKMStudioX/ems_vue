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
                <DatesManager
                    :isAbsences="true"
                    @changedDates="handleChangeDates($event)"
                />
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";
import { createToast } from "@/functions/utils";
import DatesManager from "@/components/forms/DatesManager.vue"

export default {
    name: "Absences",
    components: { DatesManager },
    setup() {
        const store = useStore();
        const toast = useToast();
        const errorMsg = computed(() => store.getters["user/userApiErrorMsg"]);

        const userId = computed(() => store.getters["auth/userId"]);

        const loading = ref(true);
        onMounted(async () => {
            await store.dispatch("user/getUserAbsences", userId.value).then(
                () => (loading.value = false),
                (error) => console.error(error)
            );
        });

        const userAbsences = ref(null)
        const handleChangeDates = ($event) => {
            userAbsences.value = $event;
            console.table(userAbsences.value)
        };

        const submitted = ref(false);

        const handleSubmit = () => {
            submitted.value = true;

                //FORMING THE VOID (REQUEST)
                const userAbsencesData = {
                  user_id: userId.value,
                  absences: userAbsences.value.dates,
                  new_absences: userAbsences.value.newDates,
                  removed_absences: userAbsences.value.removedDates
                }

                     store
                        .dispatch("user/manageUserAbsences", userAbsencesData)
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
                                    path: "/dashboard/",
                                });
                            },
                            (error) => {
                                console.error(error);
                            }
                        )
                        .catch(() =>
                            createToast(toast, "error", "Error!", `${errorMsg.value}`, 5000)
                        )
        };

        const handleInvalid = () => {
            submitted.value = true;
        };

    return {
        loading,
        userAbsences,
        handleChangeDates,
        handleSubmit,
        handleInvalid,
    };
},
};
</script>

<style scoped></style>
