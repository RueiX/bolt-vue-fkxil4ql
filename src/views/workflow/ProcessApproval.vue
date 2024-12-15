<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>流程审批</span>
        </div>
      </template>

      <el-descriptions
        class="margin-top"
        title="流程信息"
        :column="2"
        border
      >
        <el-descriptions-item label="流程标题">{{ processData.title }}</el-descriptions-item>
        <el-descriptions-item label="流程类型">
          <el-tag size="small">{{ getProcessTypeName(processData.processType) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="紧急程度">
          <el-tag :type="getPriorityType(processData.priority)" size="small">
            {{ getPriorityName(processData.priority) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ processData.createTime }}</el-descriptions-item>
        <el-descriptions-item label="流程说明" :span="2">{{ processData.description }}</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">审批记录</el-divider>

      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in processData.activities"
          :key="index"
          :type="getTimelineItemType(activity.status)"
          :timestamp="activity.time"
        >
          <el-card class="timeline-card">
            <template #header>
              <div class="timeline-header">
                <span>{{ activity.nodeName }}</span>
                <el-tag :type="getStatusType(activity.status)" size="small">
                  {{ getStatusName(activity.status) }}
                </el-tag>
              </div>
            </template>
            <div class="timeline-content">
              <p><strong>处理人：</strong>{{ activity.handler }}</p>
              <p><strong>处理意见：</strong>{{ activity.comment }}</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-divider content-position="left">审批操作</el-divider>

      <el-form
        ref="approvalFormRef"
        :model="approvalForm"
        :rules="rules"
        label-width="100px"
        class="approval-form"
      >
        <el-form-item label="审批结果" prop="action">
          <el-radio-group v-model="approvalForm.action">
            <el-radio label="approve">同意</el-radio>
            <el-radio label="reject">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="审批意见" prop="comment">
          <el-input
            v-model="approvalForm.comment"
            type="textarea"
            :rows="4"
            placeholder="请输入审批意见"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitApproval(approvalFormRef)">提交审批</el-button>
          <el-button @click="resetForm(approvalFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface Activity {
  nodeName: string
  handler: string
  status: string
  comment: string
  time: string
}

interface ProcessData {
  id: string
  title: string
  processType: string
  priority: number
  description: string
  createTime: string
  activities: Activity[]
}

interface ApprovalForm {
  action: 'approve' | 'reject'
  comment: string
}

// 模拟流程数据
const processData = reactive<ProcessData>({
  id: '1',
  title: '年假申请',
  processType: 'leave',
  priority: 2,
  description: '申请年假3天，用于家庭旅行。',
  createTime: '2024-03-15 10:00:00',
  activities: [
    {
      nodeName: '发起申请',
      handler: '张三',
      status: 'completed',
      comment: '请审批',
      time: '2024-03-15 10:00:00'
    },
    {
      nodeName: '部门经理审批',
      handler: '李四',
      status: 'completed',
      comment: '同意',
      time: '2024-03-15 11:30:00'
    },
    {
      nodeName: '人事审批',
      handler: '王五',
      status: 'processing',
      comment: '',
      time: '2024-03-15 14:00:00'
    }
  ]
})

const approvalFormRef = ref<FormInstance>()
const approvalForm = reactive<ApprovalForm>({
  action: 'approve',
  comment: ''
})

const rules = reactive<FormRules>({
  action: [
    { required: true, message: '请选择审批结果', trigger: 'change' }
  ],
  comment: [
    { required: true, message: '请输入审批意见', trigger: 'blur' },
    { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
  ]
})

const getProcessTypeName = (type: string) => {
  const map: Record<string, string> = {
    leave: '请假申请',
    expense: '报销申请',
    purchase: '采购申请'
  }
  return map[type] || type
}

const getPriorityName = (priority: number) => {
  const map: Record<number, string> = {
    1: '普通',
    2: '紧急',
    3: '特急'
  }
  return map[priority] || '普通'
}

const getPriorityType = (priority: number) => {
  const map: Record<number, string> = {
    1: '',
    2: 'warning',
    3: 'danger'
  }
  return map[priority] || ''
}

const getStatusName = (status: string) => {
  const map: Record<string, string> = {
    draft: '草稿',
    processing: '处理中',
    completed: '已完成',
    rejected: '已拒绝'
  }
  return map[status] || status
}

const getStatusType = (status: string) => {
  const map: Record<string, string> = {
    draft: 'info',
    processing: 'warning',
    completed: 'success',
    rejected: 'danger'
  }
  return map[status] || 'info'
}

const getTimelineItemType = (status: string) => {
  const map: Record<string, 'primary' | 'success' | 'warning' | 'danger'> = {
    draft: 'primary',
    processing: 'warning',
    completed: 'success',
    rejected: 'danger'
  }
  return map[status] || 'primary'
}

const submitApproval = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('审批提交成功')
      console.log('approval data:', approvalForm)
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

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.timeline-card {
  margin-bottom: 10px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-content {
  font-size: 14px;
  color: #666;
}

.timeline-content p {
  margin: 5px 0;
}

.approval-form {
  max-width: 600px;
  margin: 20px auto;
}

:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}

.margin-top {
  margin-top: 20px;
}
</style>