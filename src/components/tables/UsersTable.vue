<template>
  <DataTable
    :value="users"
    :paginator="true"
    class="p-datatable-users p-users-table"
    :class="1400 > windowWidth ? 'p-datatable-sm' : ''"
    :rows="12"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedUsers"
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
        <div><h3 class="p-m-0">EMS Users list</h3></div>
          <div>
            <Button
            label="Add new user"
            icon="pi pi-user-plus"
            iconPos="left"
            class="p-button-info"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            type="button"
            @click="handleAddNewUser()"
          />
          </div>
      </div>
    </template>
    <template #empty> No users found. </template>
    <template #loading> Loading users data. Please wait. </template>
    <Column
      field="id"
      header="ID"
      headerClass="p-column-header"
      sortable
      style="
        max-width: 10%;
        max-width: 10%;
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
      field="email"
      header="E-mail"
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
        {{ data.email }}
      </template>
    </Column>
     <Column
      field="first_name"
      header="First Name"
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
        {{ data.first_name }}
      </template>
    </Column>
     <Column
      field="last_name"
      header="Last Name"
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
        {{ data.last_name }}
      </template>
    </Column>
    <Column
      field="is_admin"
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
        {{ 1400 > windowWidth ? "is Admin ?" : "is Admin ?" }}
      </template>
      <template #body="{ data }">
        <div
          class="p-d-flex p-jc-center p-ai-center"
          v-tooltip.top="data.is_admin ? 'User is admin' : 'User is not admin'"
        >
          <font-awesome-icon
            :icon="['far', 'check-square']"
            v-if="data.is_admin"
          />
          <font-awesome-icon :icon="['far', 'square']" v-if="!data.is_admin" />
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
        <div class="p-d-flex p-jc-between">
          <div v-tooltip.top="'Delete user'" class="p-mr-4">
            <font-awesome-icon
              :icon="['fas', 'user-minus']"
              class="p-cursor-pointer p-color-remove"
              @click="handleDeleteUser(data.id)"
            />
          </div>
          <div v-tooltip.top="'Edit user'">
            <font-awesome-icon
              :icon="['fas', 'user-edit']"
              class="p-cursor-pointer p-color-edit"
              @click="handleEditUser(data.id)"
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
  name: "UsersTable.vue",
  props: {
    users: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { width, height } = useWindowSize();
    const selectedUsers = ref();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const handleEditUser = (id) => {
      emit("editUser", id);
    };

    const handleAddNewUser = () => {
      emit("newUser");
    }

    const handleDeleteUser = (id) => {
      emit("deleteUser", id);
    };

    return {
      filters,
      selectedUsers,
      handleEditUser,
      handleAddNewUser,
      handleDeleteUser,
      windowWidth: width,
      windowHeight: height,
    };
  },
  emits: ["deleteUser", "editUser", "newUser"],
};
</script>

<style scoped></style>
