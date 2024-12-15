import { parseTime as parseTimeUtil } from './time'

/**
 * 日期格式化
 * @param time 时间
 * @param pattern 格式模式
 * @returns 格式化后的时间字符串
 */
export function formatDate(time: string | number | Date, pattern?: string): string | null {
  return parseTimeUtil(time, pattern)
}

/**
 * 显示时间格式化
 * 显示为：刚刚、x分钟前，x小时前、1天前、xx年xx月xx日 xx时xx分
 * @param time 时间戳
 * @param option 选项
 */
export function formatRelativeTime(time: number | string, option?: string): string {
  if (('' + time).length === 10) {
    time = parseInt(time as string) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  if (option) {
    return parseTimeUtil(time, option)
  }
  
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}