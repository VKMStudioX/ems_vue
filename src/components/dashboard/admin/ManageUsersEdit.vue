<template>
  <div>
    <div v-if="loading">
            <Loader />
        </div>
        <div v-else>
    <form
      @submit.prevent="handleSubmit(!validate.$invalid)"
      @invalid.capture.prevent="handleInvalid()"
    >
      <UserForm
        @changedVS="handleChangeV$($event)"
        @changedState="handleChangeState($event)"
        :submitted="submitted"
        :isEdit="true"
      />
    </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import { createToast } from "@/functions/utils";
import UserForm from "@/components/forms/UserForm";

export default {
  name: "ManageUsersEdit",
  components: { UserForm },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getAllUsers", id).then(
        () => {
          store.commit("admin/getUserById", id);
          loading.value = false;
        },
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USER DATA FROM STORE
    const userData = computed(() => store.getters["admin/userData"]);
    const isAdminChanged = ref(false);
    const isEmailChanged = ref(false)
    const isFirstNameChanged = ref(false)
    const isLastNameChanged = ref(false)

    // USERDATA & FORM VALIDATION
    const isPassword = ref(false);
    const userState = reactive({});
    const handleChangeState = ($event) => {
      userState.target = $event;
      isPassword.value = userState.target.password !== "";
      isEmailChanged.value =
        userState.target.email !== userData.value.email;
      isFirstNameChanged.value =
        userState.target.firstName !== userData.value.first_name;
      isLastNameChanged.value =
        userState.target.lastName !== userData.value.last_name;
      isAdminChanged.value =
        userState.target.isAdmin !== userData.value.is_admin;
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

        const editUserData =  {
              id: id && Number(id),
              ...(isEmailChanged.value && {
                email:
                  userState && userState.target.email,
              }),
              ...(isFirstNameChanged.value && {
                first_name:
                  userState && userState.target.firstName,
              }),
              ...(isLastNameChanged.value && {
                last_name:
                  userState && userState.target.lastName,
              }),
              ...(isAdminChanged.value && {
                is_admin:
                  userState && userState.target.isAdmin === true ? 1 : 0,
              }),
              ...(isPassword.value && {
                password: userState && userState.target.password,
              })
            }

        editUserData.hasOwnProperty("email")      ||
        editUserData.hasOwnProperty("first_name") ||
        editUserData.hasOwnProperty("last_name")  ||
        editUserData.hasOwnProperty("is_admin")  ||
        editUserData.hasOwnProperty("password")  
          ? store
              .dispatch("admin/updateUser", editUserData)
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
                    path: "/dashboard/manage-users",
                  });
                },
                (error) => {
                  console.error(error);
                }
              )
              .catch(() =>
                createToast(toast, "error", "Error!", `${errorMsg.value}`, 5000)
              )
          : createToast(
              toast,
              "warn",
              "Warning!",
              "Nothing was changed, user not edited",
              5000
            );
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
      loading, id,
      userState,
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,
    };
  },
};
</script>

<style lang="scss"></style>
