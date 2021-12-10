<template>
  <div class="p-user-data-form p-m-4">
    <h4 class="p-text-center p-text-uppercase p-m-4">{{ isEdit ? 'Edit user Data' : 'Create new user' }}</h4>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.firstName.$invalid && submitted }"
          >First name</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <InputText
            v-model="v$.firstName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type first name"
            @keypress="nameKeypress($event)"
            :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
            title="First name is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.firstName.$invalid && submitted" class="p-error">
          First name is required, should be in range of 3 to 45 characters long,
          with only small or/and capital letters.
        </small>
    </div>
  </div>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
       <span
          class="p-label"
          :class="{ 'p-error': v$.lastName.$invalid && submitted }"
          >Last Name</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <InputText
            v-model="v$.lastName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type last name"
            @keypress="nameKeypress($event)"
            :class="{ 'p-invalid': v$.lastName.$invalid && submitted }"
            title="Last name is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.lastName.$invalid && submitted" class="p-error">
          Last name is required, should be in range of 3 to 45 characters
          long, with only small or/and capital letters.
        </small>
      </div>
    </div>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.email.$invalid && submitted }"
          >Email</span
        >
        <div class="p-inputgroup">
          <span
            class="p-inputgroup-addon"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>
          <InputText
            v-model="v$.email.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type email@company.com"
            @keypress="emailKeypress($event)"
            :class="{
              'p-invalid': v$.email.$invalid && submitted,
            }"
            title="Email is required, should be in range of 3 to 45 characters, with only &#10;small or capital letters, numbers and characters like '- _ .' ."
          />
        </div>
        <small v-if="v$.email.$invalid && submitted" class="p-error p-d-block">
          Email is required, should be in range of 3 to 45 characters, with only
          small or capital letters, numbers and characters like "-" "_" ".".
        </small>
        <small
          v-if="!isEdit && v$.email.valid.$invalid"
          class="p-error p-d-block"
        >
          The user data.email has already been taken.
        </small>
      </div>
    </div>

    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.isAdmin.$invalid && submitted }"
          >is Admin ?</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'user-lock']" />
          </span>
          <ToggleButton
            v-model="v$.isAdmin.$model"
            onLabel="User is Admin"
            offLabel="User is not Admin"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="p-auth-button"
            :class="{ 'p-invalid': v$.isAdmin.$invalid && submitted }"
            title="isAdmin? is required (Admin or Not admin)."
          />
        </div>
        <small v-if="v$.isAdmin.$invalid && submitted" class="p-error"
          >{{
            v$.isAdmin.required.$message.replace("Value", "Authorization")
          }}.</small
        >
      </div>
    </div>
    <div class="p-grid p-fluid p-jc-center">
      <div class="p-col-12 p-md-4">
        <span
          class="p-label"
          :class="{ 'p-error': v$.password.$invalid && submitted }"
          >Password</span
        >
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <font-awesome-icon :icon="['fas', 'lock']" />
          </span>
          <Password
            v-model="v$.password.$model"
            toggleMask
            :feedback="false"
            inputClass="p-password"
            placeholder="Type password"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            minLength="10"
            maxLength="10"
            title="Password is required only for new users or when need to change existing user password. &#10;Password must be 10 characters long, with only capital and small letters, number and special character."
          ></Password>
          <Button
            label="Generate"
            class="p-button-outlined p-button-info p-password-button"
            @click="handleGeneratePassword()"
          ></Button>
        </div>
        <small
          v-if="v$.password.$invalid && submitted"
          class="p-error p-d-block"
          >{{
            v$.password.required.$invalid === true
              ? `${v$.password.required.$message.replace("value", "Password")}.`
              : null
          }}
        </small>
        <small
          v-if="v$.password.$invalid && submitted"
          class="p-error p-d-block"
        >
          Password is required only for new users or when need to change
          existing user password. Password must be 10 characters long, with only
          capital and small letters, number and special character.
        </small>
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
  requiredIf,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
  generatePassword,
  nameKeypress,
  loginKeypress,
  emailKeypress,
  validationRegExPass,
  validationRegExEmail,
  validationRegExName,
  validationDuplicateEmail,
  validationFromAPI,
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

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USER DATA
    const userData = computed(() => store.getters["admin/userData"]);

    const state = reactive({
      firstName: userData.value && userData.value.first_name,
      lastName: userData.value && userData.value.last_name,
      isAdmin: userData.value && userData.value.is_admin,
      email: userData.value && userData.value.email,
      password: "",
    });

    const handleGeneratePassword = () => {
      state.password = generatePassword();
    };

    const rules = {
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        valid: validationRegExName,
      },
      lastName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        valid: validationRegExName,
      },
      isAdmin: { required },
      email: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        validEmail: validationRegExEmail,
        ...(!props.isEdit && { valid: validationDuplicateEmail(errorMsg) }),
        validFromAPI: validationFromAPI(errorMsg, "email"),
      },
      password: {
        required: requiredIf(() => !props.isEdit),
        minLength: minLength(10),
        maxLength: maxLength(10),
        // valid: validationRegExPass,
        // validFromAPI: validationFromAPI(errorMsg, "password"),
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

    watch(
      () => state.email,
      (emailValue, prevEmailValue) => {
        if (
          emailValue !== prevEmailValue &&
          errorMsg.value !== "" &&
          errorMsg.value.includes("email")
        ) {
          store.commit("admin/updateApiErrorMsg", "");
        }
      }
    );

    watch(
      () => state.password,
      (passwordValue, prevEmailValue) => {
        if (
          passwordValue !== prevEmailValue &&
          errorMsg.value !== "" &&
          errorMsg.value.includes("password")
        ) {
          store.commit("admin/updateApiErrorMsg", "");
        }
      }
    );

    return {
      state,
      handleGeneratePassword,
      nameKeypress,
      loginKeypress,
      emailKeypress,
      windowWidth: width,
      windowHeight: height,
      v$,
    };
  },
  emits: ["changedVS", "changedState"],
};
</script>

<style lang="scss"></style>
