<template>
  <div class="p-user-data-form p-m-4">
    <h4 class="p-text-center p-text-uppercase p-m-4">Project Info</h4>
    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Project name </span>
          </template>
          <template #content>
            <p>{{ state.projectName }}</p>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Client name </span>
          </template>
          <template #content>
            <p>{{ state.clientName }}</p>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Start date </span>
          </template>
          <template #content>
            <p>{{ state.startDate }}</p>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">End date </span>
          </template>
          <template #content>
            <p>{{ state.endDate }}</p>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Project info </span>
          </template>
          <template #content>
            <p>{{ state.projectInfo }}</p>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Project users </span>
          </template>
          <template #content>
            <div v-if="state.projectUsers.length > 0">
              <p v-for="user in state.projectUsers" :key="user.id">
                {{ `${user.first_name} ${user.last_name}` }}
              </p>
            </div>
            <div v-else><p>No assigned users for this project</p></div>
          </template>
        </Card>

        <Card class="p-card-main">
          <template #title>
            <span class="p-label">Project technologies </span>
          </template>
          <template #content>
            <div v-if="state.projectTechnologies.length > 0">
              <div
                v-for="data in state.projectTechnologies"
                :key="data.id"
                class="p-selected-technologies-body"
                v-tooltip.bottom="
                  `Type: ${
                    data.type_id === 1
                      ? 'Front-End'
                      : data.type_id === 2
                      ? 'Back-End'
                      : 'Mobile'
                  }, 
                   Methodology: ${getMethodologyNameById(data.methodology_id)},
                   Technology: ${data.technology},
                   Language: ${data.language}`
                "
              >
                <font-awesome-icon
                  class="p-mr-2"
                  :icon="getIconByName(data.technology)"
                />
                {{ data.technology }}
              </div>
            </div>
            <div v-else><p>No assigned technologies for this project</p></div>
          </template>
        </Card>

        <div v-if="!isUserInProject">
        <Button
          label="Participate in project"
          icon="pi pi-check"
          iconPos="right"
          class="p-button-success"
          :class="1400 > windowWidth ? 'p-button-sm' : ''"
          type="submit"
          style="width: 100%"
        />
        </div>
        <div v-else>
        <Button
          label="Exit from project"
          icon="pi pi-times"
          iconPos="left"
          class="p-button-danger"
          :class="1400 > windowWidth ? 'p-button-sm' : ''"
          type="submit"
          style="width: 100%"
        />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { useWindowSize } from "vue-window-size";
import { getIconByName, getMethodologyNameById } from "@/functions/utils";
import dayjs from "dayjs";

export default {
  name: "ProjectInfoTechView",
  props: {
    submitted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const { width, height } = useWindowSize();

    const userId = computed(() => store.getters["auth/userId"]);
    const projectData = computed(() => store.getters["admin/prjInfo"]);
    const projectUsers = computed(() => store.getters["admin/prjUsers"]);
    const projectTechnologies = computed(
      () => store.getters["admin/prjTechnologies"]
    );
    const isUserInProject = projectUsers.value.some(v => v.id === userId.value);

    const state = reactive({
      projectName: projectData.value && projectData.value.project_name,
      clientName: projectData.value && projectData.value.client_name,
      startDate:
        projectData.value && projectData.value.project_start
          ? dayjs(projectData.value.project_start).format("YYYY-MM-DD")
          : null,
      endDate:
        projectData.value && projectData.value.project_end
          ? dayjs(projectData.value.project_end).format("YYYY-MM-DD")
          : null,
      projectInfo: projectData.value && projectData.value.project_info,
      projectUsers: projectUsers.value && projectUsers.value,
      projectTechnologies:
        projectTechnologies.value && projectTechnologies.value,
    });

    return {
      state,
      windowWidth: width,
      windowHeight: height,
      getIconByName,
      getMethodologyNameById,
      isUserInProject,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  line-height: 1;
  margin: 0;
}

::v-deep(.p-card .p-card-content) {
  padding: 0rem 0 !important;
}

.p-card-main {
  width: 100%;
  margin-bottom: 0.5em;
  padding: 0;
}
</style>