<script lang="ts" setup>
  import type { TableProps } from '@/@types/components/table'

  const props = defineProps<TableProps>()

  // TODO: 擴充表格的使用彈性
  /**
   * @param minWidth: number
   * @param width: number
   * @param fixed: 'left' | 'right'
   * @param prop: string
   */
</script>

<template>
  <div class="table">
    <table class="el-table">
      <thead class="el-table__header">
        <tr>
          <th class="el-table__column--index"></th>
          <th v-for="column in props.columns" :key="column.prop" class="el-table__column--sortable">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="el-table__body">
        <tr v-for="row in props.data" :key="row.id" class="el-table__row">
          <td class="el-table__cell">No {{ row.id }}</td>
          <td v-for="column in props.columns" :key="column.prop" class="el-table__cell">
            {{ row[column.prop] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #606266;
  }

  .el-table {
    width: 100%;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    table-layout: fixed;
  }

  .el-table__header th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__body {
    background-color: #fff;
  }

  .el-table__row {
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__row:hover {
    background-color: #f5f7fa;
  }

  .el-table__cell {
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__column--index {
    width: 80px;
    text-align: center;
  }
</style>
