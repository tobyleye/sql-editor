<template>
  <th :data-sort="dataSort" @click="handleClick">
    <div class="inline-flex items-center cursor-pointer">
      <slot>
        {{ field | camelCaseToTitle }}
      </slot>
      <div class="flex flex-col ml-2">
        <span class="arrow arrow-up">
          <fa :icon="['fas', 'caret-up']" />
        </span>

        <span class="arrow arrow-down">
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>
    </div>
  </th>
</template>

<script>
export default {
  filters: {
    camelCaseToTitle(value) {
      value = value.replace(/([a-z])([A-Z])/g, (_, p1, p2) => `${p1} ${p2}`)
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  props: {
    field: {
      type: String,
      required: true,
    },
    sorted: {
      type: Boolean,
      default: false,
    },
    isAscending: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sort: 'none',
    }
  },
  computed: {
    dataSort() {
      if (!this.sorted) {
          return 'none';
      }
      return this.isAscending ? 'ascending': 'descending'
    },
  },
  methods: {
    handleClick() {
      if (this.sorted) {
        // if currently sorted
        this.$emit('sort', [this.field, !this.isAscending])
        return
      }
      this.$emit('sort', [this.field, true])
    },
  },
}
</script>

<style lang="scss" scoped>
.arrow {
  @apply leading-none text-gray-400;
}

.arrow-up {
  margin-bottom: -4px;
}
.arrow-down {
  margin-top: -4px;
}

th[data-sort='ascending'] .arrow-up,
th[data-sort='descending'] .arrow-down {
  @apply text-gray-600;
}


</style>
