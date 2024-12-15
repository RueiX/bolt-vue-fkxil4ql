<template>
  <el-form
    ref="formRef"
    :model="formData"
    label-width="100px"
    class="search-form"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="客户编号">
          <el-input
            v-model="formData.customerId"
            placeholder="请输入客户编号"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="生产计划">
          <el-input
            v-model="formData.productionPlan"
            placeholder="请输入生产计划编号"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="产品编号">
          <el-input
            v-model="formData.productId"
            placeholder="请输入产品编号"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="销售部门">
          <el-select
            v-model="formData.departmentId"
            placeholder="请选择销售部门"
            clearable
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
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="销售人员">
          <el-select
            v-model="formData.salesPersonId"
            placeholder="请选择销售人员"
            clearable
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
      <el-col :span="6">
        <el-form-item label="签订日期">
          <el-date-picker
            v-model="formData.signDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-full"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="交货日期">
          <el-date-picker
            v-model="formData.deliveryDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-full"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="订单状态">
          <el-select
            v-model="formData.status"
            placeholder="请选择订单状态"
            clearable
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

    <el-row>
      <el-col :span="24" class="text-right">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useOrderOptions } from '../hooks/useOrderOptions'

const emit = defineEmits(['search', 'reset'])
const formRef = ref<FormInstance>()

const { departmentOptions, salesPersonOptions, orderStatusOptions } = useOrderOptions()

const formData = reactive({
  customerId: '',
  productionPlan: '',
  productId: '',
  departmentId: '',
  salesPersonId: '',
  signDateRange: [],
  deliveryDateRange: [],
  status: ''
})

const handleSearch = () => {
  const params = {
    ...formData,
    signDateStart: formData.signDateRange?.[0],
    signDateEnd: formData.signDateRange?.[1],
    deliveryDateStart: formData.deliveryDateRange?.[0],
    deliveryDateEnd: formData.deliveryDateRange?.[1]
  }
  emit('search', params)
}

const handleReset = () => {
  formRef.value?.resetFields()
  emit('reset')
}
</script>

<style scoped>
.search-form {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.w-full {
  width: 100%;
}

.text-right {
  text-align: right;
  padding: 0 20px;
}
</style>