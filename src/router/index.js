import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GenerateTemplate from '@/components/template/GenerateTemplate'
import SpringBoot from '@/components/template/SpringBoot'
import Spring4 from '@/components/template/Spring4'
import WhiteListAdd from '@/components/module/WhiteListAdd'
import WhiteListList from '@/components/module/WhiteListList'
import Endorsement from '@/components/cart/Endorsement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/tpl',
      name: 'GenerateTemplate',
      component: GenerateTemplate,
      children: [{
        name: 'springboot',
        path: 'springboot',
        component: SpringBoot
      }, {
        name: 'spring4',
        path: 'spring4',
        component: Spring4
      }]
    },
    {
      path: '/',
      component: GenerateTemplate,
      children: [{
        path: '',
        name: 'HelloWorld',
        component: HelloWorld
      }]
    },
    {
      path: '/whitelist',
      name: 'whitelist',
      component: GenerateTemplate,
      children: [{
        name: 'addwhitelist',
        path: 'add',
        component: WhiteListAdd
      }, {
        name: 'listWhitelist',
        path: 'list',
        component: WhiteListList
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: GenerateTemplate,
      children: [
        {
          name: 'endorsement',
          path: 'endorsement',
          component: Endorsement
        }
      ]
    }
  ]
})
