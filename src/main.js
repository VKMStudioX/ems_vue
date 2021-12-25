import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import VueJsonPretty from "vue-json-pretty";

//PrimeVue
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Password from "primevue/password";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import ToastService from "primevue/toastservice";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import TabMenu from "primevue/tabmenu";
import Menu from "primevue/menu";
import Panel from "primevue/panel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import ToggleButton from "primevue/togglebutton";
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
import Card from 'primevue/card';

import Loader from "@/components/commons/Loader";

// PrimeVue CSS and other css
import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./stylesheets/main.scss";
import "vue-json-pretty/lib/styles.css";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquare, faCheckSquare, faTimesCircle, faGem } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarWeek,
  faCalendarDay,
  faClock,
  faUser,
  faUserLock,
  faUserCheck,
  faUserCog,
  faUserMinus,
  faUserPlus,
  faUserEdit,
  faUserTag,
  faUserShield,
  faList,
  faShip,
  faCalendarTimes,
  faEnvelope,
  faLock,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faLaptopHouse,
  faSync,
  faKey,
  faFileSignature,
  faStopwatch,
  faStickyNote,
  faUserTimes,
  faTimesCircle as faTimesCircleSolid,
  faHouseUser,
  faCog,
  faHeading,
  faFileAlt,
  faMobileAlt,
  faDesktop,
  faDatabase,
  faPhotoVideo,
  faProjectDiagram

} from "@fortawesome/free-solid-svg-icons";
import { faReact, faVuejs, faLaravel, faJava, faPython, faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faHeading,
  faCalendarWeek,
  faCalendarDay,
  faClock,
  faSquare,
  faCheckSquare,
  faUser,
  faUserLock,
  faUserCheck,
  faUserCog,
  faUserMinus,
  faUserPlus,
  faUserEdit,
  faUserTag,
  faUserShield,
  faList,
  faShip,
  faCalendarTimes,
  faEnvelope,
  faLock,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faLaptopHouse,
  faSync,
  faKey,
  faFileSignature,
  faStopwatch,
  faStickyNote,
  faUserTimes,
  faTimesCircleSolid,
  faHouseUser,
  faCog,
  faFileAlt,
  faMobileAlt,
  faDesktop,
  faDatabase,
  faPhotoVideo,
  faProjectDiagram, 
  faGem,
  faReact, faVuejs, faLaravel, faJava, faPython, faApple, faAndroid
);

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .use(Vuelidate)
  .use(ConfirmationService)
  .component("VueJsonPretty", VueJsonPretty)
  .directive("tooltip", Tooltip)
  .component("InputText", InputText)
  .component("InputNumber", InputNumber)
  .component("Password", Password)
  .component("Button", Button)
  .component("Checkbox", Checkbox)
  .component("RadioButton", RadioButton)
  .component("ProgressSpinner", ProgressSpinner)
  .component("Toast", Toast)
  .component("TabMenu", TabMenu)
  .component("Menu", Menu)
  .component("Panel", Panel)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("ColumnGroup", ColumnGroup)
  .component("ToggleButton", ToggleButton)
  .component("Calendar", Calendar)
  .component("Dropdown", Dropdown)
  .component("MultiSelect", MultiSelect)
  .component("BlockUI", BlockUI)
  .component("Dialog", Dialog)
  .component("ConfirmPopup", ConfirmPopup)
  .component("OverlayPanel", OverlayPanel)
  .component("Textarea", Textarea)
  .component("Card", Card)
  .component("Loader", Loader)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");