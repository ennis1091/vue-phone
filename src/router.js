import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home'
import about from './views/about/about'
import person from './views/person/person'
import star from './views/star/star'
import money from './base/money/money'
import listMore from './base/list_more/list_more'
import management from './components/management/management'
import addProduct from './components/add_product/add_product'
import Order from './components/order/order'
import nEquipment from './components/n_equipment/n_equipment'
import fault from './components/fault/fault'
import faultTypes from './components/fault_types/fault_types'
import faultDetails from './components/fault_details/fault_details'
import equipmentTransfer from './components/equipment_transfer/equipment_transfer'
import equipmentValidation from './components/equipment_validation/equipment_validation'
import moreCredit from './components/more_credit/more_credit'
import bill from './components/bill/bill'
import merge from './components/merge/merge'
import settlement from './components/settlement/settlement'
import verifyphone from './components/verify_phone/verify_phone'
import information from './components/information/information'
import changetel from './components/change_phone/change_phone'
import notification from './components/system_notification/system_notification'
import renewalCenter from './components/renewal_center/renewal_center'
import viewDetails from './components/view_details/view_details'
import turnoverReport from './components/turnover_report/turnover_report'
import orderList from './components/order_list/order_list'
import earnings from './components/earnings_report/earnings_report'
import earningsList from './components/earnings_list/earnings_list'
import map from './components/map/map'
import details from './components/device_details/device_details'
import norder from './components/equipment_orders/equipment_orders'
import division from './components/equipment_division/equipment_division'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '商户中心'
      },
      children: [
        {
          path: 'management',
          name: 'management',
          component: management,
          meta: {
            title: '产品管理'
          },
          children: [
            {
              path: 'addProduct',
              name: 'addProduct',
              component: addProduct,
              meta: {
                title: '添加产品'
              }
            }
          ]
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {
            title: '我的订单'
          }
        },
        {
          path: 'turnover',
          name: 'turnover',
          component: turnoverReport,
          meta: {
            title: '营业额报表'
          },
          children: [
            {
              path: 'orderlist',
              name: 'orderlist',
              component: orderList,
              meta: {
                title: '订单信息'
              }
            }
          ]
        },
        {
          path: 'earnings',
          name: 'earnings',
          component: earnings,
          meta: {
            title: '收益报表'
          },
          children: [
            {
              path: 'earningslist',
              name: 'earningslist',
              component: earningsList,
              meta: {
                title: '订单信息'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '设备管理'
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: about,
      children: [
        {
          path: 'equipment',
          name: 'equipment',
          component: nEquipment,
          meta: {
            title: '设备管理'
          },
          children: [
            {
              path: 'map',
              name: 'map',
              component: map,
              meta: {
                title: '查看地图'
              }
            },
            {
              path: 'details',
              name: 'details',
              component: details,
              meta: {
                title: '设备详情'
              },
              children: [
                {
                  path: 'norder',
                  name: 'norder',
                  component: norder,
                  meta: {
                    title: '设备订单'
                  }
                },
                {
                  path: 'division',
                  name: 'division',
                  component: division,
                  meta: {
                    title: '设备分成'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'fault',
          name: 'fault',
          component: fault,
          meta: {
            title: '故障警告'
          },
          children: [
            {
              path: 'types/:type',
              name: 'types', //命名路由这种方式传递的参数，如果在目标页面刷新是会出错,但是/:id动态地址不会  this.$router.push({ name: 'news', params: { userId: 123 }})
              component: faultTypes,
              meta: {
                title: ''
              },
              children: [
                {
                  path: 'details',
                  name: 'details',
                  component: faultDetails,
                  meta: {
                    title: '故障详情'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'transfer',
          name: 'transfer',
          component: equipmentTransfer,
          meta: {
            title: '设备转让'
          },
          children: [
            {
              path: 'validation',
              name: 'validation',
              component: equipmentValidation,
              meta: {
                title: '转让设备'
              }
            }
          ]
        }
      ]
      // component: () =>
      //   import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/person',
      name: 'person',
      meta: {
        title: '个人中心'
      },
      component: person,
      children: [
        {
          path: 'information',
          name: 'information',
          meta: {
            title: '收款账户信息'
          },
          component: information,
          children: [
            {
              path: 'settlement',
              name: 'settlement',
              meta: {
                title: '结算方式'
              },
              component: settlement
            },
            {
              path: 'verifyphone',
              name: 'verifyphone',
              meta: {
                title: '验证手机号'
              },
              component: verifyphone
            }
          ]
        },
        {
          path: 'changetel',
          name: 'changetel',
          meta: {
            title: '更改手机号'
          },
          component: changetel
        },
        {
          path: 'notification',
          name: 'notification',
          component: notification,
          meta: {
            title: '系统通知'
          }
        },
        {
          path: 'renewalCenter',
          name: 'renewalCenter',
          component: renewalCenter,
          meta: {
            title: '续费中心'
          },
          children: [
            {
              path: 'viewDetails',
              name: 'viewDetails',
              component: viewDetails,
              meta: {
                title: '查看明细'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/star',
      name: 'star',
      meta: {
        title: '收款管理'
      },
      children: [
        {
          path: 'more',
          name: 'more',
          component: moreCredit,
          meta: {
            title: '我的账单'
          },
          children: [
            {
              path: 'bill',
              name: 'bill',
              meta: {
                title: '账单详情'
              },
              children: [
                {
                  path: 'merge',
                  name: 'merge',
                  meta: {
                    title: '合并订单转账'
                  },
                  component: merge
                }
              ],
              component: bill
            }
          ]
        },
        {
          path: 'money',
          meta: {
            title: '钱包'
          },
          component: money
        },
        {
          path: 'list',
          meta: {
            title: '收益'
          },
          component: listMore
        }
      ],
      component: star
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
