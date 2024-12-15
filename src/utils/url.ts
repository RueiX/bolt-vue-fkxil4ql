/**
 * URL参数转对象
 * @param url URL字符串
 */
export function parseUrlParams(url: string): Record<string, string> {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * 获取URL参数值
 * @param name 参数名称
 */
export function getUrlParameter(name: string): string | null {
  const result = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)
  if (!result) return null
  return decodeURIComponent(result[1].replace(/\+/g, '%20'))
}