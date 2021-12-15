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
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";
import { createToast, convertDateToUTC } from "@/functions/utils";
import DatesManager from "@/components/forms/DatesManager.vue"
import dayjs from "dayjs"

export default {
    name: "Absences",
    components: { DatesManager },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();
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
                  absences: userAbsences.value.dates.map(date => dayjs(convertDateToUTC(date)).format(
              "YYYY-MM-DD HH:mm:ss")),
                  removed_absences: userAbsences.value.removedDates.map(date => dayjs(convertDateToUTC(date)).format(
              "YYYY-MM-DD HH:mm:ss")),
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
        handleChangeDates,
        handleSubmit,
        handleInvalid,
    };
},
};
</script>

<style scoped></style>
