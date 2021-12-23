<template>
   <div class="p-user-data-form p-m-4">
    <h4 class="p-text-center p-text-uppercase p-m-4">Project Info</h4>
    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">

        <span
          class="p-label"
          >Project name
          <h4 class="p-mx-4 p-my-0"> {{ state.projectName }} </h4>
          </span
        >

        <span
          class="p-label"
          >Client name
          <h4 class="p-mx-4 p-my-0"> {{ state.clientName }} </h4>
          </span
        >

        <span
          class="p-label"
          >Start date
          <h4 class="p-mx-4 p-my-0"> {{ state.startDate }} </h4>
          </span
        >

        <span
          class="p-label"
          >End date
          <h4 class="p-mx-4 p-my-0"> {{ state.endDate }} </h4>
          </span
        >

        <span
          class="p-label"
          >Project info
          <h4 class="p-mx-4 p-my-0"> {{ state.projectInfo }} </h4>
          </span
        >

        <span
          class="p-label"
          >Project users
          <h4 class="p-mx-4 p-my-0"> {{ state.projectsUsers }} </h4>
          </span
        >
        
      </div>
      </div>
      </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, getCurrentInstance } from "vue";
import dayjs from "dayjs";
import { useWindowSize } from "vue-window-size";

export default {
  name: "ProjectInfoTechView",
  props: {
    // submitted: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // isEdit: {
    //   type: Boolean,
    //   required: true,
    //   default: true,
    // },
  },

  setup(props, { emit }) {
    const store = useStore();
    const { width, height } = useWindowSize();
    const instance = getCurrentInstance();

    // USER DATA
    const projectData = computed(() => store.getters["admin/prjInfo"]);
    const projectUsers = computed(() => store.getters["admin/prjUsers"]);
  
    const state = reactive({
      projectName: projectData.value && projectData.value.project_name,
      clientName: projectData.value && projectData.value.client_name,
      startDate:
        projectData.value && projectData.value.project_start 
          ? dayjs(projectData.value.project_start).format('YYYY-MM-DD')
          : null,
      endDate:
        projectData.value && projectData.value.project_end 
          ? dayjs(projectData.value.project_end).format('YYYY-MM-DD')
          : null,
      projectInfo: projectData.value && projectData.value.project_info,
      projectUsers: projectUsers.value && projectUsers.value
    });

    return {
      state,
      instance,
      windowWidth: width,
      windowHeight: height,
    };
  },
  emits: ["changedVS", "changedState"],
};
</script>

<style>

</style>