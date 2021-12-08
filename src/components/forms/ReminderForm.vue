<template>
  <div class="p-user-data-form p-m-4">
    <h4 class="p-text-center p-text-uppercase p-m-4">{{ isEdit ? 'Edit reminder' : 'Create new reminder' }}</h4>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.selectedDOW.$invalid && submitted }"
          >Days of week</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'calendar-week']" />
          </span>
          <MultiSelect
            v-model="v$.selectedDOW.$model"
            :options="daysOfWeek"
            optionLabel="textOfReminder"
            :showClear="false"
            :class="{
              'p-invalid': v$.selectedDOW.$invalid && submitted,
            }"
            class="multiselect-custom"
            placeholder="Select day(s) of week"
          >
            <template #value="slotProps">
              <div
                class="selected-option selected-option-value"
                v-for="option of slotProps.value"
                :key="option"
              >
                <font-awesome-icon :icon="['fas', 'calendar-day']" class="p-mr-2" />
                <div>
                  {{ option }}
                </div>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select day(s) of week
              </template>
            </template>
            <template #option="slotProps">
              <div class="selected-option">
                <font-awesome-icon :icon="['fas', 'calendar-day']" />
                <div class="p-ml-2">{{ slotProps.option }}</div>
              </div>
            </template>
          </MultiSelect>
        </div>
        <small v-if="v$.selectedDOW.$invalid && submitted" class="p-error"
          >{{
            v$.selectedDOW.required.$message.replace(
              "Value",
              "At least one day"
            )
          }}.</small
        >
    </div>
  </div>

   <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
       <span
          class="p-label"
          :class="{ 'p-error': v$.selectedHOR.$invalid && submitted }"
          >Hour of reminder</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <Dropdown
            v-model="v$.selectedHOR.$model"
            :options="hourOfReminder"
            optionLabel="name"
            :filter="true"
            :showClear="true"
            :class="{ 'p-invalid': v$.selectedHOR.$invalid && submitted }"
            placeholder="Select hour of reminder"
          >
            <template #value="slotProps">
              <div
                class="selected-option selected-option-value"
                v-if="slotProps.value"
              >
                <font-awesome-icon
                  :icon="['fas', 'clock']"
                  class="p-mr-2"
                />
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="selected-option">
                <font-awesome-icon
                  :icon="['fas', 'clock']"
                />
                <div class="p-ml-2">{{ slotProps.option }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <small v-if="v$.selectedHOR.$invalid && submitted" class="p-error">{{
          v$.selectedHOR.required.$message.replace("Value", "Action")
        }}</small>
      </div>
    </div>


    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
       <span
          class="p-label"
          :class="{ 'p-error': v$.titleOfReminder.$invalid && submitted }"
          >Reminder title</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'heading']" />
          </span>
          <InputText
            v-model="v$.titleOfReminder.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type title of reminder"
            :class="{ 'p-invalid': v$.titleOfReminder.$invalid && submitted }"
            title="Title is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.titleOfReminder.$invalid && submitted" class="p-error">
          Title is required, should be in range of 3 to 45 characters
          long, with only small or/and capital letters.
        </small>
      </div>
    </div>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.textOfReminder.$invalid && submitted }"
          >Text of reminder</span
        >
        <div class="p-inputgroup">
          <span
            class="p-inputgroup-addon"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>
          <Textarea
            v-model="v$.textOfReminder.$model"
            rows="5" cols="30"
            minLength="3"
            maxLength="255"
            required
            placeholder="Type text of reminder"
            :class="{
              'p-invalid': v$.textOfReminder.$invalid && submitted
            }"
            title="textOfReminder is required, should be in range of 3 to 45 characters, with only &#10;small or capital letters, numbers and characters like - _ .  &#10;In addition, must be in format like login@enamor.pl ."
          />
        </div>
        <small v-if="v$.textOfReminder.$invalid && submitted" class="p-error p-d-block">
          textOfReminder is required, should be in range of 3 to 255 characters, with only
          small or capital letters, numbers and characters like "-" "_" ".". In
          addition, must be in format like "login@enamor.pl" .
        </small>
      </div>
    </div>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.activeReminder.$invalid && submitted }"
          >is Active ?</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'lock']" />
          </span>
          <ToggleButton
            v-model="v$.activeReminder.$model"
            onLabel="Reminder is Active"
            offLabel="Reminder is not Active"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="p-auth-button"
            :class="{ 'p-invalid': v$.activeReminder.$invalid && submitted }"
            title="activeReminder? is required (Admin or Not admin)."
          />
        </div>
        <small v-if="v$.activeReminder.$invalid && submitted" class="p-error"
          >{{
            v$.activeReminder.required.$message.replace("Value", "Authorization")
          }}.</small
        >
      </div>
    </div>

    <div class="p-grid p-fluid p-jc-center p-mt-2">
      <div class="p-col-12 p-md-4">
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

export default {
  name: "EmcUserDataForm",
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

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const hourOfReminder = [
        '8:00', '8:30', '9:00', '9:30', '10:00',
        '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00' ]

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USER DATA
    const reminderData = computed(() => store.getters["admin/reminderData"]);

    const state = reactive({
      selectedDOW: props.isEdit
      ? reminderData.value && reminderData.value.days_of_week.split(',')
      : null,
      selectedHOR: reminderData.value && reminderData.value.hour_of_reminder,
      titleOfReminder: reminderData.value && reminderData.value.title_of_reminder,
      activeReminder: reminderData.value && reminderData.value.active_reminder,
      textOfReminder: reminderData.value && reminderData.value.text_of_reminder,
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
.p-multiselect-label:not(.p-placeholder) {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.p-dropdown-label:not(.p-placeholder) {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.selected-option {
  display: inline-flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem 1rem;
}
.selected-option-value {
  padding: 0.5rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>
