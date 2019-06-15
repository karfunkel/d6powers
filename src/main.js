import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VeeValidate from 'vee-validate'

import _ from 'lodash'

Vue.prototype._ = _

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(VeeValidate)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
