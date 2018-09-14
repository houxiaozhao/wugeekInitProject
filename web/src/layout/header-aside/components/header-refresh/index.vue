<template>
  <el-tooltip effect="dark" content="刷新数据" placement="bottom">
    <el-button class="d2-mr btn-text can-hover" type="text" @click="refresh">
      <d2-icon name="refresh" />
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  computed: {},
  methods: {
    refresh() {
      this.$message.success('刷新');
    }
  }
};
</script>
