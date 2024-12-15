<template>
  <!-- Previous template code remains the same until the handleView function -->
  <el-button
    link
    type="primary"
    @click="handleView(row)"
  >
    审批
  </el-button>
</template>

<script setup lang="ts">
// Previous script code remains the same until the handleView function

const handleView = (row: ProcessItem) => {
  router.push(`/workflow/approval/${row.id}`)
}
</script>