import { ref } from 'vue'

export function useOrderOptions() {
  const departmentOptions = ref([
    { value: 'dept1', label: '华东销售部' },
    { value: 'dept2', label: '华南销售部' },
    { value: 'dept3', label: '华北销售部' }
  ])

  const salesPersonOptions = ref([
    { value: 'sales1', label: '张三' },
    { value: 'sales2', label: '李四' },
    { value: 'sales3', label: '王五' }
  ])

  const orderStatusOptions = ref([
    { value: 'draft', label: '草稿' },
    { value: 'pending', label: '待审核' },
    { value: 'approved', label: '已审核' },
    { value: 'processing', label: '处理中' },
    { value: 'completed', label: '已完成' },
    { value: 'cancelled', label: '已取消' }
  ])

  return {
    departmentOptions,
    salesPersonOptions,
    orderStatusOptions
  }
}