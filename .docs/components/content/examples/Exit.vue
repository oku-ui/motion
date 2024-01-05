<script setup lang="ts">
const code = `
<script setup lang="ts">
const show = ref(true)
<\/script>

<template>
  <div class="container-exit">
    <Presence>
      <Motion
        v-show="show" :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.6 }" class="box"
      />
    </Presence>
    <button @click="show = !show">
      Toggle
    </button>
  </div>
</template>

<style>
.container-exit {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.container-exit button {
  cursor: pointer;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--splash);
}
</style>
`
</script>

<template>
  <Frame replay>
    <template #default="{ reload }">
      <div class="container-exit">
        <Presence>
          <Motion
            v-show="reload" :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.6 }" class="box"
          />
        </Presence>
      </div>
    </template>

    <template #code>
      <CodeGroup>
        <ProsePre
          :code="code"
          language="vue"
          filename="Code"
          :highlights="[1, 2, 3]"
          icon="i-ph-code"
        >
          {{ code }}
        </ProsePre>
      </CodeGroup>
    </template>
  </Frame>
</template>

<style>
.container-exit {
    width: 100px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.container-exit button {
    cursor: pointer;
}

.box {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: var(--splash);
}
</style>
