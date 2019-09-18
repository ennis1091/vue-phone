export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val) //设置属性值
  } else {
    return el.getAttribute(name) //获取属性值
  }
}
