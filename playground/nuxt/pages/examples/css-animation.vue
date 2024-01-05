<template>
  <div style="display: flex">
    <div class="box-animate" style="background-color: red" />
    <div
      class="box-animate"
      data-motion-id="Box"
      style="background-color: purple"
    />
    <div
      id="c"
      class="box-animate"
      style="background-color: blue"
    />
    <div
      id="d"
      class="box-animate"
      style="background-color: yellow"
    />
  </div>
</template>

<style>
.box-animate {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.box-animate:hover {
  animation-name: bounce;
  animation-direction: "alternate";
  animation-duration: 1s;
  animation-timing-function: steps(2);
  animation-iteration-count: infinite;
}
</style>

<style global>
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(2);
    opacity: 0.3;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
    background-color: pink;
  }
}
</style>
