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
  MessageBox
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
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt