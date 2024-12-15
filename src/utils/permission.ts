import store from '@/store'

/**
 * 字符权限校验
 * @param value 权限值数组
 */
export function checkPermission(value: string[]): boolean {
  if (!Array.isArray(value) || value.length === 0) {
    console.error(`需要权限! 例如: checkPermission(['system:user:add','system:user:edit'])`)
    return false
  }

  const permissions = store.getters?.permissions
  const ALL_PERMISSION = '*'

  return permissions.some(permission => 
    ALL_PERMISSION === permission || value.includes(permission)
  )
}

/**
 * 角色权限校验
 * @param value 角色值数组
 */
export function checkRole(value: string[]): boolean {
  if (!Array.isArray(value) || value.length === 0) {
    console.error(`需要角色! 例如: checkRole(['admin','editor'])`)
    return false
  }

  const roles = store.getters?.roles
  const SUPER_ADMIN = 'admin'

  return roles.some(role => 
    SUPER_ADMIN === role || value.includes(role)
  )
}