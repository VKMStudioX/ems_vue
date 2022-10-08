import {createRouter, createWebHistory} from "vue-router";
import Auth from "@/views/Auth.vue";

const NotFound = () => import("@/components/commons/errors/NotFound.vue");
const Forbidden = () => import("@/components/commons/errors/Forbidden.vue");


const Dashboard = () => import("@/components/dashboard/Dashboard.vue");

const ManageAbsences = () => import("@/components/dashboard/user/ManageAbsences.vue");

const ManageReminders = () => import("@/components/dashboard/admin/reminders/ManageReminders.vue");
const ManageRemindersNew = () => import("@/components/dashboard/admin/reminders/ManageRemindersNew.vue")
const ManageRemindersEdit = () => import("@/components/dashboard/admin/reminders/ManageRemindersEdit.vue")

const ManageHolidays = () => import("@/components/dashboard/admin/holidays/ManageHolidays.vue");

const ManageUsers = () => import("@/components/dashboard/admin/users/ManageUsers.vue");
const ManageUserNew = () => import("@/components/dashboard/admin/users/ManageUsersNew.vue")
const ManageUserEdit = () => import("@/components/dashboard/admin/users/ManageUsersEdit.vue")


const routes = [
    {path: "/:pathMatch(.*)*", component: NotFound, meta: {layout: 'AppLayout'}},
    {path: "/forbidden", name: "forbidden", component: Forbidden, meta: {layout: 'AppLayout', requiresAuth: true}},
    {
        path: "/login",
        alias: "/",
        name: "login",
        component: Auth,
        meta: {
            layout: 'LoginLayout',
            guest: true,
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true
        }
    },
    {
        path: "/manage-absences",
        component: ManageAbsences,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin: false
        }
    },
    {
        path: "/manage-reminders",
        component: ManageReminders,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },
    {
        path: "/new-reminder",
        component: ManageRemindersNew,
        props: false,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },
    {
        path: `/edit-reminder`,
        component: ManageRemindersEdit,
        props: (route) => ({query: route.query.id}),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },

    {
        path: "/manage-holidays",
        component: ManageHolidays,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },

    {
        path: "/manage-users",
        component: ManageUsers,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },
    {
        path: "/new-user",
        component: ManageUserNew,
        props: false,
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    },
    {
        path: `/edit-user`,
        component: ManageUserEdit,
        props: (route) => ({query: route.query.id}),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            is_admin : true
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let userIsAdmin = user && user.user.is_admin

    if (!to.matched.some(record => record.meta.requiresAuth) &&
        !to.matched.some(record => record.meta.is_admin) &&
        to.matched.some(record => record.meta.guest)
    ) {
            next()
    }

    if (to.matched.some(record => record.meta.requiresAuth) &&
        !to.matched.some(record => record.meta.is_admin) &&
        !to.matched.some(record => record.meta.guest)
    ) {
        if (user !== null) {
            next()
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth) &&
        to.matched.some(record => record.meta.is_admin) &&
        !to.matched.some(record => record.meta.guest)
    ) {
        if (user !== null && userIsAdmin == true) {
            next()
        } else {
            next({ name: 'forbidden'})
        }
    }

})

export default router;