<template>
  <div class="login-box">
    <div class="login-box__background-wrapper"></div>
    <div class="login-box__wrapper">

      <ProgressSpinner v-if="loading"/>

      <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          @invalid.capture.prevent="handleInvalid()"
      >

        <div class="login-container" v-if="!loading">

          <div class="login-container__logo">
          <img src="~@/assets/img/logo.png" alt="logo" class="login-container__logo"/>
          </div>

          <div class="login-container__email">
          <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                          <SvgIcon icon="email" class="p-input-icon" />
                        </span>
            <InputText
                v-model="v$.email.$model"
                minLength="3"
                maxLength="45"
                required
                placeholder="Enter your email"
                @keypress="emailKeypress($event)"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                title="Email is required, should be in range of 3 to 45 characters, with &#10;only small or/and capital letters, numbers and characters like - _ ."
            />
          </div>
          <small v-if="v$.email.$invalid && submitted" class="p-error">
            Email is required, should be in range of 3 to 45 characters, with
            only small or/and capital letters, numbers and characters like
            "-", "_", ".".
          </small>
          </div>


          <div class="login-container__password">
          <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                         <SvgIcon icon="lock" class="p-input-icon" />
                        </span>
            <InputText
                v-model="v$.password.$model"
                toggleMask
                type="password"
                :feedback="false"
                inputClass="p-password"
                placeholder="Enter your password"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                minLength="10"
                maxLength="10"
                title="Password is required and must be 10 characters long, &#10;with only capital and small letters, number and special character."
            ></InputText>
          </div>
          <small v-if="v$.password.$invalid && submitted" class="p-error">
            Password is required and must be 10 characters long, with only
            capital and small letters, number and special character.
          </small>
          </div>

          <div class="login-container__button">
          <Button type="submit" class="button button--secondary">
            <span class="p-ml-2 p-text-bold">Login</span>
          </Button>
            </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref, computed, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";
import {createToast, validationAuthEms} from "../functions/utils";
import {minLength, maxLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {
  emailKeypress,
  validationRegExEmail,
  validationRegExPass,
} from "../functions/utils";

export default {
  name: "Auth",
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    const errorMsg = computed(() => store.getters["auth/authErrorMsg"]);
    const loggedIn = computed(() => store.getters["auth/userIsLogged"]);

    const loading = ref(false);

    const state = reactive({
      email: "",
      password: "",
    });

    const rules = {
      email: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(45),
        valid: validationRegExEmail,
        validApi: validationAuthEms(errorMsg),
      },
      password: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        valid: validationRegExPass,
        validApi: validationAuthEms(errorMsg),
      },
    };

    const v$ = useVuelidate(rules, state);

    const submitted = ref(false);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      if (isFormValid) {
        //FORMING THE VOID (REQUEST)
        const user = {
          email: state.email && state.email,
          password: state.password && state.password,
        };

        store
            .dispatch("auth/login", user)
            .then(
                (res) => {
                  loading.value = true;
                  loggedIn.value && router.push("/dashboard");
                  createToast(
                      toast,
                      "success",
                      res.message ? res.message : "Login successful",
                      "",
                      3000
                  );
                },
                (error) => {
                  loading.value = false;
                  console.error(error);
                }
            )
            .catch(() => {
              loading.value = false;
              createToast(toast, "error", "Error!", `${errorMsg.value}`, 3000);
            });
      }
    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    watch(
        () => state.email,
        (emailValue, prevEmailValue) => {
          if (emailValue !== prevEmailValue && errorMsg.value !== "") {
            store.commit("auth/updateAuthApiErrorMsg", "");
          }
        }
    );

    watch(
        () => state.password,
        (passwordValue, prevPasswordValue) => {
          if (passwordValue !== prevPasswordValue && errorMsg.value !== "") {
            store.commit("auth/updateAuthApiErrorMsg", "");
          }
        }
    );

    return {
      v$,
      loggedIn,
      loading,
      submitted,
      emailKeypress,
      handleSubmit,
      handleInvalid,
    };
  },
};
</script>

<style lang="scss">
</style>
