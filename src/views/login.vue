<template>
  <div class="login_container">
    <div class="topic">
      <img src="../assets/logo.png" class="animate__animated animate__fadeInUp">
      <div class="topic animate__animated animate__fadeInUp">Change场地预约管理系统</div>
      <div class="second_line animate__animated animate__fadeInUp">
        让场地管理更加快捷与高效
      </div>
    </div>
    <!-- 盒子 -->
    <div class="login_box">
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
  background-image: url(../assets/background.png);
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
}

.topic {
  display: flex;
  position: fixed;
  top: 35%;
  left: 5%;
  width: 80%;

  >img {
    height: 140px;
    position: absolute;
    top: 55px;
    animation-delay: 0.5s;
  }

  .topic {
    font-family: "PingFang SC";
    font-size: 44px;
    color: #fff;
    letter-spacing: 3px;
    position: absolute;
    left: 180px;
    top: 50px;
    animation-delay: 1s;
  }

  .second_line {
    font-family: "Hiragino Sans GB";
    color: #fff;
    font-size: 32px;
    letter-spacing: 8px;
    position: absolute;
    top: 150px;
    left: 180px;
    animation-delay: 1.5s;
  }
}

.login_box {
  width: 450px;
  height: 480px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  right: -150px;
  top: 50%;
  transform: translate(-50%, -50%);
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
