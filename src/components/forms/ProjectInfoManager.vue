<template>
  <div class="p-user-data-form p-m-4">
    <h4 class="p-text-center p-text-uppercase p-m-2">Project Info</h4>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.projectName.$invalid && submitted }"
          >Project name</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <InputText
            v-model="v$.projectName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type project name"
            :class="{ 'p-invalid': v$.projectName.$invalid && submitted }"
            title="Login is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters, numbers and characters like '@', '-', '_', '.' ."
          />
        </div>
        <small v-if="v$.projectName.$invalid && submitted" class="p-error">
          Project Name is required, should be in range of 3 to 45 characters long
        </small>

         <span
          class="p-label"
          :class="{ 'p-error': v$.clientName.$invalid && submitted }"
          >Client name</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <InputText
            v-model="v$.clientName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type client name"
            :class="{ 'p-invalid': v$.clientName.$invalid && submitted }"
            title="First name is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.clientName.$invalid && submitted" class="p-error">
          Client name is required, should be in range of 3 to 45 characters long
        </small>

      </div>

      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.startDate.$invalid && submitted }"
          >Project start date</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'calendar-times']" />
          </span>
          <Calendar
            v-model="v$.startDate.$model"
            dateFormat="yy-mm-dd"
            :showButtonBar="false"
            :manualInput="false"
            placeholder="Start date"
            hideOnDateTimeSelect
            :class="{ 'p-invalid': v$.startDate.$invalid && submitted }"
            :minDate="new Date()"
            title="The start date to choose is today and there is no restrictions for maximum date."
          >
          </Calendar>
        </div>
        <small v-if="v$.startDate.$invalid && submitted" class="p-error"
          >Start date is required. The minimum date to choose is today and
          there is no restrictions for maximum date.
        </small>

        <span
          class="p-label"
          :class="{ 'p-error': v$.endDate.$invalid && submitted }"
          >Project end date</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'calendar-times']" />
          </span>
          <Calendar
            v-model="v$.endDate.$model"
            dateFormat="yy-mm-dd"
            :showButtonBar="false"
            :manualInput="false"
            placeholder="End date - first select the start date"
            hideOnDateTimeSelect
            :class="{ 'p-invalid': v$.endDate.$invalid && submitted }"
            :disabled="!v$.startDate.$model"
            :minDate="v$.startDate.$model"
            title="The end date to choose is start date and there is no restrictions for maximum date."
          >
          </Calendar>
        </div>
        <small v-if="v$.endDate.$invalid && submitted" class="p-error"
          >End date is required. The minimum date to choose is start date and
          there is no restrictions for maximum date.
        </small>

      </div>

      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.projectInfo.$invalid && submitted }"
          >Project Info</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'file-alt']" />
          </span>
          <Textarea 
          v-model="v$.projectInfo.$model"
          rows="5"
          cols="30"
          placeholder="Type project info"
          :class="{ 'p-invalid': v$.projectInfo.$invalid && submitted }"
          minLength="3"
          maxLength="255"
          title="Project info is required. This field should be in range of 3 to 255 characters."
             />
        </div>
        <small v-if="v$.projectInfo.$invalid && submitted" class="p-error"
          >Project info is required. This field should be in range of 3 to 255 characters.
        </small>
      </div>
    </div>


    <h4 class="p-text-center p-text-uppercase p-m-2">Project User(s)</h4>
    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.projectUsers.$invalid && submitted }"
          >Users assigned to the project</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <MultiSelect
            v-model="v$.projectUsers.$model"
            :options="availableUsers"
            optionLabel="first_name"
            :filter="true"
            :showClear="false"
            :class="{
              'p-invalid': v$.projectUsers.$invalid && submitted,
            }"
            class="multiselect-custom"
            placeholder="Select user(s) for this projects"
          >
            <template #value="slotProps">
              <div
                class="selected-option selected-option-value"
                v-for="option of slotProps.value"
                :key="option"
              >
                <font-awesome-icon :icon="['fas', 'user']" class="p-mr-2" />
                <div>
                  {{ `${option.first_name} ${option.last_name}` }} 
                </div>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select user(s) for this project
              </template>
            </template>
            <template #option="slotProps">
              <div class="selected-option">
                <font-awesome-icon :icon="['fas', 'user']" />
                <div class="p-ml-2">{{ `${slotProps.option.first_name} ${slotProps.option.last_name}` }}</div>
              </div>
            </template>
          </MultiSelect>
        </div>
        <small v-if="v$.projectUsers.$invalid && submitted" class="p-error"
          >{{
            v$.projectUsers.required.$message.replace(
              "Value",
              "At least one user"
            )
          }}.</small
        >
    </div>
  </div>
  
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, watch, onMounted, getCurrentInstance } from "vue";
import {
  minLength,
  maxLength,
  required,
  requiredIf,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
//   generatePassword,
  loginKeypress,
  nameKeypress,
  emailKeypress,
  validationRegExLogin,
  validationRegExName,
  validationRegExPass,
  validationRegExEmail,
  validationDuplicateEmail,
} from "@/functions/utils";
import dayjs from "dayjs";
import { useWindowSize } from "vue-window-size";

export default {
  name: "ProjectInfoManager",
  props: {
    submitted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEdit: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const { width, height } = useWindowSize();
    const instance = getCurrentInstance();

    // const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USER DATA
    const projectData = computed(() => store.getters["admin/prjInfo"]);
    const projectUsers = computed(() => store.getters["admin/prjUsers"]);
    const availableUsers = computed(() => store.getters["admin/prjAvailUsers"]);
  
    const state = reactive({
      projectName: projectData.value && projectData.value.project_name,
      clientName: projectData.value && projectData.value.client_name,
      startDate:
        projectData.value && projectData.value.project_start && props.isEdit
          ? dayjs(projectData.value.project_start).toDate()
          : null,
      endDate:
        projectData.value && projectData.value.project_end && props.isEdit
          ? dayjs(projectData.value.project_end).toDate()
          : null,
      projectInfo: projectData.value && projectData.value.project_info,
      projectUsers: projectUsers.value && projectUsers.value
    });

    const rules = {
      projectName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        // valid: validationRegExLogin,
      },
      clientName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        // valid: validationRegExName,
      },
      startDate: { required },
      endDate: { required },
      projectInfo: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
        // valid: validationRegExName,
      },
      projectUsers: { required }
    };

    const v$ = useVuelidate(rules, state);

    onMounted(() => {
      emit("changedVS", v$.value);
      emit("changedState", state);
    });

    watch(v$, (value, prevValue) => {
      if (value !== prevValue) {
        emit("changedVS", v$.value);
      }
    });

    watch(state, () => {
      emit("changedState", state);
    });

    return {
      projectData,
      projectUsers,
      availableUsers,
      state,
      instance,
      loginKeypress,
      nameKeypress,
      emailKeypress,
      dayjs,
      windowWidth: width,
      windowHeight: height,
      v$,
    };
  },
  emits: ["changedVS", "changedState"],
};
</script>

<style lang="scss"></style>
