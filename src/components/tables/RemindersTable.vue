<template>
  <DataTable
    :value="reminders"
    :paginator="true"
    class="table"
    :class="1400 > windowWidth ? 'p-datatable-sm' : ''"
    :rows="isManage ? 6 : 3"
    :rowClass="rowClass"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedReminders"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="{first} - {last} of {totalRecords}"
    :globalFilterFields="['id', 'email', 'is_admin']"
    :scrollable="true"
    scrollHeight="flex"
    responsiveLayout="scroll"
    headerStyle="border:none"

  >
    <template #header>
        <span class="text-inter text-primary heading-tertiary">Reminders list</span>
    </template>
    <template #empty> <span class="text-secondary">No Reminders found. </span> </template>
    <template #loading> <span class="text-secondary"> Loading Reminders data. Please wait. </span> </template>
    <Column
      field="id"
      header="ID"
      headerClass="p-column-header"
      class="text-secondary text-small text-inter"
      sortable
      style="
        display: flex;
        flex: 0 0 10%;
        justify-content: flex-start;
        align-items: center;
      "
    >
      <template #body="{ data }">
        {{ data.id }}
      </template>
    </Column>
    <Column
      field="days"
      header="Days"
      class="text-secondary text-small text-inter"
      :class="isColumnExtended ? 'table__column--extended' : 'table__column--collapsed'"
      :headerClass="isColumnExtended ? ' p-column-header table__column--extended' : 'p-column-header table__column--collapsed'"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
    >
      <template #body="{ data }">
        <span
            v-for="(day, index) in data.days"
            :key="day"
            @click="toggleExtendColumn()"
        >
        {{ getDayById(day) }}{{ data.days.length > 1 && data.days.length -1 > index  ? ',&nbsp;' : ''}}
        </span>
      </template>
    </Column>
     <Column
      field="hour"
      header="Hour"
      headerClass="p-column-header"
      class="text-secondary text-small text-inter"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
      style="
        display: flex;
        flex: 0 0 10%;
        justify-content: center;
        align-items: center;
      "
    >
      <template #body="{ data }">
        {{ data.hour }}
      </template>
    </Column>
     <Column
      field="title"
      header="Title"
      headerClass="p-column-header"
      class="text-secondary text-small text-inter"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
      style="
        display: flex;
        flex: 1 1 20%;
        justify-content: flex-start;
        align-items: center;
        word-wrap: break-word;
      "
    >
      <template #body="{ data }">
          {{ data.title }}
      </template>
    </Column>
    <Column
      field="active"
      sortable
      header="Active?"
      headerClass="p-column-header p-default-cursor"
      class="text-secondary text-small text-inter"
      :showFilterMatchModes="false"
      style="
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #body="{ data }">
        <div
          class="p-d-flex p-jc-center p-ai-center"
          v-tooltip.top="data.active ? 'Reminder is active' : 'Reminder is not active'"
        >

          <div class="checkbox">
            <SvgIcon
                :icon="data.active ? 'checkmark' : 'close'"
                :class="data.active ? 'checkbox--checkmark' : 'checkbox--close'"
            />
             </div>
        </div>
      </template>
    </Column>
    <Column v-if="isAdmin"
      field="actions"
      :showFilterMatchModes="false"
      headerClass="p-column-header p-default-cursor"
      class="text-secondary text-small text-inter"
      style="
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #header></template>
      <template #body="{ data }">
        <div class="p-d-flex p-jc-between" v-if="isAdmin">
          <div v-tooltip.top="'Delete Reminder'" class="p-mr-4"  @click="handleDeleteReminder($event, data.id)">
            <SvgIcon icon="delete" class="table__icon" />
          </div>
          <div v-tooltip.top="'Edit Reminder'" @click="handleEditReminder(data.id)">
            <SvgIcon icon="edit" class="table__icon" />
          </div>
        </div>
      </template>
    </Column>
    <template #footer v-if="isManage">
      <div class="table__footer">
      <Button
        type="button"
        class="button button--secondary"
        @click="handleAddNewReminder()"
    >
        <span class="text-small text-inter">Add new reminder</span>
      </Button>
      </div>
    </template>
  </DataTable>
</template>

<script>
import { useWindowSize } from "vue-window-size";
import { FilterMatchMode } from "primevue/api";
import { useConfirm } from "primevue/useconfirm";
import { ref } from "vue";
import { rowClass } from "@/functions/utils";

export default {
  name: "RemindersTable.vue",
  props: {
    reminders: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    isManage: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props, { emit }) {
    const { width, height } = useWindowSize();
    const confirm = useConfirm();
    const selectedReminders = ref();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const handleEditReminder = (id) => {
      emit("editReminder", id);
    };

    const handleAddNewReminder = () => {
      emit("newReminder");
    }

    const handleDeleteReminder = (event, id) => {
       confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this reminder?',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    emit("deleteReminder", id);
                },
                reject: () => {
                    
                }
            });
        }

    const getDayById = (dayId) => {
      let name = "";

      switch (dayId) {
        case 1:
          name = "Sun";
          break;
        case 2:
          name = "Mon";
          break;
        case 3:
          name = "Tue";
          break;
        case 4:
          name = "Wed"
          break;
        case 5:
          name = "Thu";
          break;
        case 6:
          name = "Fri";
          break;
        case 7:
          name = "Sat";
          break;
      }

      return name;
    };

    const isColumnExtended = ref (false);
    const toggleExtendColumn = () => {
      isColumnExtended.value = !isColumnExtended.value;
    }

    return {
      rowClass,
      filters,
      selectedReminders,
      handleEditReminder,
      handleAddNewReminder,
      handleDeleteReminder,
      windowWidth: width,
      windowHeight: height,
      getDayById,
      toggleExtendColumn,
      isColumnExtended
    };
  },
  emits: ["deleteReminder", "editReminder", "newReminder"],
};
</script>

<style scoped>
</style>
