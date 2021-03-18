<template>
  <div class="login_container">
    <!-- 盒子 -->
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="avatat">
      </div>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/regist') {
        this.transitionName = 'registIn'
      }
      if (to.path === '/forget') {
        this.transitionName = 'forgetIn'
      }
      if (to.path === '/') {
        if (from.path === '/regist') {
          this.transitionName = 'registOut'
        }
        if (from.path === '/forget') {
          this.transitionName = 'forgetOut'
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.registIn-enter-active {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
}

.registIn-leave-active {
  animation-name: zoomOut;
  animation-duration: 0.5s;
}

.registOut-enter-active {
  animation-name: zoomIn;
  animation-duration: 0.5s;
}

.registOut-leave-active {
  animation-name: fadeOutRight;
  animation-duration: 0.5s;
}

.forgetIn-enter-active {
  animation-name: fadeInLeft;
  animation-duration: 0.5s;
}

.forgetIn-leave-active {
  animation-name: zoomOut;
  animation-duration: 0.5s;
}

.forgetOut-enter-active {
  animation-name: zoomIn;
  animation-duration: 0.5s;
}

.forgetOut-leave-active {
  animation-name: fadeOutLeft;
  animation-duration: 0.5s;
}

</style>
