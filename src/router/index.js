import { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";

const Dashboard = () => import("@/views/Dashboard.vue");
const DashboardEvents = () => import("@/components/dashboard/Events.vue");

const UserAbsences = () => import("@/components/dashboard/user/Absences.vue");

const ManageReminders = () => import("@/components/dashboard/admin/reminders/ManageReminders.vue");
const ManageRemindersNew = () => import("@/components/dashboard/admin/reminders/ManageRemindersNew.vue")
const ManageRemindersEdit = () => import("@/components/dashboard/admin/reminders/ManageRemindersEdit.vue")

const ManageHolidays = () => import("@/components/dashboard/admin/ManageHolidays.vue");

const ManageUsers = () => import("@/components/dashboard/admin/users/ManageUsers.vue");
const ManageUserNew = () => import("@/components/dashboard/admin/users/ManageUsersNew.vue")
const ManageUserEdit = () => import("@/components/dashboard/admin/users/ManageUsersEdit.vue")

const ManageProjects = () => import("@/components/dashboard/admin/projects/ManageProjects.vue");
const ManageProjectNew = () => import("@/components/dashboard/admin/projects/ManageProjectsNew.vue")
const ManageProjectEdit = () => import("@/components/dashboard/admin/projects/ManageProjectsEdit.vue")
const ViewProjects = () => import("@/components/dashboard/user/ViewProjects.vue");
const ViewProject = () => import("@/components/dashboard/user/ViewProject.vue");

const routes = [
  { path: "/:pathMatch(.*)*", component: Auth },
  {
    path: "/login",
    alias: "/",
    name: "login",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/",
        component:DashboardEvents,
      },
      {
        path: "/dashboard/absences",
        component: UserAbsences,
      },
      {
        path: "/dashboard/manage-reminders",
        component: ManageReminders,
      },
      {
        path: "/dashboard/new-reminder",
        component: ManageRemindersNew,
        props: false,
      },
      {
        path: `/dashboard/edit-reminder`,
        component: ManageRemindersEdit,
        props: (route) => ({ query: route.query.id }),
      },
       
      {
        path: "/dashboard/manage-holidays",
        component: ManageHolidays,
      },
      
      {
        path: "/dashboard/manage-users",
        component: ManageUsers,
      },
      {
        path: "/dashboard/new-user",
        component: ManageUserNew,
        props: false,
      },
      {
        path: `/dashboard/edit-user`,
        component: ManageUserEdit,
        props: (route) => ({ query: route.query.id }),
      },

      {
        path: "/dashboard/manage-projects",
        component: ManageProjects,
      },
      {
        path: "/dashboard/new-project",
        component: ManageProjectNew,
        props: false,
      },
      {
        path: `/dashboard/edit-project`,
        component: ManageProjectEdit,
        props: (route) => ({ query: route.query.id }),
      },

      {
        path: "/dashboard/view-projects",
        component: ViewProjects,
      },
      {
        path: `/dashboard/view-project`,
        component: ViewProject,
        props: (route) => ({ query: route.query.id }),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if ((to.name !== "login" && !loggedIn) || (to.name === "" && !loggedIn))
    next({ name: "login" });
  else next();
});

export default router;