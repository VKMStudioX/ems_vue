<template>
  <div class="form">
    <span class="form__header text-inter text-primary heading-tertiary">{{ isEdit ? 'Edit reminder' : 'Create new reminder' }}</span>

    <div class="form__content-1">

<!-- DAYS OF WEEK -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.selectedDOW.$invalid && submitted }"
          >Days of week</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.selectedDOW.$invalid && submitted }">
          <span class="p-inputgroup-addon">
             <SvgIcon icon="calendar" class="p-input-icon" />
          </span>
          <MultiSelect
            v-model="v$.selectedDOW.$model"
            :options="daysOfWeek"
            optionLabel="name"
            :showClear="false"
            class="multiselect-custom"
            placeholder="Select day(s)"
          >
            <template #value="slotProps">
              <div
                class="p-selected-option p-selected-option-value"
                v-for="option of slotProps.value"
                :key="option"
              >
                <span class="text-white text-extra-small">{{ option.name }}</span>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select day(s)
              </template>
            </template>
            <template #option="slotProps">
              <span class="text-secondary">{{ slotProps.option.name }}</span>
            </template>
          </MultiSelect>
        </div>
        <small v-if="v$.selectedDOW.$invalid && submitted" class="p-invalid"
          >{{
            v$.selectedDOW.required.$message.replace(
              "Value",
              "At least one day"
            )
          }}.</small
        >

<!-- HOUR -->
       <span
          class="p-label"
          :class="{ 'p-invalid': v$.selectedHOR.$invalid && submitted }"
       >Hour of reminder</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.selectedHOR.$invalid && submitted }"
        >
          <span class="p-inputgroup-addon">
            <SvgIcon icon="clock" class="p-input-icon"/>
          </span>
          <Dropdown
            v-model="v$.selectedHOR.$model"
            :options="hourOfReminder"
            optionLabel="name"
            :filter="false"
            :showClear="true"
            placeholder="Select hour"
          >
            <template #value="slotProps">
              <div
                class="p-selected-option p-selected-option-value"
                v-if="slotProps.value"
              >
               <span class="text-white text-extra-small">{{ slotProps.value }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
                <span class="text-secondary">{{ slotProps.option }}</span>
            </template>
          </Dropdown>
        </div>
        <small v-if="v$.selectedHOR.$invalid && submitted" class="p-invalid">{{
          v$.selectedHOR.required.$message.replace("Value", "Action")
        }}</small>


<!--   TITLE -->
       <span
          class="p-label"
          :class="{ 'p-invalid': v$.titleOfReminder.$invalid && submitted }"
          >Reminder title</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.titleOfReminder.$invalid && submitted }"
        >
          <span class="p-inputgroup-addon">
            <SvgIcon icon="text" class="p-input-icon" />
          </span>
          <InputText
            v-model="v$.titleOfReminder.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type title"
            title="Title is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.titleOfReminder.$invalid && submitted" class="p-invalid">
          Title is required, should be in range of 3 to 45 characters
          long, with only small or/and capital letters.
        </small>
      </div>


    <div class="form__content-2">

<!--       TEXT -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.textOfReminder.$invalid && submitted }"
          >Text of reminder</span
        >
        <div class="p-inputgroup p-inputgroup--no-icons"
             :class="{ 'p-invalid': v$.textOfReminder.$invalid && submitted }"
        >
          <Textarea
            v-model="v$.textOfReminder.$model"
            rows="5" cols="30"
            minLength="3"
            maxLength="255"
            required
            placeholder="Type text"
            class="p-inputtext--no-icons"
           title="text of reminder is required, should be in range of 3 to 45 characters, with only &#10;small or capital letters, numbers and special characters"
          />
        </div>
        <small v-if="v$.textOfReminder.$invalid && submitted" class="p-invalid">
          text field is required, should be in range of 3 to 255 characters, with only
          small or capital letters, numbers and special characters
        </small>


<!--  ACTIVE  -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.activeReminder.$invalid && submitted }"
          >is Active ?</span
        >
      <Switch
        v-model="v$.activeReminder.$model"
        />
  </div>

    <div class="form__footer">
      <div class="form__footer--button">
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
import { computed, reactive, watch, onMounted } from "vue";
import {
  minLength,
  maxLength,
  required,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
  loginKeypress,
  validationRegExName,
} from "../../functions/utils";
import { useWindowSize } from "vue-window-size";
import SvgIcon from "@/components/commons/SvgIcon";
import Switch from "@/components/commons/Switch";

export default {
  name: "EmcUserDataForm",
  components: {Switch, SvgIcon},
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

    const daysOfWeek = [
      {
        id: 1,
        name: "Sunday",
        shortName: "Sun",
      },
      {
        id: 2,
        name: "Monday",
        shortName: "Mon",
      },
      {
        id: 3,
        name: "Tuesday",
        shortName: "Tue",
      },
      {
        id: 4,
        name: "Wednesday",
        shortName: "Wed",
      },
      {
        id: 5,
        name: "Thursday",
        shortName: "Thu",
      },
      {
        id: 6,
        name: "Friday",
        shortName: "Fri",
      },
      {
        id: 7,
        name: "Saturday",
        shortName: "Sat",
      }
    ]

    const hourOfReminder = [
        '8:00', '8:30', '9:00', '9:30', '10:00',
        '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00' ]

    const errorMsg = computed(() => store.getters["reminder/apiErrorMsg"]);

    // USER DATA
    const reminderData = computed(() => store.getters["reminder/reminderData"]);

    const state = reactive({
      selectedDOW: props.isEdit
      ? reminderData.value && reminderData.value.days_of_week.split(',')
      : null,
      selectedHOR: reminderData.value && reminderData.value.hour,
      titleOfReminder: reminderData.value && reminderData.value.title,
      activeReminder: reminderData.value ? reminderData.value.active : false,
      textOfReminder: reminderData.value && reminderData.value.text,
    });

    const rules = {
      selectedDOW: {
        required,
      },
      selectedHOR: {
        required,
      },
      titleOfReminder: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
      },
      activeReminder: { required },
      textOfReminder: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
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
      daysOfWeek, hourOfReminder,
      state,
      loginKeypress,
      windowWidth: width,
      windowHeight: height,
      v$,
    };
  },
  emits: ["changedVS", "changedState"],
};
</script>

<style lang="scss">
</style>
