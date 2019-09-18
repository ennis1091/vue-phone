/*
通过mutation间接更新state的多个方法的对象
 */
// import { RECEIVE_ADDRESS } from './mutation-types'
// import { reqAddress } from '../api'

// export default {
//   // 异步获取地址
//   async getAddress({ commit, state }) {
//     // 发送异步ajax请求
//     const geohash = state.latitude + ',' + state.longitude
//     const result = await reqAddress(geohash)
//     // 提交一个mutation
//     if (result.code === 0) {
//       const address = result.data
//       commit(RECEIVE_ADDRESS, { address })
//     }
//   }
// }

import { RECEIVE_LIST } from './mutation-types'
import { reqList } from '../api'

export default {
  async getList({ commit, state }, payload) {
    const result = await reqList(payload.page, payload.pageSize)
    return new Promise((resolve, reject) => {
      if (result.code === 0) {
        const list = result.data

        setTimeout(() => {
          commit(RECEIVE_LIST, { list })
          resolve(list)
        }, 2000)
      } else {
        const err = result
        reject(err)
      }
    })
  }
}
