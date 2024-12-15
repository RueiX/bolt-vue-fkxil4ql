<template>
  <el-dialog
    :title="dialogTitle"
    :model-value="modelValue"
    @update:model-value="handleUpdateVisible"
    width="800px"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      :disabled="type === 'view'"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户编号" prop="customerId">
            <el-select
              v-model="formData.customerId"
              placeholder="请选择客户"
              filterable
              remote
              :remote-method="handleCustomerSearch"
              :loading="customerLoading"
              class="w-full"
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品编号" prop="productId">
            <el-select
              v-model="formData.productId"
              placeholder="请选择产品"
              filterable
              remote
              :remote-method="handleProductSearch"
              :loading="productLoading"
              class="w-full"
            >
              <el-option
                v-for="item in productOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="销售部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择销售部门"
              class="w-full"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售人员" prop="salesPersonId">
            <el-select
              v-model="formData.salesPersonId"
              placeholder="请选择销售人员"
              class="w-full"
            >
              <el-option
                v-for="item in salesPersonOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="签订日期" prop="signDate">
            <el-date-picker
              v-model="formData.signDate"
              type="date"
              placeholder="请选择签订日期"
              class="w-full"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交货日期" prop="deliveryDate">
            <el-date-picker
              v-model="formData.deliveryDate"
              type="date"
              placeholder="请选择交货日期"
              class="w-full"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单金额" prop="amount">
            <el-input-number
              v-model="formData.amount"
              :precision="2"
              :step="100"
              :min="0"
              class="w-full"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态" prop="status">
            <el-select
              v-model="formData.status"
              placeholder="请选择订单状态"
              class="w-full"
            >
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          rows="3"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          v-if="type !== 'view'"
          type="primary"
          :loading="submitLoading"
          @click="handleSubmit"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useOrderOptions } from '../hooks/useOrderOptions'
import { useOrderStore } from '@/stores/order'
import type { Order } from '@/types/order'

const props = defineProps<{
  modelValue: boolean
  type: 'add' | 'edit' | 'view'
  data?: Order | null
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const orderStore = useOrderStore()
const { departmentOptions, salesPersonOptions, orderStatusOptions } = useOrderOptions()

// 表单相关
const formRef = ref<FormInstance>()
const submitLoading = ref(false)
const formData = reactive<Partial<Order>>({
  customerId: '',
  productId: '',
  departmentId: '',
  salesPersonId: '',
  signDate: '',
  deliveryDate: '',
  amount: 0,
  status: '',
  remark: ''
})

// 远程搜索相关
const customerLoading = ref(false)
const productLoading = ref(false)
const customerOptions = ref([])
const productOptions = ref([])

// 表单校验规则
const rules = reactive<FormRules>({
  customerId: [{ required: true, message: '请选择客户', trigger: 'change' }],
  productId: [{ required: true, message: '请选择产品', trigger: 'change' }],
  departmentId: [{ required: true, message: '请选择销售部门', trigger: 'change' }],
  salesPersonId: [{ required: true, message: '请选择销售人员', trigger: 'change' }],
  signDate: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
  deliveryDate: [{ required: true, message: '请选择交货日期', trigger: 'change' }],
  amount: [{ required: true, message: '请输入订单金额', trigger: 'blur' }],
  status: [{ required: true, message: '请选择订单状态', trigger: 'change' }]
})

// 计算属性
const dialogTitle = computed(() => {
  const titleMap = {
    add: '新增订单',
    edit: '编辑订单',
    view: '查看订单'
  }
  return titleMap[props.type]
})

// 监听数据变化
watch(() => props.data, (newData) => {
  if (newData) {
    Object.assign(formData, newData)
  } else {
    formRef.value?.resetFields()
  }
}, { deep: true })

// 远程搜索方法
const handleCustomerSearch = async (query: string) => {
  if (query) {
    customerLoading.value = true
    try {
      const data = await orderStore.searchCustomers(query)
      customerOptions.value = data
    } finally {
      customerLoading.value = false
    }
  }
}

const handleProductSearch = async (query: string) => {
  if (query) {
    productLoading.value = true
    try {
      const data = await orderStore.searchProducts(query)
      productOptions.value = data
    } finally {
      productLoading.value = false
    }
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    submitLoading.value = true
    
    if (props.type === 'add') {
      await orderStore.createOrder(formData)
      ElMessage.success('创建成功')
    } else {
      await orderStore.updateOrder(formData)
      ElMessage.success('更新成功')
    }
    
    emit('success')
  } catch (error) {
    console.error(error)
    ElMessage.error('操作失败')
  } finally {
    submitLoading.value = false
  }
}

// 取消操作
const handleCancel = () => {
  emit('update:modelValue', false)
}

// 更新弹窗显示状态
const handleUpdateVisible = (val: boolean) => {
  emit('update:modelValue', val)
}
</script>

<style scoped>
.w-full {
  width: 100%;
}

.dialog-footer {
  padding: 20px 0 0;
}
</style>