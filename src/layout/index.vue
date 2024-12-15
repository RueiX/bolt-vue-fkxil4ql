<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-sub-menu index="workflow">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>工作流管理</span>
          </template>
          <el-menu-item index="/workflow/list" @click="handleMenuClick('/workflow/list')">
            流程列表
          </el-menu-item>
          <el-menu-item index="/workflow/start" @click="handleMenuClick('/workflow/start')">
            发起流程
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Document } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const handleMenuClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar-container {
  width: 210px;
  background-color: #304156;
  height: 100%;
}

.main-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background-color: #f0f2f5;
}
</style>