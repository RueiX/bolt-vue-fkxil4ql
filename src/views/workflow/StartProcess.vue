<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>启动工作流程</span>
        </div>
      </template>
      
      <el-form 
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="process-form"
      >
        <el-divider content-position="left">流程基本信息</el-divider>
        
        <el-form-item label="流程标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入流程标题"/>
        </el-form-item>
        
        <el-form-item label="流程类型" prop="processType">
          <el-select v-model="formData.processType" placeholder="请选择流程类型" class="w-full">
            <el-option label="请假申请" value="leave" />
            <el-option label="报销申请" value="expense" />
            <el-option label="采购申请" value="purchase" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="紧急程度" prop="priority">
          <el-radio-group v-model="formData.priority">
            <el-radio :label="1">普通</el-radio>
            <el-radio :label="2">紧急</el-radio>
            <el-radio :label="3">特急</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="流程说明" prop="description">
          <el-input 
            v-model="formData.description"
            type="textarea"
            rows="4"
            placeholder="请输入流程说明"
          />
        </el-form-item>

        <el-divider content-position="left">部门审批信息</el-divider>
        
        <el-form-item label="审批部门" prop="department">
          <el-cascader
            v-model="formData.department"
            :options="departmentOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择审批部门"
            clearable
          />
        </el-form-item>
        
        <el-form-item label="审批人" prop="approver">
          <el-select
            v-model="formData.approver"
            placeholder="请选择审批人"
            class="w-full"
            filterable
          >
            <el-option
              v-for="item in approverOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="抄送人" prop="ccList">
          <el-select
            v-model="formData.ccList"
            multiple
            filterable
            placeholder="请选择抄送人"
            class="w-full"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">提交流程</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface FormData {
  title: string
  processType: string
  priority: number
  description: string
  department: string[]
  approver: string
  ccList: string[]
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  title: '',
  processType: '',
  priority: 1,
  description: '',
  department: [],
  approver: '',
  ccList: []
})

const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入流程标题', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
  ],
  processType: [
    { required: true, message: '请选择流程类型', trigger: 'change' }
  ],
  priority: [
    { required: true, message: '请选择紧急程度', trigger: 'change' }
  ],
  department: [
    { required: true, message: '请选择审批部门', trigger: 'change' }
  ],
  approver: [
    { required: true, message: '请选择审批人', trigger: 'change' }
  ]
})

// 模拟部门数据
const departmentOptions = [
  {
    value: 'group1',
    label: '集团总部',
    children: [
      {
        value: 'dept1',
        label: '人力资源部'
      },
      {
        value: 'dept2',
        label: '财务部'
      }
    ]
  },
  {
    value: 'group2',
    label: '研发中心',
    children: [
      {
        value: 'dept3',
        label: '开发部'
      },
      {
        value: 'dept4',
        label: '测试部'
      }
    ]
  }
]

// 模拟审批人数据
const approverOptions = [
  { value: 'user1', label: '张三' },
  { value: 'user2', label: '李四' },
  { value: 'user3', label: '王五' }
]

// 模拟用户数据（用于抄送人选择）
const userOptions = [
  { value: 'user1', label: '张三' },
  { value: 'user2', label: '李四' },
  { value: 'user3', label: '王五' },
  { value: 'user4', label: '赵六' },
  { value: 'user5', label: '钱七' }
]

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('提交成功')
      console.log('submit data:', formData)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.process-form {
  max-width: 800px;
  margin: 0 auto;
}

.w-full {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}
</style>