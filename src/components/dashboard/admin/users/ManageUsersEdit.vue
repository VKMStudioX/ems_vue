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
          navTitle3="Edit User"
          navLink2="/manage-users"
          :navLink3="`${actualPath}?id=${id}`"
      />
      <div class="main__container">
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
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import { createToast } from "@/functions/utils";
import UserForm from "@/components/forms/UserForm";
import Header from "@/components/commons/Header";

export default {
  name: "ManageUsersEdit",
  components: { UserForm, Header },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;
    const actualPath = computed(() => {
      return route.path;
    });

    const loading = ref(true);
    onMounted(async () => {
      await store.dispatch("admin/getUserById", id).then(
        () => {
          loading.value = false;
        },
        (error) => console.error(error)
      );
    });

    const errorMsg = computed(() => store.getters["admin/apiErrorMsg"]);

    // USERDATA & FORM VALIDATION
    const isPassword = ref(false);
    const userState = reactive({});
    const handleChangeState = ($event) => {
      userState.target = $event;
      isPassword.value = userState.target.password !== "";
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
                email: userState && userState.target.email,
                first_name: userState && userState.target.firstName,
                last_name: userState && userState.target.lastName,
                is_admin: userState && userState.target.isAdmin === true ? 1 : 0,
              ...(isPassword.value && {
                password: userState && userState.target.password,
              })
            }

           store
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
      loading, id,
      userState,
      handleChangeState,

      validate,
      handleChangeV$,

      submitted,
      handleSubmit,

      handleInvalid,

      actualPath
    };
  },
};
</script>

<style lang="scss"></style>
