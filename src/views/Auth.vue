<template>
  <div
    class="
      p-grid p-jc-center p-ai-center
      vertical-container vertical-container-auth
      p-p-2
    "
  >
    <div class="box" v-if="loading">
      <div class="p-grid p-fluid p-jc-center p-ai-center p-login-box">
        <div class="p-col-10 p-md-10">
          <ProgressSpinner />
        </div>
      </div>
    </div>

    <div class="box" v-if="!loading">
      <form
        @submit.prevent="handleSubmit(!v$.$invalid)"
        @invalid.capture.prevent="handleInvalid()"
      >
        <div class="p-grid p-fluid p-jc-center p-ai-center p-login-box">
          <div class="p-col-10 p-md-10">
            <div class="p-text-center p-text-uppercase p-text-bold">
              <h1 class="p-text-OSC"><font-awesome-icon  :icon="['fas', 'user-cog']" /> EMS</h1>
            </div>
          </div>

          <div class="p-col-10 p-md-10 p-p-3">
            <span
              class="p-label p-col-10 p-md-10"
              :class="{ 'p-error': v$.email.$invalid && submitted }"
              >Email</span
            >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </span>
              <InputText
                v-model="v$.email.$model"
                minLength="3"
                maxLength="45"
                required
                placeholder="Type email@company.com"
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

          <div class="p-col-10 p-md-10 p-p-3">
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
                title="Password is required and must be 10 characters long, &#10;with only capital and small letters, number and special character."
              ></Password>
            </div>
            <small v-if="v$.password.$invalid && submitted" class="p-error">
              Password is required and must be 10 characters long, with only
              capital and small letters, number and special character.
            </small>
          </div>

          <div class="p-col-10 p-md-10">
            <div class="p-col-12">
              <Button type="submit" class="p-d-flex p-jc-center p-ai-center">
                <font-awesome-icon
                  class="p-mr-2"
                  :icon="['fas', 'sign-in-alt']"
                />
                <span class="p-ml-2 p-text-bold">Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { createToast, validationAuthEmc } from "../functions/utils";
import { minLength, maxLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
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
        validApi: validationAuthEmc(errorMsg),
      },
      password: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        // valid: validationRegExPass,
        // validApi: validationAuthEmc(errorMsg),
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
              loggedIn.value ? router.push("/dashboard") : null;
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

    onBeforeMount(() => {
      if (loggedIn.value) {
        router.push("/dashboard");
      }
    });

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
.box {
  background-color: var(--surface-e);
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.p-login-box {
  width: 40vw;
  min-height: 40vh;

  @media only screen and (max-width: 576px) {
    width: 90vw;
  }
   @media only screen and (min-width: 576px) and (max-width: 767px) {
    width: 70vw;
  }

  @media only screen and (min-width: 767px) and (max-width: 1024px) {
    width: 50vw;
  }
}

.p-password {
  width: 100% !important;
}

.vertical-container-auth {
  height: 98vh !important;
}

.p-label {
  font-size: 0.85rem;
  font-style: italic;
  padding: 0.25rem;
  display: flex;
  flex: 1;
  justify-content: flex-start;
}

.p-error-auth {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
