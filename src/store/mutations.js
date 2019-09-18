/*
直接更新state的多个方法的对象
 */
import { RECEIVE_LIST, RESET_LIST } from './mutation-types'

export default {
  [RECEIVE_LIST](state, { list }) {
    state.listView = state.listView.concat(list)
  },
  [RESET_LIST](state) {
    state.listView = []
  }
  // ,
  // [RESET_INDEX](state, i) {
  //   localStorage.setItem('index', i)
  //   state.zIndex = i
  // }
}
