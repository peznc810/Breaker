<script lang="ts" setup>
  import { computed } from 'vue'
  import type { Columns, TableProps } from '@/@types/components/table'
  import { thousandsSeparator } from '@/utils/mixin'

  const props = defineProps<TableProps>()

  // 客製化的欄位寬度
  const columnWidth = (column: Columns) => {
    if (!column.width) return
    return `width: ${column.width}px;`
  }
</script>

<template>
  <div class="table">
    <table class="el-table">
      <thead class="el-table__header">
        <tr>
          <!-- 第一列的樣式 -->
          <!-- 序號 -->
          <th v-if="props.type === 'index'" class="el-table__column--index w-20">
            <slot name="index-head" />
          </th>
          <!-- 多選框 -->
          <th v-else-if="props.type === 'checkbox'" class="el-table__column--checkbox w-20">
            <input type="checkbox" />
          </th>
          <!-- 第一列之後的樣式（可自定義） -->
          <slot name="table-head">
            <th
              v-for="column in props.columns"
              :key="column.prop"
              class="el-table__column--sortable"
              :style="columnWidth(column)"
            >
              {{ column.label }}
            </th>
          </slot>
        </tr>
      </thead>
      <tbody class="el-table__body">
        <tr v-for="(row, index) in props.data" :key="row.id" class="el-table__row">
          <!-- 第一列的樣式(可自定義) -->
          <!-- 序號 -->
          <td v-if="props.type === 'index'" class="el-table__cell">
            <slot name="index-column" :row="row" :index="index">
              {{ index + 1 }}
            </slot>
          </td>
          <!-- 多選框 -->
          <td v-else-if="props.type === 'checkbox'" class="el-table__cell">
            <input type="checkbox" />
          </td>

          <!-- 第一列之後的樣式(可自定義) -->
          <td v-for="column in props.columns" :key="column.prop" class="el-table__cell">
            <!-- 例如： title-column -->
            <slot :name="`${column.prop}-column`" :row="row">
              <!-- 千分位 -->
              <template v-if="column.type === 'currency'">
                {{ thousandsSeparator(row[column.prop]) }}
              </template>
              <!-- 預設 -->
              <template v-else>
                {{ row[column.prop] }}
              </template>
            </slot>
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
    min-width: 450px;
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
    padding: 8px 12px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__column--index {
    text-align: center;
  }
</style>
