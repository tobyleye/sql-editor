<template>
  <div v-if="loading" class="w-full h-full grid place-items-center">
    loading...
  </div>
  <div v-else-if="error" class="w-full h-full grid place-items-center">
    oops error occured
  </div>
  <div v-else class="overflow-auto">
    <table>
      <thead>
        <tr>
          <th class="serial-number"/>
          <th v-for="(field, index) of fields" :key="index">
            <span  class="inline-block cursor-pointer" @click="setSort(field)">
              {{ field | camelCaseToTitle }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) of sortedData" :key="`row-${rowIndex}`">
          <td class="serial-number">{{rowIndex+1}}</td>
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
export default {
  name: 'QueryResult',
    filters: {
    camelCaseToTitle(value) {
     value = value.replace(/([a-z])([A-Z])/g, (_,p1,p2) => `${p1} ${p2}`)
     return value.charAt(0).toUpperCase() + value.slice(1,)
    }
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
    }
  },

  data() {
    return {
      sortBy: null,
      sortDirection: null,
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
      if (!this.sortBy || !this.sortDirection) {
        return this.data
      }

      const isAscending = this.sortDirection === 'asc'
      const sortKey = this.sortBy

      return [...this.data].sort((a, b) => {
        if (isAscending) {
          return a[sortKey] > b[sortKey]
        } else {
          return b[sortKey] > a[sortKey]
        }
      })
    },
  },

  methods: {
    setSort(field) {
      this.sortBy = field
      if (!this.sortDirection) {
        this.sortDirection = 'asc'
      }
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc'
      } else {
        this.sortDirection = 'asc'
      }
    },
  },
}
</script>

<style lang="scss" scoped>

table{
  @apply w-full text-gray-600 border-collapse text-sm;
}

th {
  @apply border-gray-300 bg-gray-100;
}

thead{
  @apply sticky top-0;
}

th,td {
  @apply px-4 py-2 border border-gray-300;
}

tr:nth-child(2n) td:not(.serial-number) {
  @apply bg-gray-100;
}

.serial-number {
  width: 40px;
}

td.serial-number{
  @apply  bg-gray-100 text-center border-none; 
}



</style>
