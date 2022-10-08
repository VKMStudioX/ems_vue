<template>
  <div class="app-layout__wrapper">
      <div v-if="loading">
            <Loader />
        </div>
    <div v-else class="main">
      <Header
          class="main__header"
          title="Users"
          navTitle1="Manage"
          navTitle2="Users"
          navTitle3="New User"
          navLink2="/manage-users"
          navLink3="/new-user"
      />
      <div class="main__container">
    <form
      @submit.prevent="handleSubmit(!validate.$invalid)"
      @invalid.capture.prevent="handleInvalid()"
    >
      <UserForm
        @changedV$="handleChangeV$($event)"
        @changedState="handleChangeState($event)"
        :submitted="submitted"
        :isEdit="false"
      />
    </form>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { createToast } from "@/functions/utils";
import UserForm from "@/components/forms/UserForm";
import Header from "@/components/commons/Header";

export default {
  name: "ManageUsersNew",
  components: { UserForm, Header },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getNewUser").then(
        () => (loading.value = false),
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USERDATA & FORM VALIDATION
    const userState = reactive({});
    const handleChangeState = ($event) => {
      userState.target = $event;
    };

    const validate = ref({});
    const handleChangeV$ = ($event) => {
      validate.value = $event;
    };

    const submitted = ref(false);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      if (isFormValid) {
        //FORMING THE VOID (REQUEST)

        const newUserData = {
              first_name: userState && userState.target.firstName,
              last_name: userState && userState.target.lastName,
              email: userState && userState.target.email,
              is_admin: userState && userState.target.isAdmin === true ? 1 : 0,
              password: userState && userState.target.password,
            };

        store
              .dispatch("admin/registerUser", newUserData)
              .then(
                (res) => {
                  createToast(
                    toast,
                    "success",
                    "Success!",
                    `${res.data.message}`,
                    5000
                  );
                  router.push({
                    path: "/manage-users",
                  });
                },
                (error) => {
                  console.error(error);
                }
              )
              .catch(() =>
                createToast(toast, "error", "Error!", `${errorMsg.value}`, 5000)
              )
      } else {
        createToast(
          toast,
          "error",
          "Error!",
          "Bad user data, read the hints below inputs",
          5000
        );
      }
    };

    const handleInvalid = () => {
      submitted.value = true;
    };

    return {
      userState,
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,

      loading
    };
  },
};
</script>

<style lang="scss"></style>
