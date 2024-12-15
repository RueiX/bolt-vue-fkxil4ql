/**
 * 检查元素是否包含指定类名
 * @param element HTML元素
 * @param className 类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 * 为元素添加类名
 * @param element HTML元素
 * @param className 类名
 */
export function addClass(element: HTMLElement, className: string): void {
  if (!hasClass(element, className)) {
    element.className += ' ' + className
  }
}

/**
 * 移除元素的类名
 * @param element HTML元素
 * @param className 类名
 */
export function removeClass(element: HTMLElement, className: string): void {
  if (hasClass(element, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    element.className = element.className.replace(reg, ' ')
  }
}