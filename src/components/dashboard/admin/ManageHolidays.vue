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
                    :isAbsences="false"
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
import DatesManager from "@/components/forms/DatesManager.vue";
import dayjs from "dayjs"

export default {
    name: "Holidays",
    components: { DatesManager },
    setup() {
        const store = useStore();
        const toast = useToast();
        const router = useRouter();
        const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

        const loading = ref(true);
        onMounted(async () => {
            await store.dispatch("admin/getHolidays").then(
                () => (loading.value = false),
                (error) => console.error(error)
            );
        });

        const holidays = ref(null)
        const handleChangeDates = ($event) => {
            holidays.value = $event;
        };

        const submitted = ref(false);

        const handleSubmit = () => {
            submitted.value = true;

                //FORMING THE VOID (REQUEST)
                const holidaysData = {
                  holidays: holidays.value.dates.map(date => dayjs(convertDateToUTC(date)).format(
              "YYYY-MM-DD HH:mm:ss")),
                  removed_holidays: holidays.value.removedDates.map(date => dayjs(convertDateToUTC(date)).format(
              "YYYY-MM-DD HH:mm:ss")),
                }

                     store
                        .dispatch("admin/manageHolidays", holidaysData)
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
