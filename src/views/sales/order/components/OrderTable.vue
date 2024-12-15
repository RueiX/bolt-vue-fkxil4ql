<template>
  <div class="order-table">
    <el-table
      v-loading="loading"
      :data="data"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="订单编号" width="120" />
      <el-table-column prop="customerId" label="客户编号" width="120" />
      <el-table-column prop="customerName" label="客户名称" width="150" />
      <el-table-column prop="productionPlan" label="生产计划" width="120" />
      <el-table-column prop="productId" label="产品编号" width="120" />
      <el-table-column prop="productName" label="产品名称" width="150" />
      <el-table-column prop="departmentName" label="销售部门" width="120" />
      <el-table-column prop="salesPersonName" label="销售人员" width="120" />
      <el-table-column prop="signDate" label="签订日期" width="120" />
      <el-table-column prop="deliveryDate" label="交货日期" width="120" />
      <el-table-column prop="amount" label="订单金额" width="120">
        <template #default="{ row }">
          {{ formatCurrency(row.amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="订单状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getOrderStatusType(row.status)">
            {{ getOrderStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleView(row)">查看</el-button>
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            title="确认删除该订单吗？"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatCurrency } from '@/utils/format'
import { useOrderStatus } from '../hooks/useOrderStatus'
import type { Order, OrderQuery } from '@/types/order'

const props = defineProps<{
  loading: boolean
  data: Order[]
  total: number
  query: OrderQuery
}>()

const emit = defineEmits(['pagination-change', 'edit', 'delete', 'view'])

const { getOrderStatusLabel, getOrderStatusType } = useOrderStatus()

// 分页相关
const currentPage = ref(props.query.pageNum)
const pageSize = ref(props.query.pageSize)

watch(() => props.query, (newQuery) => {
  currentPage.value = newQuery.pageNum
  pageSize.value = newQuery.pageSize
}, { deep: true })

const handleSizeChange = (val: number) => {
  emit('pagination-change', {
    pageNum: currentPage.value,
    pageSize: val
  })
}

const handleCurrentChange = (val: number) => {
  emit('pagination-change', {
    pageNum: val,
    pageSize: pageSize.value
  })
}

// 操作相关
const handleView = (row: Order) => {
  emit('view', row)
}

const handleEdit = (row: Order) => {
  emit('edit', row)
}

const handleDelete = (row: Order) => {
  emit('delete', row)
}
</script>

<style scoped>
.order-table {
  margin-top: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>