import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Tabs,
  TabPane,
  Col,
  Row,
  Radio,
  Link,
  Image,
  MessageBox,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Pagination,
  Loading,
  Dialog,
  Switch,
  Select,
  Option,
  DatePicker,
  TimeSelect
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Link)
Vue.use(Image)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
