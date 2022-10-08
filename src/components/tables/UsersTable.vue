<template>
  <DataTable
    :value="users"
    :paginator="true"
    class="table"
    :class="1400 > windowWidth ? 'p-datatable-sm' : ''"
    :rows="6"
    :rowClass="rowClass"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedUsers"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="{first} - {last} of {totalRecords}"
    :globalFilterFields="['id', 'email', 'is_admin']"
    :scrollable="true"
    scrollHeight="flex"
    headerStyle="border:none"
  >
    <template #header>
      <span class="text-inter text-primary heading-tertiary">Users list</span>
    </template>
    <template #empty> No users found. </template>
    <template #loading> Loading users data. Please wait. </template>
    <Column
      field="id"
      header="ID"
      headerClass="p-column-header"
      class="text-secondary text-small text-inter"
      sortable
      style="
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
      class="text-secondary text-small text-inter"
      :class="isEmailColumnExtended ? 'table__column--extended' : 'table__column--collapsed'"
      :headerClass="isEmailColumnExtended ? ' p-column-header table__column--extended' : 'p-column-header table__column--collapsed'"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
    >
      <template #body="{ data }">
       <span @click="toggleExtendColumn('email')">
         {{ data.email }}
       </span>
      </template>
    </Column>
     <Column
      field="first_name"
      header="First Name"
      class="text-secondary text-small text-inter"
      :class="isFNColumnExtended ? 'table__column--extended' : 'table__column--collapsed'"
      :headerClass="isFNColumnExtended ? ' p-column-header table__column--extended' : 'p-column-header table__column--collapsed'"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
    >
      <template #body="{ data }">
         <span
             @click="toggleExtendColumn('first_name')">
           {{ data.first_name }} </span>
      </template>
    </Column>
     <Column
      field="last_name"
      header="Last Name"
      class="text-secondary text-small text-inter"
      :class="isLNColumnExtended ? 'table__column--extended' : 'table__column--collapsed'"
      :headerClass="isLNColumnExtended ? ' p-column-header table__column--extended' : 'p-column-header table__column--collapsed'"
      sortable
      :filterMenuStyle="{ width: '5rem' }"
    >
      <template #body="{ data }">

         <span
             @click="toggleExtendColumn('last_name')" >
           {{ data.last_name }}
         </span>
      </template>
    </Column>
    <Column
      field="is_admin"
      sortable
      header="Admin?"
      headerClass="p-column-header p-default-cursor"
      class="text-secondary text-small text-inter"
      :showFilterMatchModes="false"
      style="
        max-width: 15%;
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #body="{ data }">
        <div
            class="p-d-flex p-jc-center p-ai-center"
            v-tooltip.top="data.is_admin ? 'User is admin' : 'User is not admin'"
        >
          <div class="checkbox">
            <SvgIcon
                :icon="data.is_admin ? 'checkmark' : 'close'"
                :class="data.is_admin ? 'checkbox--checkmark' : 'checkbox--close'"
            />
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="actions"
      :showFilterMatchModes="false"
      headerClass="p-column-header p-default-cursor"
      class="text-secondary text-small text-inter"
      style="
        max-width: 15%;
        display: flex;
        flex: 1 1 15%;
        justify-content: center;
      "
    >
      <template #header></template>
      <template #body="{ data }">
        <div class="p-d-flex p-jc-between">
          <div v-tooltip.top="'Delete user'" class="p-mr-4" @click="handleDeleteUser($event, data.id)">
            <SvgIcon icon="delete" class="table__icon" />
          </div>
          <div v-tooltip.top="'Edit user'" @click="handleEditUser(data.id)">
            <SvgIcon icon="edit" class="table__icon" />
          </div>
        </div>
      </template>
    </Column>
    <template #footer>
      <div class="table__footer">
        <Button
            type="button"
            class="button button--secondary"
            @click="handleAddNewUser()"
        >
          <span class="text-small text-inter">Add new user</span>
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
  name: "UsersTable",
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
    const confirm = useConfirm();
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

    const handleDeleteUser = (event, id) => {
            confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this user?',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    emit("deleteUser", id);
                },
                reject: () => {
                    
                }
            });
        }


    const isEmailColumnExtended = ref (false);
    const isFNColumnExtended = ref (false);
    const isLNColumnExtended = ref (false);

    const toggleExtendColumn = (column) => {
      switch (column) {
        case 'email':
          isEmailColumnExtended.value = !isEmailColumnExtended.value;
          break;
        case 'first_name':
          isFNColumnExtended.value = !isFNColumnExtended.value;
          break;
        case 'last_name':
          isLNColumnExtended.value = !isLNColumnExtended.value;
          break;
      }
    };
    return {
      rowClass,
      filters,
      selectedUsers,
      handleEditUser,
      handleAddNewUser,
      handleDeleteUser,
      windowWidth: width,
      windowHeight: height,
      isEmailColumnExtended,
      isFNColumnExtended,
      isLNColumnExtended,
      toggleExtendColumn
    };
  },
  emits: ["deleteUser", "editUser", "newUser"],
};
</script>

<style scoped></style>
