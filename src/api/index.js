/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'https://easy-mock.com/mock/5cdcc45ede625c6ccadfd711/example/page'
const BASE_URL = 'https://easy-mock.com/mock/5cdcc45ede625c6ccadfd711/example'

// 1、分页
export const reqList = (page, pageSize) =>
  ajax(`${BASE_URL}/page`, { page, pageSize })
