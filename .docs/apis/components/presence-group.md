---
title: PresenceGroup
description: Perform exit animations in Vue. Group multiple Motion components together.
icon: i-ph-brackets-curly-duotone
---

# PresenceGroup

```ts
<PresenceGroup>
  <template v-for="item in items" :key="item.id">
    <Motion
      v-show="show"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }">
    </Motion>
  </template>
</PresenceGroup>
```
