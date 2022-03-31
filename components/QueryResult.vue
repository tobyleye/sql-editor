<template>
  <div v-if="loading" class="w-full h-full grid place-items-center">
    loading...
  </div>
  <div v-else-if="error" class="text-red-500 w-full h-full grid place-items-center">
    oops error occured
  </div>
  <div v-else class="overflow-auto">
    <table>
      <thead>
        <tr>
          <th class="serial-number" />
          <header-cell
            v-for="(field, index) of fields"
            :key="index"
            :field="field"
            :sorted="sort.key === field"
            :is-ascending="sort.isAscending"
            @sort="sortData"
           />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) of sortedData" :key="`row-${rowIndex}`">
          <td class="serial-number">{{ rowIndex + 1 }}</td>
          <td
            v-for="(field, colIndex) in fields"
            :key="`item-${rowIndex}-${colIndex}`"
          >
            {{ row[field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HeaderCell from '@/components/HeaderCell.vue'

export default {
  name: 'QueryResult',
  components: {
    HeaderCell,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    queryStatus: {
      type: String,
      default: 'idle',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sort: {
        key: null,
        isAscending: false,
      },
    }
  },
  computed: {
    fields() {
      if (this.data.length > 0) {
        const firstRow = this.data[0]
        return Object.keys(firstRow).filter((key) => {
          return typeof firstRow[key] === 'string'
        })
      }
      return []
    },
    sortedData() {
      if (!this.sort.key) {
        return this.data
      }

      const { key, isAscending } = this.sort

      return [...this.data].sort((a, b) => {
        if (isAscending) {
          return a[key] > b[key]
        } else {
          return b[key] > a[key]
        }
      })
    },
  },

  methods: {
    sortData([key, isAscending]) {
      this.sort = {
        key,
        isAscending,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  @apply w-full text-gray-600 border-collapse text-sm;
}

th {
  @apply border-gray-300 bg-gray-100;
}

thead {
  @apply sticky top-0;
}

th,
td {
  @apply px-4 py-2 border border-gray-300;
}

tr:nth-child(2n) td:not(.serial-number) {
  @apply bg-gray-100;
}

.serial-number {
  width: 40px;
}

td.serial-number {
  @apply bg-gray-100 text-center border-none;
}
</style>
