<template>
  <div class="dates-manager">
  <div class="dates-manager__calendar">
                <Calendar
                    :class="isAbsences ? 'absences-calendar' : 'holidays-calendar'"
                    v-model="dates"
                    dateFormat="yy-mm-dd"
                    :inline="true"
                    :showButtonBar="false"
                    :manualInput="false"
                    :minDate="isAbsences ? new Date() : new Date(1970, 0, 1)"
                    :maxDate="isAbsences ? new Date(Date.now() + 12096e5) : null"
                    selectionMode="multiple"
                    title="The minimum date to choose is 1970-01-01 and there is no restrictions for maximum date. &#10;Choosing the 1970-01-01 and switching for Not Authorized will disable the user permission rights. &#10;This is only a date select, the time is always set to 23:59:59. &#10;Also can be cleared (null) for unlimited access / no expire date."
                >
                </Calendar>
            </div>

  <div class="dates-manager__list">
                <DataTable
                    :value="dates.sort((a,b) => a-b)"
                    responsiveLayout="scroll"
                    class="p-datatable-sm dates-table"
                    :class="isAbsences ? 'absences-table' : 'holidays-table'"
                    :scrollable="true"
                    scrollHeight="flex"
                >
                  <template #header>
                        <span class="text-primary heading-tertiary">
                          {{ isAbsences ? 'Absences' : 'Holidays' }}
                        </span>
                  </template>
                    <template #empty>No selections found</template>
                    <Column>

                      <template #body="{ data }" >
                           <span class="text-small">
                             {{ dayjs(data).format("YYYY-MM-DD") }}
                           </span>
                        <SvgIcon icon="close" class="dates-table__icon" @click="handleRemoveOneDate(data)" />
                        </template>
                    </Column>
                </DataTable>

    <div class="dates-manager__button_container">
        <div></div>
        <Button
            class="button button--error-outline"
            type="button"
            @click="handleRemoveAllDates()"
        >
          <span class="text-inter text-small">Clear</span>
        </Button>

        <Button
            class="button button--secondary"
            type="submit"
        >
          <span class="text-inter text-small">Confirm</span>
        </Button>

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

        const datesFromStore = props.isAbsences
         ? computed(() => store.getters["user/userAbsences"])
         : computed(() => store.getters["admin/holidays"])

        const dates = ref(datesFromStore.value.length > 0 ? datesFromStore.value : []);


        const removeDuplicatesFromArray = (array) => {
              array.value = array.value.filter(
                (v, i, a) => a.findIndex((t) => t === v) === i
              );
            };

        const handleRemoveOneDate = (date) => {
            dates.value = dates.value.filter(v => v !== date)
            removeDuplicatesFromArray(removedDates)
        }
        
        const handleRemoveAllDates = () => {
          dates.value.length > 0 && createToast(
              toast,
              "warn",
              `All dates successfully removed`,
              "",
              1000
          );
            removedDates.value = dates.value.length > 0 ? dates.value : datesFromStore.value.length > 0 ? datesFromStore.value : []
            removeDuplicatesFromArray(removedDates)
            dates.value = []



        };

        onMounted(() => {
            emit("changedDates", {
                    dates: dates.value,
                    removedDates: removedDates.value,
                    });
        });

        const removedDates = ref([])

        watch(dates, (value, prevValue) => {
            if (value !== prevValue) {
                if (value.length < prevValue.length && prevValue.length > 0 && datesFromStore.value.length > 0) {
                let newRemove = prevValue.filter(v => !dates.value.includes(v) && datesFromStore.value.includes(v));
                removedDates.value = removedDates.value.length > 0 ? [...removedDates.value, ...newRemove] : [...newRemove];
                removeDuplicatesFromArray(removedDates);
                }

                emit("changedDates", {
                    dates: dates.value,
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
        };
    },
    emits: ["changedDates"],
};
</script>

<style lang="scss">
//.p-calendar {
//    flex-direction: row;
//    width: 100%;
//
//    @media only screen and (max-width: 576px) {
//        flex-direction: column;
//    }
//}
</style>
