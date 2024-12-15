export interface Order {
  id: string
  customerId: string
  customerName: string
  productId: string
  productName: string
  productionPlan: string
  departmentId: string
  departmentName: string
  salesPersonId: string
  salesPersonName: string
  signDate: string
  deliveryDate: string
  amount: number
  status: string
  remark?: string
  createTime: string
  updateTime: string
}

export interface OrderQuery {
  pageNum: number
  pageSize: number
  customerId?: string
  productionPlan?: string
  productId?: string
  departmentId?: string
  salesPersonId?: string
  signDateStart?: string
  signDateEnd?: string
  deliveryDateStart?: string
  deliveryDateEnd?: string
  status?: string
}