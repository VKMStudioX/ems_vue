import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

//PrimeVue
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import ToastService from "primevue/toastservice";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import BlockUI from "primevue/blockui";
import Dialog from "primevue/dialog";
import Tooltip from "primevue/tooltip";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmPopup from "primevue/confirmpopup";
import OverlayPanel from "primevue/overlaypanel";
import Textarea from 'primevue/textarea';
import Sidebar from 'primevue/sidebar';

// Main components & layouts
import AppLayout from "@/layouts/AppLayout";
import LoginLayout from "@/layouts/LoginLayout";
import Loader from "@/components/commons/Loader";
import SvgIcon from "@/components/commons/SvgIcon";

// PrimeVue CSS
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Main CSS
import "@/assets/sass/main.scss";

createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .use(Vuelidate)
    .use(ConfirmationService)
    .directive("tooltip", Tooltip)
    .component('AppLayout', AppLayout)
    .component('LoginLayout',LoginLayout)
    .component("InputText", InputText)
    .component("Password", Password)
    .component("Button", Button)
    .component("ProgressSpinner", ProgressSpinner)
    .component("Toast", Toast)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("ColumnGroup", ColumnGroup)
    .component("Calendar", Calendar)
    .component("Dropdown", Dropdown)
    .component("MultiSelect", MultiSelect)
    .component("BlockUI", BlockUI)
    .component("Dialog", Dialog)
    .component("ConfirmPopup", ConfirmPopup)
    .component("OverlayPanel", OverlayPanel)
    .component("Textarea", Textarea)
    .component("Loader", Loader)
    .component('SvgIcon',SvgIcon)
    .component('Sidebar',Sidebar)
    .mount("#app");