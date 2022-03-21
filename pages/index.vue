<template>
  <editor-layout>
    <template #tables-menu>
      <collapsible-menu label="tables">
        <ul class="menu">
          <li v-for="(table, index) in tables" :key="index">
            <button
              class="inline-flex items-center w-full"
              :class="{ active: selectedTable === table }"
              @click="selectTable(table)"
            >
              <fa icon="table-cells" class="mr-1" />
              {{ table }}
            </button>
          </li>
        </ul>
      </collapsible-menu>
    </template>

    <template #saved-queries-menu>
      <collapsible-menu label="saved queries">
        <ul class="menu">
          <li v-for="(table, index) in queryHistory" :key="index">
            <button @click="selectTable(table)">
              select * from {{ table }}
            </button>
          </li>
        </ul>
      </collapsible-menu>
    </template>

    <template #editor-area>
      <editor-tabs
        :tabs="tabs"
        :active-index="activeTabIndex"
        @new-tab="addNewTabs()"
        @close-tab="closeTab"
        @change="activeTabIndex = $event"
      />
      <div class="flex-1">
        <textarea
          v-model="activeTab.query"
          class="w-full h-32 border border-gray-200 p-6 text-xl rounded-lg"
        ></textarea>
      </div>
      <div class="my-5">
        <button class="run-query-btn" :disabled="isLoading" @click="runQuery">
          <fa icon="play" class="mr-2" />
          Run Query
        </button>
        <span v-if="isLoading" class="spinner inline-block ml-2 text-gray-500">
          <fa icon="spinner" />
        </span>
      </div>
    </template>

    <template #query-duration-area>
      <div v-if="!loading && !error && result" class="text-gray-400">
        <span class="font-semibold text-black">
          {{ result.length }} rows
        </span>
        in {{ queryDuration }}s
      </div>
    </template>

    <template #query-result-area>
      <query-result
        v-if="result"
        class="h-full"
        :data="result"
        :loading="isLoading"
        :error="error"
      />
      <div v-else class="h-full grid place-items-center">
        <span class="text-gray-500">Your result will appear here</span>
      </div>
    </template>
  </editor-layout>
</template>

<script>
import CollapsibleMenu from '~/components/CollapsibleMenu.vue'
import EditorLayout from '~/components/EditorLayout.vue'
import EditorTabs from '~/components/EditorTabs.vue'
import { millisecondsToSeconds } from '~/helpers'

export default {
  name: 'IndexPage',
  components: { EditorLayout, CollapsibleMenu, EditorTabs },
  data() {
    return {
      tables: [
        'categories',
        'customers',
        'orders',
        'regions',
        'shippers',
        'suppliers',
      ],
      selectedTable: 'categories',
      queryHistory: [],
      query: '',
      result: null,
      isLoading: false,
      error: null,
      tabs: [],
      activeTabIndex: 0,
      queryDuration: null,
    }
  },
  computed: {
    activeTab() {
      return this.tabs[this.activeTabIndex]
    },
  },

  watch: {
    activeTab() {
      if (this.activeTab && this.activeTab.table !== this.selectedTable) {
        this.selectedTable = this.activeTab.table
      }
    },
  },

  created() {
    this.addNewTabs(2)
  },

  methods: {
    selectTable(table) {
      this.selectedTable = table
      if (this.activeTab) {
        this.activeTab.query = `Select * from ${table}`
        this.activeTab.table = table
      }
    },

    addNewTabs(n = 1) {
      for (let i = 0; i < n; i++) {
        this.tabs.push({
          title: 'Select * from',
          query: `Select * from ${this.selectedTable}`,
          table: this.selectedTable,
        })
      }
      this.activeTabIndex = this.tabs.length - 1
    },

    closeTab(index) {
      this.tabs.splice(index, 1)
    },

    updateHistory() {
      const history = [this.selectedTable, ...this.queryHistory].slice(0, 5)
      this.queryHistory = history
    },

    async runQuery() {
      if (!this.selectedTable) {
        alert('please select a table')
        return
      }

      this.isLoading = true
      this.error = null
      this.queryDuration = null
      const url = `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/json/${this.selectedTable}.json`
      try {
        const start = new Date()
        const data = await fetch(url).then((res) => res.json())
        this.result = data
        this.updateHistory()
        this.queryDuration = millisecondsToSeconds(new Date() - start)
      } catch (err) {
        this.error = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  button {
    @apply px-4 py-2 rounded-sm text-sm text-black inline-flex items-center w-full text-left;
    svg {
      @apply mr-2;
    }
    &.active {
      @apply bg-gray-200;
    }
  }
}

.run-query-btn {
  @apply inline-flex items-center bg-green-400 hover:bg-green-600 text-white rounded-md py-2 px-4 outline-none;
  &:disabled {
    @apply bg-green-200;
  }
}

.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
