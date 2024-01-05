<script setup lang="ts">
const code = `
<script setup lang="ts">
const current = ref(0)
<\/script>

<template>
  <div class="container-animate">
    <Presence>
      <Motion
        :key="current"
        :initial="{ opacity: 0, x: 50 }"
        :animate="{
          opacity: 1,
          x: 0,
          transition: { delay: 0.1 }
        }"
        :exit="{ opacity: 0, x: -50 }"
        class="slide-between"
      >
        {{ current }}
      </Motion>
    </Presence>
    <button @click="current++">
      Next
    </button>
  </div>
</template>

<style>
:root {
  --red: #f56565;
  --white: #fff;
  --splash: #edf2f7;
}

.container-animate {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.container-animate button {
  cursor: pointer;
}

.slide-between {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--red);
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  line-height: 72px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
`

const current = ref(0)
</script>

<template>
  <Frame replay>
    <template #default="{ reload }">
      <div class="container-animate">
        <Presence>
          <Motion
            v-show="reload"
            :key="current"
            :initial="{ opacity: 0, x: 50 }"
            :animate="{
              opacity: 1,
              x: 0,
              transition: { delay: 0.1 },
            }"
            :exit="{ opacity: 0, x: -50 }"
            class="slide-between"
          >
            {{ current }}
          </Motion>
        </Presence>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          @click="current++"
        >
          Next
        </button>
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
:root {
  --red: #f56565;
  --white: #fff;
  --splash: #edf2f7;
}

.container-animate {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.container-animate button {
  cursor: pointer;
}

.slide-between {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--red);
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  line-height: 72px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
