<template>
  <DataTable
    :value="reminders"
    :paginator="true"
    class="p-datatable-Reminders p-Reminders-table p-py-4"
    :class="1400 > windowWidth ? 'p-datatable-sm' : ''"
    :rows="12"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedReminders"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    :globalFilterFields="['id', 'email', 'is_admin']"
    :scrollable="true"
    scrollHeight="flex"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <div><h3 class="p-m-0">EMS Reminders list</h3></div>
          <div v-if="isManage">
            <Button
            label="Add new Reminder"
            icon="pi pi-Reminder-plus"
            iconPos="left"
            class="p-button-info"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            type="button"
            @click="handleAddNewReminder()"
          />
          </div>
      </div>
    </template>
    <template #empty> No Reminders found. </template>
    <template #loading> Loading Reminders data. Please wait. </template>
    <Column
      field="id"
      header="ID"
      headerClass="p-column-header"
      sortable
      style="
        max-width: 5%;
        max-width: 5%;
        display: flex;
        flex: 1 1 10%;
        justify-content: flex-start;
      "
    >
      <template #body="{ data }">
        {{ data.id }}
      </template>
    </Column>
    <Column
      field="dats_of_week"
      header="Days Of Week"
      headerClass="p-column-header"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
      style="
        min-width: 20%;
        max-width: 20%;
        display: flex;
        flex: 1 1 20%;
        justify-content: flex-start;
      "
    >
      <template #body="{ data }">
        {{ data.days_of_week }}
      </template>
    </Column>
     <Column
      field="hour_of_reminder"
      header="Hour"
      headerClass="p-column-header"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
      style="
        min-width: 20%;
        max-width: 20%;
        display: flex;
        flex: 1 1 20%;
        justify-content: flex-start;
      "
    >
      <template #body="{ data }">
        {{ data.hour_of_reminder }}
      </template>
    </Column>
     <Column
      field="title_of_reminder"
      header="Title"
      headerClass="p-column-header"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
      style="
        min-width: 20%;
        max-width: 20%;
        display: flex;
        flex: 1 1 20%;
        justify-content: flex-start;
      "
    >
      <template #body="{ data }">
        {{ data.title_of_reminder }}
      </template>
    </Column>
    <Column
      field="active_reminder"
      sortable
      headerClass="p-column-header p-default-cursor"
      :showFilterMatchModes="false"
      style="
        max-width: 15%;
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #header>
        {{ 1400 > windowWidth ? "is Active ?" : "is Active ?" }}
      </template>
      <template #body="{ data }">
        <div
          class="p-d-flex p-jc-center p-ai-center"
          v-tooltip.top="data.active_reminder ? 'Reminder is active' : 'Reminder is not active'"
        >
          <font-awesome-icon
            :icon="['far', 'check-square']"
            v-if="data.active_reminder"
          />
          <font-awesome-icon :icon="['far', 'square']" v-if="!data.active_reminder" />
        </div>
      </template>
    </Column>
    <Column
      field="actions"
      :showFilterMatchModes="false"
      headerClass="p-column-header p-default-cursor"
      style="
        min-width: 15%;
        max-width: 15%;
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #header>
        <div class="p-table-center-flex">Actions</div>
      </template>
      <template #body="{ data }">
        <div class="p-d-flex p-jc-between" v-if="isManage">
          <div v-tooltip.top="'Delete Reminder'" class="p-mr-4">
            <font-awesome-icon
              :icon="['fas', 'user-minus']"
              class="p-cursor-pointer p-color-remove"
              @click="handleDeleteReminder(data.id)"
            />
          </div>
          <div v-tooltip.top="'Edit Reminder'">
            <font-awesome-icon
              :icon="['fas', 'user-edit']"
              class="p-cursor-pointer p-color-edit"
              @click="handleEditReminder(data.id)"
            />
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { useWindowSize } from "vue-window-size";
import { FilterMatchMode } from "primevue/api";
import { ref } from "vue";

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
    isManage: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props, { emit }) {
    const { width, height } = useWindowSize();
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

    const handleDeleteReminder = (id) => {
      emit("deleteReminder", id);
    };

    return {
      filters,
      selectedReminders,
      handleEditReminder,
      handleAddNewReminder,
      handleDeleteReminder,
      windowWidth: width,
      windowHeight: height,
    };
  },
  emits: ["deleteReminder", "editReminder", "newReminder"],
};
</script>

<style scoped></style>
