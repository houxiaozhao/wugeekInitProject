<template>
  <div class="dashboard-container"/>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      order: { data: [] },
      search: '',
      payStatus: '1',
      currentPage: 1,
      pageSize: 2
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
