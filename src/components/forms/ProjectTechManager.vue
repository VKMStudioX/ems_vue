<template>
<div class="p-m-4">
  <div class="p-mt-2 p-mb-2">
    <h4 class="p-text-center p-text-uppercase p-m-2">Project technologies</h4>
    
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <span class="p-label">Purpose of project</span>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon
              :icon="
                selectedPurposes.name === 'Web'
                  ? ['fas', 'desktop']
                  : ['fas', 'mobile-alt']
              "
            />
          </span>
          <Dropdown
            v-model="selectedPurposes"
            :options="purposes"
            :key="purposesData"
            optionLabel="name"
            placeholder="Select purpose of project"
            :filter="false"
            :showClear="false"
            title="Select purpose of project."
          />
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <span class="p-label">Types of programming</span>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="
            selectedTypes.name === 'Mobile'
            ? ['fas', 'mobile-alt']
            :   selectedTypes.name === 'Front-End'
                  ? ['fas', 'photo-video']
                  : ['fas', 'database']
              " />
          </span>
          <Dropdown
            v-model="selectedTypes"
            :options="types"
            optionLabel="name"
            placeholder="Select type of programming"
            :filter="false"
            :showClear="false"
            title="Select type of programming."
          />
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <span class="p-label">Methodology</span>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'project-diagram']" />
          </span>
          <Dropdown
            v-model="selectedMethodologies"
            :options="methodologies"
            optionLabel="name"
            placeholder="Select methodology"
            :filter="false"
            :showClear="false"
            title="Select methodology"
          >
          <template #empty>
            First select purpose and type.
          </template>
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="p-p-2 p-picklist-background">
      <div class="p-technologies">
          <DataTable
            :loading="false"
            :value="technologies"
            v-model:selection="selectedTechnologies"
            dataKey="data_key"
            field="data_key"
            class="p-datatable-sm"
            :scrollable="true"
            scrollHeight="flex"
            @row-select="handleSingleSelection($event.data, true)"
            @row-unselect="handleSingleRemove($event.data, true)"
          >
            <template #empty>
              Not found any technologies. Select purpose, type and methodologies.
            </template>
            <Column
              class="p-technologies-select"
              style="flex: 0 0 47%"
              selectionMode="multiple"
              field="data_key"
              dataKey="data_key"
              headerStyle="width: 50%; display: none;"
            >
            </Column>
            <Column
              field="ship_name"
              class="p-technologies-content"
              style="flex: 0 0 53%; align-items: center"
              headerStyle="flex: 0 0 100%; justify-content: center;"
            >
              <template #header class="p-table-center-flex">
                Technologies (available)
              </template>
              <template #body="{ data }">
                <font-awesome-icon
                  class="p-mr-2"
                  :icon="getIconByName(data.technology)"
                />
               {{ data.technology }}
              </template>
            </Column>
          </DataTable>
      </div>

      <div class="p-technologies p-selected-technologies">
        <DataTable
          :value="selectedTechnologies"
          dataKey="data_key"
          responsiveLayout="scroll"
          class="p-datatable-sm"
          :scrollable="true"
          scrollHeight="flex"
        >
          <template #empty> No selections found </template>
          <Column field="ship_name" header="Selected (User Technologies)">
            <template #body="{ data }">
              <div
                class="p-selected-technologies-body"
                v-tooltip.left="
                   `Type: ${data.type_id === 1 ? 'Front-End' : data.type_id === 2 ? 'Back-End' : 'Mobile'}, 
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
              <div class="p-selected-technologies-body p-ship-remove">
                <div @click="handleSingleRemove(data, true)">
                  <font-awesome-icon class="p-mr-2" :icon="['fas', 'times']" />
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <div>
    <div class="p-grid p-fluid p-jc-between">
      <div class="p-col-12">
        <div class="p-inputgroup p-flex p-flex-row p-jc-end">
          <Button
            label="Clear"
            icon="pi pi-times"
            iconPos="left"
            class="p-button-danger p-mr-2"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            @click="handleRemoveAllTechnologies()"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
            :class="1400 > windowWidth ? 'p-button-sm' : ''"
            type="submit"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { computed, onMounted, ref, watch } from "vue";
import { createToast } from "../../functions/utils";
import { useWindowSize } from "vue-window-size";

export default {
  name: "ProjectTechManagerForm",
  setup(props, { emit }) {
    const { width, height } = useWindowSize();
    const store = useStore();
    const toast = useToast();

    const errorMsg = computed(() => store.getters["rdm/rdmApiErrorMsg"]);

    const purposesData = computed(() => store.getters["admin/purposes"])

    const typesWebData = computed(() => store.getters["admin/typesWeb"])
    const typesMobileData = computed(() => store.getters["admin/typesMobile"])

    const projectTechnologies = computed(() => store.getters["admin/prjTechnologies"])

    const types = ref(typesWebData.value && typesWebData.value);
    const selectedTypes = ref([]);

    const methodologies = ref([]);
    const selectedMethodologies = ref([]);
    const purposes = ref(purposesData.value && purposesData.value);
    const selectedPurposes = ref(purposesData.value && purposesData.value[0]);

    const technologies = ref();
    const selectedTechnologies = ref(projectTechnologies.value && projectTechnologies.value);
    
    const removeTechnologies = ref();

    const blockUI = ref(true);
    const loadingTechList = ref(false);

    const rdmSelectedOnMounted = ref(false);

    watch(selectedPurposes, (value, prevValue) => {
      if (value !== prevValue) {
         types.value =
          selectedPurposes.value.name === "Web"
            ? typesWebData.value
            : typesMobileData.value;

        technologies.value = [];
        selectedTypes.value = [];
        selectedMethodologies.value = [];

      }
    });

    watch(selectedTypes, (value, prevValue) => {
      if (value !== prevValue) {
        
        selectedTypes.value.name === "Mobile"
        ? methodologies.value = computed(() => store.getters["admin/methodologies"](3)).value
          : selectedTypes.value.name === "Front-End"
            ? methodologies.value = computed(() => store.getters["admin/methodologies"](1)).value
            : methodologies.value = computed(() => store.getters["admin/methodologies"](2)).value

        technologies.value = [];
        selectedMethodologies.value = [];
      }
    });

    watch(selectedMethodologies, (value, prevValue) => {
      if (value !== prevValue) {
        technologies.value = computed(() => store.getters["admin/technologies"](value.id)).value;
      }
    });


    // Emitting the changes of selected and removed technologies to main component
     onMounted(() => {
        emit("selectedTechnologies", selectedTechnologies.value);
    });

    watch(selectedTechnologies, (value, prevValue) => {
      if (value !== prevValue) {
        emit("selectedTechnologies", selectedTechnologies.value);
      }
    });
    
    watch(removeTechnologies, (value, prevValue) => {
      if (value !== prevValue) {
        emit("removeTechnologies", removeTechnologies.value);
      }
    });


    // FUNCTIONS
    const removeDuplicateTechnologies = (array, data) => {

      const removeTechnologiesByIndex = (indexes, length) => {
        if (indexes.length > length) {
          for (let i = 0; i < indexes.length-length; i++) {
            handleSingleRemove(array.value[indexes[i]], false)
          }
        }
      }

        let indexesFrontEnd = []
        let indexesBackEnd = []
        array.value.forEach((v,i) => {
          if ( v.purpose_id === 1 && data.purpose_id === 1 && v.type_id === 1 && data.type_id === 1 ) {
            indexesFrontEnd.push(i)
          }
          if ( v.purpose_id === 1 && data.purpose_id === 1 && v.type_id === 2 && data.type_id === 2 ) {
            indexesBackEnd.push(i)
          }
        })
        removeTechnologiesByIndex(indexesFrontEnd, 1)
        removeTechnologiesByIndex(indexesBackEnd, 1)

   
      if(data.methodology_id === 4) {
          let indexesFrontEnd4 = []
          array.value.forEach((v,i) => {
          if ( v.purpose_id === 1 && data.purpose_id === 1 && v.type_id === 1 ) {
            indexesFrontEnd4.push(i)
          }
        })
            removeTechnologiesByIndex(indexesFrontEnd4, 0)
        }

    };

    const changeSelectedTechnologies = (data) => {
      selectedTechnologies.value
        ? (selectedTechnologies.value = [...selectedTechnologies.value, data])
        : (selectedTechnologies.value = [data]);
    };

    const removeDuplicatesFromArray = (array) => {
      array.value = array.value.filter(
        (v, i, a) => a.findIndex((t) => t.data_key === v.data_key) === i
      );
    };

    const handleSingleSelection = (data, isToast) => {
      changeSelectedTechnologies(data);
      removeDuplicatesFromArray(selectedTechnologies);
      removeDuplicateTechnologies(selectedTechnologies, data)

      isToast === true
        ? createToast(
            toast,
            "success",
            "1 item successfully selected",
            data.technology,
            1000
          )
        : null;
    };

    const handleSingleRemove = (data, isToast) => {
      isToast === true
        ? createToast(
            toast,
            "warn",
            "1 item successfully removed from selected",
            data.technology,
            1000
          )
        : null;

      selectedTechnologies.value = selectedTechnologies.value.filter(
        (selShip) => selShip.data_key !== data.data_key
      );

    };

    const handleRemoveAllTechnologies = () => {
      selectedTechnologies.value &&
        selectedTechnologies.value.length > 0 &&
        createToast(
          toast,
          "warn",
          `All item(s) successfully removed from selected`,
          "",
          1000
        );
      selectedTechnologies.value &&
        selectedTechnologies.value.forEach((data) => handleSingleRemove(data, false));
      selectedTechnologies.value ? (selectedTechnologies.value = []) : null;
    };

    const getIconByName = (name) => {
      let icon = ["", ""];

      if (name.includes('React') || name.includes('Next') || name.includes('Gatsby')) {
        icon = ["fab", "react"];
      }
      if (name.includes('Vue') || name.includes('Nuxt')) {
        icon = ["fab", "vuejs"];
      }
      if (name.includes('Laravel')) {
        icon = ["fab", "laravel"];
      }
      if (name.includes('Spring')) {
        icon = ["fab", "java"];
      }
      if (name.includes('Ruby')) {
        icon = ["far", "gem"];
      }
      if (name.includes('Django')) {
        icon = ["fab", "python"];
      }
      if (name.includes('iOS')) {
        icon = ["fab", "apple"];
      }
      if (name.includes('Android')) {
        icon = ["fab", "android"];
      }

      return icon;
    } 

    return {
      purposes, purposesData,
      selectedPurposes,

      types,
      selectedTypes,

      methodologies,
      selectedMethodologies,

      technologies,
      selectedTechnologies,

      rdmSelectedOnMounted,
      
      loadingTechList,
      blockUI,
      technologies,
      removeTechnologies,

      getIconByName,
      handleSingleSelection,
      handleSingleRemove,
      handleRemoveAllTechnologies,
      windowWidth: width,
      windowHeight: height,

    };
  },
  emits: ["selectedTechnologies", "removeTechnologies"],
};
</script>

<style lang="scss" scoped>
.p-table-technologies {
  overflow-x: hidden !important;
}

.p-picklist-background {
  background-color: var(--surface-b);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}

.p-technologies {
  width: 67.8%;
  height: 100%;
  height: calc(35vw - 250px);
  overflow-x: hidden !important;
  background-color: var(--surface-a);

  @media screen and (max-width: 1700px) {
    height: calc(34vw - 225px);
  }
  @media screen and (max-width: 1600px) {
    height: calc(33vw - 200px);
  }
  @media screen and (max-width: 1500px) {
    height: calc(30vw - 175px);
  }
  @media screen and (max-width: 1400px) {
    height: calc(27vw - 150px);
  }
  @media screen and (max-width: 1300px) {
    height: calc(25vw - 150px);
  }
}

.p-selected-technologies {
  width: 32.2% !important;
}

.p-selected-technologies-body {
  display: flex !important;
  flex: 1 0 95% !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.p-ship-remove {
  flex: 1 0 5% !important;
  color: red;
  justify-content: space-between !important;
  cursor: pointer;
}
</style>
