<template>
    <div :class="windowWidth > 576 ? 'p-m-4' : 'p-m-0'" class="p-user-data-form">
        <h4 class="p-text-center p-text-uppercase p-m-4">{{ isAbsences ? 'Manage absences' : 'Manage holidays' }}</h4>
        <div class="p-grid p-fluid p-flex-jc-stretch p-calendar">
            <div class="p-xs-12 p-sm-8 p-md-8 ">
                <Calendar
                    v-model="dates"
                    dateFormat="yy-mm-dd"
                    :inline="true"
                    :showButtonBar="false"
                    :manualInput="false"
                    style="max-height:460px;"
                    :minDate="isAbsences ? new Date() : new Date(1970, 0, 1)"
                    :maxDate="isAbsences ? new Date(Date.now() + 12096e5) : null"
                    selectionMode="multiple"
                    title="The minimum date to choose is 1970-01-01 and there is no restrictions for maximum date. &#10;Choosing the 1970-01-01 and switching for Not Authorized will disable the user permission rights. &#10;This is only a date select, the time is always set to 23:59:59. &#10;Also can be cleared (null) for unlimited access / no expire date."
                    @date-select="handleDateSelect($event)"
                >
                </Calendar>
            </div>

            <div class="p-xs-12 p-sm-4 p-md-4">
                <DataTable
                :key="dates"
                    :value="dates"
                    responsiveLayout="scroll"
                    class="p-datatable-sm"
                    :scrollable="true"
                    scrollHeight="flex"
                    style="max-height: 460px; overflow-y: scroll;"
                >
                    <template #empty>No selections found</template>
                    <Column :header="isAbsences ? 'Actual Absences' : 'Holidays'">
                        <template #body="{ data }">
                            <div
                                class="p-selected-ships-body"
                            >{{ dayjs(data).format("YYYY-MM-DD") }}</div>
                            <div class="p-selected-ships-body p-ship-remove">
                                <div>
                                    <font-awesome-icon class="p-ml-2" :icon="['fas', 'times']" @click="handleRemoveOneDate(data)" />
                                </div>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="p-grid p-fluid p-jc-end">
            <div class="p-xs-12 p-md-4 p-d-flex p-flex-row p-mr-3">
          <Button
            label="Clear"
            icon="pi pi-times"
            iconPos="left"
            class="p-button-danger p-mr-2"
            style="width: 49%;"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            @click="handleRemoveAllDates()"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
            style="width: 49%;"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            type="submit"
          />
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { computed, ref, watch, onMounted, getCurrentInstance } from "vue";
import { useWindowSize } from "vue-window-size";
import { createToast } from "@/functions/utils";
import dayjs from "dayjs";

export default {
    name: "DatesManager",
    props: {
        isAbsences: {
            type: Boolean,
            required: true,
            default: true,
        },
    },

    setup(props, { emit }) {
        const store = useStore();
        const toast = useToast();
        const { width, height } = useWindowSize();
        const instance = getCurrentInstance();

        const errorMsg = computed(() => store.getters["user/rdmApiErrorMsg"]);

        // dates from store
        const datesFromStore = props.isAbsences
         ? computed(() => store.getters["user/userAbsences"])
         : computed(() => store.getters["admin/holidays"])

        const dates = ref(datesFromStore.value.length > 0 ? datesFromStore.value : []);


        const handleRemoveOneDate = (date) => {
            dates.value = dates.value.filter(v => v !== date)
        }
        
        const handleRemoveAllDates = () => {
            removedDates.value = dates.value.length > 0 ? dates.value : datesFromStore.value
                dates.value = []
                newDates.value = []
                createToast(
          toast,
          "warn",
          `All dates successfully removed`,
          "",
          1000
        );
        };

        onMounted(() => {
            emit("changedDates", {
                    dates: dates.value,
                    newDates: newDates.value,
                    removedDates: removedDates.value,
                    });
        });

        const newDates = ref([])
        const removedDates = ref([])

        const handleDateSelect = (newDate) => {
            newDates.value = newDates.value.length > 0 ? [...newDates.value, newDate] : [newDate]
            // if (datesFromStore.value.length > 0) {
            // newDates.value = newDates.value.filter(v => !datesFromStore.value.includes(v))
            // }
            console.log(newDates.value)
        }

    // watch(newDates, (value, prevValue) => {
    //         if (value !== prevValue && newDates.value.length > 0) {
    //         newDates.value = newDates.value.filter(v => !newDates.value.includes(v))
    //         }
    // })

        watch(dates, (value, prevValue) => {
            if (value !== prevValue) {
                // if (value && prevValue.length == 0) {
                //     newDates.value = value
                // }
                // if (value && value.length > prevValue.length && !datesFromStore.value) {
                //   newDates.value = value.filter(v => !value.includes(v))
                // }else if (value && value.length > prevValue.length && datesFromStore.value) {
                //   newDates.value = value.filter(v => !datesFromStore.value.includes(v))
                // } else {
                // newDates.value = dates.value
                // }
                // if (value.length === 0 && prevValue.length === 0) {

                if (value.length < prevValue.length && prevValue.length > 0 && datesFromStore.value.length > 0) {
                let newRemove = prevValue.filter(v => !dates.value.includes(v) && datesFromStore.value.includes(v));
                removedDates.value = removedDates.value.length > 0 ? [...removedDates.value, ...newRemove] : [...newRemove];
                }
                // if (datesFromStore.value.length > 0) {
                // newDates.value = datesFromStore.value.filter(v => removedDates.value.includes(v))
                // } else {
                // newDates.value = dates.value
                // }

                emit("changedDates", {
                    dates: dates.value,
                    newDates: newDates.value,
                    removedDates: removedDates.value,
                    });
            }
        });

        return {
            datesFromStore,
            dates,
            instance,
            handleRemoveOneDate,
            handleRemoveAllDates,
            dayjs,
            windowWidth: width,
            windowHeigth: height,
            handleDateSelect
        };
    },
    emits: ["changedDates"],
};
</script>

<style lang="scss">
.p-calendar {
    flex-direction: row;

    @media only screen and (max-width: 576px) {
        flex-direction: column;
    }
}
</style>
