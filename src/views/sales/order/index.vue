<template>
  <div class="app-container">
    <el-card>
      <OrderSearch @search="handleSearch" @reset="handleReset" />
      
      <div class="table-operations">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增订单
        </el-button>
      </div>

      <OrderTable 
        :loading="tableLoading"
        :data="tableData"
        :total="total"
        :query="queryParams"
        @pagination-change="handlePaginationChange"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
      />
    </el-card>

    <OrderDialog
      v-model="dialogVisible"
      :type="dialogType"
      :data="currentOrder"
      @success="handleDialogSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import OrderSearch from './components/OrderSearch.vue'
import OrderTable from './components/OrderTable.vue'
import OrderDialog from './components/OrderDialog.vue'
import { useOrderStore } from '@/stores/order'
import type { OrderQuery, Order } from '@/types/order'

const orderStore = useOrderStore()

// 表格数据相关
const tableLoading = ref(false)
const tableData = ref<Order[]>([])
const total = ref(0)
const queryParams = ref<OrderQuery>({
  pageNum: 1,
  pageSize: 10
})

// 弹窗相关
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit' | 'view'>('add')
const currentOrder = ref<Order | null>(null)

// 查询处理
const handleSearch = async (params: OrderQuery) => {
  queryParams.value = { ...queryParams.value, ...params }
  await loadTableData()
}

// 重置处理
const handleReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10
  }
  loadTableData()
}

// 加载表格数据
const loadTableData = async () => {
  try {
    tableLoading.value = true
    const { data, total: totalCount } = await orderStore.getOrders(queryParams.value)
    tableData.value = data
    total.value = totalCount
  } catch (error) {
    ElMessage.error('获取订单列表失败')
  } finally {
    tableLoading.value = false
  }
}

// 分页变化处理
const handlePaginationChange = ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => {
  queryParams.value.pageNum = pageNum
  queryParams.value.pageSize = pageSize
  loadTableData()
}

// 新增订单
const handleAdd = () => {
  dialogType.value = 'add'
  currentOrder.value = null
  dialogVisible.value = true
}

// 编辑订单
const handleEdit = (row: Order) => {
  dialogType.value = 'edit'
  currentOrder.value = { ...row }
  dialogVisible.value = true
}

// 查看订单
const handleView = (row: Order) => {
  dialogType.value = 'view'
  currentOrder.value = { ...row }
  dialogVisible.value = true
}

// 删除订单
const handleDelete = async (row: Order) => {
  try {
    await orderStore.deleteOrder(row.id)
    ElMessage.success('删除成功')
    loadTableData()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 弹窗操作成功回调
const handleDialogSuccess = () => {
  dialogVisible.value = false
  loadTableData()
}

// 初始加载
loadTableData()
</script>

<style scoped>
.table-operations {
  margin: 16px 0;
}
</style>