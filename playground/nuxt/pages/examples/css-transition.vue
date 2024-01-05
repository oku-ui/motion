<template>
  <div style="display: flex">
    <div class="box" style="background-color: red" />
    <div
      class="box"
      data-motion-id="Box"
      style="background-color: green"
    />
    <div id="c" class="box" style="background-color: blue" />
    <div id="d" class="box" style="background-color: yellow" />
  </div>
</template>

<style>
.box {
  width: 200px;
  height: 200px;
  transition: transform 100ms cubic-bezier(0, 0, 1, 1),
    opacity 200ms ease-out 300ms, all 0.5s cubic-bezier(0, 0, 1, 1);
}

.box:hover {
  transform: scale(3);
  opacity: 0.4;
  width: 100px;
  background-color: aquamarine !important;
}
</style>
