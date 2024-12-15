export function useOrderStatus() {
  const statusMap = {
    draft: { label: '草稿', type: 'info' },
    pending: { label: '待审核', type: 'warning' },
    approved: { label: '已审核', type: 'success' },
    processing: { label: '处理中', type: 'primary' },
    completed: { label: '已完成', type: 'success' },
    cancelled: { label: '已取消', type: 'danger' }
  }

  const getOrderStatusLabel = (status: string) => {
    return statusMap[status]?.label || status
  }

  const getOrderStatusType = (status: string) => {
    return statusMap[status]?.type || ''
  }

  return {
    getOrderStatusLabel,
    getOrderStatusType
  }
}