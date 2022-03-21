<template>
  <div class="layout">
    <header class="header border-b border-gray-200 py-5 px-5">
      <h3 class="text-base font-semibold">Atlas SQL Editor</h3>
    </header>
    <aside class="side-panel border-r border-gray-200 bg-gray-50 flex flex-col">
      <section class="flex-shrink-0">
        <slot name="data-source-menu">
          <div class="uppercase mb-2 text-sm text-gray-500">Data Source</div>
          <div
            class="flex items-center border border-gray-200 rounded-xl py-2 px-4 bg-white"
          >
            <fa icon="database" class="text-xl text-gray-600" />
            <div class="ml-3 inline-flex flex-col">
              <span class="text-base font-semibold leading-tight"
                >All User Data</span
              >
              <span class="text-gray-500 text-sm">Redshift</span>
            </div>
          </div>
        </slot>
      </section>
      <section class="flex-1 overflow-auto">
        <slot name="tables-menu" />
      </section>
      <section class="flex-1 overflow-auto">
        <slot name="saved-queries-menu" />
      </section>
    </aside>
    <div class="main-area">
      <div class="p-6">
        <slot name="editor-area" />
      </div>
      <div class="border-t border-b border-gray-300 py-4 px-6">
        <slot name="query-duration-area"/>
      </div>
      <div class="relative">
        <div class="absolute top-0 left-0 w-full h-full overflow-auto">
          <slot name="query-result-area" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorLayout',
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'side-panel main-area';
  height: 100vh;
  overflow: hidden;
}

.header {
  grid-area: header;
}

.main-area {
  grid-area: main-area;
  display: grid;
  grid-template-rows: 0.7fr auto 1fr;
  height: 100%;
}

.side-panel {
  grid-area: side-panel;

  section {
    @apply px-6 py-6;
    &:not(:last-child) {
      @apply border-b border-gray-300;
    }
  }
}
</style>
