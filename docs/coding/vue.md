---
title: Vue 编码规范
categories:
  - 编码规范
tags:
  - 编码规范
author:
  name: Asren
  link: https://github.com/huazheleyoushang/fe-lint
---

# Vue 编码规范

:::tip
`Vue` 规范主要包含编码风格, 其中编码风格 参考 [eslint-plugin-vue](https://eslint.vuejs.org/rules/)。
:::

## 1. 📚 编码风格

- 【推荐】防止 JSX 中使用的变量被标记为未使用

```js
import HelloWorld from './HelloWorld';

export default {
  render () {
    return (
      <HelloWorld msg="world"/>
    )
  },
};
```

- 【推荐】组件的 data 必须是一个函数

```vue
<script>
/* ✗ BAD */
Vue.component('some-comp', {
  data: {
    foo: 'bar'
  }
})

export default {
  data: {
    foo: 'bar'
  }
}
</script>

<script>
/* ✓ GOOD */
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})

export default {
  data() {
    return {
      foo: 'bar'
    }
  }
}
</script>
```

- 【推荐】Prop 定义类型应该是构造函数

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    myProp: Number,
    anotherProp: [Number, String],
    myFieldWithBadType: {
      type: Object,
      default: function () {
        return {}
      },
    },
    myOtherFieldWithBadType: {
      type: Number,
      default: 1,
    },
    /* ✗ BAD */
    myProp: 'Number',
    anotherProp: ['Number', 'String'],
    myFieldWithBadType: {
      type: 'Object',
      default: function () {
        return {}
      },
    },
    myOtherFieldWithBadType: {
      type: 'Number',
      default: 1,
    },
  }
}
</script>
```

- 【推荐】Prop 的默认值必须匹配它的类型

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    // basic type check (`null` means accept any type)
    propA: Number,
    // multiple possible types
    propB: [String, Number],
    // a number with default value
    propD: {
      type: Number,
      default: 100
    },
    // object/array defaults should be returned from a factory function
    propE: {
      type: Object,
      default() {
        return { message: 'hello' }
      }
    },
    propF: {
      type: Array,
      default() {
        return []
      }
    },
    /* ✗ BAD */
    propA: {
      type: String,
      default: {}
    },
    propB: {
      type: String,
      default: []
    },
    propC: {
      type: Object,
      default: []
    },
    propD: {
      type: Array,
      default: []
    },
    propE: {
      type: Object,
      default: { message: 'hello' }
    }
  }
}
</script>
```

- 【推荐】计算属性禁止包含异步方法

```vue
<script>
import { computed } from 'vue'
export default {
  setup() {
    /* ✓ GOOD */
    const foo = computed(() => {
      var bar = 0
      try {
        bar = bar / this.a
      } catch (e) {
        return 0
      } finally {
        return bar
      }
    })
    /* ✗ BAD */
    const pro = computed(() =>
      Promise.all([new Promise((resolve, reject) => {})])
    )
    const foo1 = computed(async () => await someFunc())
    const bar = computed(() => {
      return fetch(url).then((response) => {})
    })
    const tim = computed(() => {
      setTimeout(() => {}, 0)
    })
    const inter = computed(() => {
      setInterval(() => {}, 0)
    })
    const anim = computed(() => {
      requestAnimationFrame(() => {})
    })
  }
}
</script>
```

- 【推荐】禁止在对象字面量中出现重复的键

```vue
<script>
/* ✗ BAD */
export default {
  props: {
    foo: String
  },
  computed: {
    foo: {
      get() {}
    }
  },
  data: {
    foo: null
  },
  methods: {
    foo() {}
  }
}
</script>
```

- 【错误】禁止出现语法错误

```vue
<template>
  <!-- ✗ BAD -->
  {{ . }}
  {{ foo bar }}
  <div :class="*abc*" / @click="def(">
    </span>
  </div id="ghi">
</template>

```

## 2. ❌ 错误提示

- 【error】禁止使用 `vue` 关键字

```vue
<script>
/* ✗ BAD */
export default {
  props: {
    $el: String
  },
  computed: {
    $on: {
      get() {}
    }
  },
  data: {
    _foo: null
  },
  methods: {
    $nextTick() {}
  }
}
</script>
```

- 【error】禁止计算属性种对属性修改

```vue
<script>
/* ✓ GOOD */
export default {
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    reversedArray() {
      return this.array.slice(0).reverse() // .slice makes a copy of the array, instead of mutating the orginal
    }
  }
}
</script>

<script>
/* ✗ BAD */
export default {
  computed: {
    fullName() {
      this.firstName = 'lorem' // <- side effect
      return `${this.firstName} ${this.lastName}`
    },
    reversedArray() {
      return this.array.reverse() // <- side effect - orginal array is being mutated
    }
  }
}
</script>

<script>
import { computed } from 'vue'
/* ✓ GOOD */
export default {
  setup() {
    const foo = useFoo()

    const fullName = computed(() => `${foo.firstName} ${foo.lastName}`)
    const reversedArray = computed(() => {
      return foo.array.slice(0).reverse() // .slice makes a copy of the array, instead of mutating the orginal
    })
  }
}
</script>

<script>
import { computed } from 'vue'
/* ✗ BAD */
export default {
  setup() {
    const foo = useFoo()

    const fullName = computed(() => {
      foo.firstName = 'lorem' // <- side effect
      return `${foo.firstName} ${foo.lastName}`
    })
    const reversedArray = computed(() => {
      return foo.array.reverse() // <- side effect - orginal array is being mutated
    })
  }
}
</script>
```

- 【推荐】 禁止在 `<textarea>` 中出现变量

```vue
<template>
  <!-- ✓ GOOD -->
  <textarea v-model="message" />

  <!-- ✗ BAD -->
  <textarea>{{ message }}</textarea>
</template>
```

- 【推荐】禁止注册没有使用的组件

```vue
<!-- ✓ GOOD -->
<template>
  <div>
    <h2>Lorem ipsum</h2>
    <the-modal>
      <component is="TheInput" />
      <component :is="'TheDropdown'" />
      <TheButton>CTA</TheButton>
    </the-modal>
  </div>
</template>

<script>
import TheButton from 'components/TheButton.vue'
import TheModal from 'components/TheModal.vue'
import TheInput from 'components/TheInput.vue'
import TheDropdown from 'components/TheDropdown.vue'

export default {
  components: {
    TheButton,
    TheModal,
    TheInput,
    TheDropdown,
  }
}
</script>

<!-- ✗ BAD -->
<template>
  <div>
    <h2>Lorem ipsum</h2>
    <TheModal />
  </div>
</template>

<script>
import TheButton from 'components/TheButton.vue'
import TheModal from 'components/TheModal.vue'

export default {
  components: {
    TheButton, // Unused component
    'the-modal': TheModal // Unused component
  }
}
</script>
```

- 【error】render 函数必须有返回值

```vue
<script>
export default {
  /* ✓ GOOD */
  render(h) {
    return h('div', 'hello')
  }
}
</script>

<script>
export default {
  /* ✗ BAD */
  render(h) {
    if (foo) {
      return h('div', 'hello')
    }
  }
}
</script>
```
