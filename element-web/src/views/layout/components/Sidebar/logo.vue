<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" key="0" class="is-text logo_title is-bold">
        <!-- <span v-if="isCollapse" key="0" class="logo_title is-bold is-img"> -->
        <!-- <template v-if="type">
          <img :src="website.logo" width="40" height="40">
        </template>-->
        <template>W</template>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span key="1" class="logo_title is-bold">管理系统</span>
        <!-- <span key="2" class="logo_subtitle">内容管理</span> -->
      </template>
    </transition-group>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: 'Logo',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 230px;
  height: 64px;
  line-height: 64px;
  background: #304156;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 5px 0 0;
  color: #42b983;
  font-size: 20px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  // left: 20px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 16px;
  padding-top: 5px;
}
</style>
