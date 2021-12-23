<template>
  <DataTable
    :value="projects"
    :paginator="true"
    class="p-datatable-users p-users-table"
    :class="1400 > windowWidth ? 'p-datatable-sm' : ''"
    :rows="12"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedProjects"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    :globalFilterFields="['id', 'project_name', 'is_admin']"
    :scrollable="true"
    scrollHeight="flex"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <div><h3 class="p-m-0">EMS Projects list</h3></div>
          <div>
            <Button
            v-if="!isView"
            label="Add new project"
            icon="pi pi-user-plus"
            iconPos="left"
            class="p-button-info"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            type="button"
            @click="handleAddNewProject()"
          />
          </div>
      </div>
    </template>
    <template #empty> No projects found. </template>
    <template #loading> Loading projects data. Please wait. </template>
    <Column
      field="id"
      header="ID"
      headerClass="p-column-header"
      sortable
      style="
        max-width: 5%;
        max-width: 5%;
        display: flex;
        flex: 1 1 5%;
        justify-content: flex-start;
      "
    >
      <template #body="{ data }">
        {{ data.id }}
      </template>
    </Column>
    <Column
      field="project_name"
      header="Project Name"
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
        <div
          :class="
            data.project_name && data.project_name.length >= 20
              ? 'p-overflow'
              : 'p-white-space-no-wrap'
          "
          v-tooltip.top="
            data.project_name && data.project_name.length >= 20 ? data.project_name : ''
          "
        >
          {{ data.project_name }}
        </div>
      </template>
    </Column>
     <Column
      field="client_name"
      header="Client Name"
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
        <div
          :class="
            data.client_name && data.client_name.length >= 20
              ? 'p-overflow'
              : 'p-white-space-no-wrap'
          "
          v-tooltip.top="
            data.client_name && data.client_name.length >= 20 ? data.client_name : ''
          "
        >
          {{ data.client_name }}
        </div>
      </template>
    </Column>
     <Column
      field="project_start"
      header="Start Date"
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
        <div
          :class="
            data.project_start && data.project_start.length >= 20
              ? 'p-overflow'
              : 'p-white-space-no-wrap'
          "
          v-tooltip.top="
            data.project_start && data.project_start.length >= 20 ? data.project_start : ''
          "
        >
          {{ dayjs(data.project_start).format("YYYY-MM-DD") }}
        </div>
      </template>
    </Column>
    <Column
      field="project_end"
      header="End Date"
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
        <div
          :class="
            data.project_end && data.project_end.length >= 20
              ? 'p-overflow'
              : 'p-white-space-no-wrap'
          "
          v-tooltip.top="
            data.project_end && data.project_end.length >= 20 ? data.project_end : ''
          "
        >
          {{ dayjs(data.project_end).format("YYYY-MM-DD") }}
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
        <div class="p-d-flex p-jc-between" v-if="isView">
          <div v-tooltip.top="'View project'" class="p-mr-4">
            <font-awesome-icon
              :icon="['fas', 'file-alt']"
              class="p-cursor-pointer p-color-action"
              @click="handleViewProject(data.id)"
            />
          </div>
        </div>
        <div class="p-d-flex p-jc-between" v-else>
          <div v-tooltip.top="'Delete project'" class="p-mr-4">
            <font-awesome-icon
              :icon="['fas', 'user-minus']"
              class="p-cursor-pointer p-color-remove"
              @click="handleDeleteProject(data.id)"
            />
          </div>
          <div v-tooltip.top="'Edit project'">
            <font-awesome-icon
              :icon="['fas', 'user-edit']"
              class="p-cursor-pointer p-color-edit"
              @click="handleEditProject(data.id)"
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
import dayjs from "dayjs";

export default {
  name: "ProjectsTable",
  props: {
    projects: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
    isView: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup(props, { emit }) {
    const { width, height } = useWindowSize();
    const selectedProjects = ref();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const handleEditProject = (id) => {
      emit("editProject", id);
    };

    const handleAddNewProject = () => {
      emit("newProject");
    }

    const handleDeleteProject = (id) => {
      emit("deleteProject", id);
    };

    const handleViewProject = (id) => {
      emit("viewProject", id);
    };

    return {
      filters,
      selectedProjects,
      handleEditProject,
      handleAddNewProject,
      handleDeleteProject,
      handleViewProject,
      windowWidth: width,
      windowHeight: height,
      dayjs
    };
  },
  emits: ["deleteProject", "editProject", "newProject", "viewProject"],
};
</script>

<style scoped></style>
