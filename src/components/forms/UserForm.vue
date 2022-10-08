<template>
  <div class="form">
    <span class="form__header text-inter text-primary heading-tertiary">{{ isEdit ? 'Edit user Data' : 'Create new user' }}</span>

      <div class="form__content-1">

<!--         FIRST NAME -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
          >First name</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
        >
          <span class="p-inputgroup-addon">
            <SvgIcon icon="users" class="p-input-icon"/>
          </span>
          <InputText
            v-model="v$.firstName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type first name"
            @keypress="nameKeypress($event)"
            title="First name is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.firstName.$invalid && submitted" class="p-invalid">
          First name is required, should be in range of 3 to 45 characters long, with only small or/and capital letters.
        </small>


<!--  LAST NAME -->
       <span
          class="p-label"
          :class="{ 'p-invalid': v$.lastName.$invalid && submitted }"
          >Last Name</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.lastName.$invalid && submitted }"
        >
          <span class="p-inputgroup-addon">
            <SvgIcon icon="users" class="p-input-icon"/>
          </span>
          <InputText
            v-model="v$.lastName.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type last name"
            @keypress="nameKeypress($event)"
            title="Last name is required, should be in range of 3 to 45 characters long, &#10;with only small or/and capital letters."
          />
        </div>
        <small v-if="v$.lastName.$invalid && submitted" class="p-invalid">
          Last name is required, should be in range of 3 to 45 characters long, with only small or/and capital letters.
        </small>


<!--         EMAIL -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.email.$invalid && submitted }"
          >Email</span
        >
        <div class="p-inputgroup"
             :class="{ 'p-invalid': v$.email.$invalid && submitted }">
          <span
            class="p-inputgroup-addon"
          >
            <SvgIcon icon="email" class="p-input-icon"/>
          </span>
          <InputText
            v-model="v$.email.$model"
            minLength="3"
            maxLength="45"
            required
            placeholder="Type email address"
            @keypress="emailKeypress($event)"
            title="Email is required, should be in range of 3 to 45 characters, with only &#10;small or capital letters, numbers and characters like '- _ .' ."
          />
        </div>
        <small v-if="v$.email.$invalid && submitted" class="p-invalid p-d-block">
          Email is required, should be in range of 3 to 45 characters, with only small or capital letters, numbers and characters like "-" "_" ".".
        </small>
        <small
          v-if="!isEdit && v$.email.valid.$invalid"
          class="p-invalid p-d-block"
        >
          The user data.email has already been taken.
        </small>
      </div>



    <div class="form__content-2">

<!--       PASSWORD -->
        <span
          class="p-label"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }"
          >Password</span
        >

        <div class="p-inputgroup" :class="{ 'p-invalid': v$.password.$invalid && submitted }"
        >
          <span class="p-inputgroup-addon">
            <SvgIcon icon="lock" class="p-input-icon"/>
          </span>
          <Password
            v-model="v$.password.$model"
            toggleMask
            :feedback="false"
            placeholder="Type password"
            inputClass="p-password"
            minLength="10"
            maxLength="10"
            title="Password is required only for new users or when need to change existing user password. &#10;Password must be 10 characters long, with only capital and small letters, number and special character."
          ></Password>
        </div>

      <small
          v-if="v$.password.$invalid && submitted"
          class="p-invalid"
      >{{
          v$.password.required.$invalid === true
              ? `${v$.password.required.$message.replace("value", "Password")}.`
              : null
        }}
      </small>
      <small
          v-if="v$.password.$invalid && submitted"
          class="p-invalid"
      >
        Password is required only for new users or when need to change existing user password.
        Password must be 10 characters long, with only capital and small letters, number and special character.
      </small>
      <div class="p-password-generate">
      <Button
        label="Generate"
        class="button--small button--small-font-size button--secondary button--secondary-outline"
        @click="handleGeneratePassword()"
    ></Button>
    </div>





      <!--   IS ADMIN ? -->
      <span
          class="p-label"
          :class="{ 'p-invalid': v$.isAdmin.$invalid && submitted }"
      >is Admin ?</span
      >
      <Switch v-model="v$.isAdmin.$model" />
      <small v-if="v$.isAdmin.$invalid && submitted" class="p-invalid"
      >{{
          v$.isAdmin.required.$message.replace("Value", "Authorization")
        }}.</small
      >
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
import Switch from "@/components/commons/Switch";

export default {
  name: "EmcUserDataForm",
  components: {Switch},
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
