<template>
  <div class="loading-screen">
    <div class="loading">
      <div class="img">
        <img src="@/assets/images/PlantLogo.svg" alt="" />
      </div>
      <div class="title"><span>Plants</span> <span>fresher</span></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-screen {
  height: 100vh;
  background-color: $bg_green;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  .loading {
    max-width: 40rem;
    margin: 0 auto;
    text-align: center;
    width: 60%;
    .img {
      transform: scale(0) rotate(-45deg);
      -webkit-transform: scale(0) rotate(-45deg);
      opacity: 0;
      animation: rotate 1s ease-in forwards;
    }
    .title {
      text-transform: capitalize;
      margin-top: 3rem;
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;
      color: #000;
      flex: 1;
      span {
        opacity: 0;
        display: inline-block;
      }
      span:last-child {
        color: #3a7f0d;
        transform: translateX(5rem);
        -webkit-transform: translateX(5rem);
        animation: slideAppear 1s ease-in-out 0.3s forwards;
        -webkit-animation: slideAppear 1s ease-in-out 0.3s forwards;
      }
      span:first-child {
        transform: translateX(-5rem);
        -webkit-transform: translateX(-5rem);
        animation: slideAppear 1s ease-in-out 0.3s forwards;
        -webkit-animation: slideAppear 1s ease-in-out 0.3s forwards;
      }
    }
  }
}
@keyframes rotate {
  to {
    transform: scale(1) rotate(0);
    -webkit-transform: scale(1) rotate(0);
    opacity: 1;
  }
}
@keyframes slideAppear {
  to {
    transform: translateX(0);
    -webkit-transform: translateX(0);
    opacity: 1;
  }
}
@media screen and (min-width: 676px) {
  .loading {
    display: flex;
    align-items: center;
    .title {
      transform: translateX(5rem);
      -webkit-transform: translateX(5rem);
      opacity: 0;
      animation: slideAppear 1s ease-in-out 0.3s forwards;
      -webkit-animation: slideAppear 1s ease-in-out 0.3s forwards;
      span {
        opacity: 1 !important;
        transform: translateX(0) !important;
        -webkit-transform: translateX(0) !important;
        animation: unset !important;
        -webkit-animation: unset !important;
      }
    }
  }
}
</style>
