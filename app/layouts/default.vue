<script setup lang="ts">
import DarkToggle from '~/components/DarkToggle.vue'
</script>

<template>
  <main flex="~ col" w-full justify-center>
    <div flex="~" gap-110 h-14 w-full items-center justify-center>
      <a text-4xl href="/">Lazy's Webblog</a>
      <div flex="~" gap-4 items-center>
        <a href="/about">About</a>
        <a i-carbon-logo-github href="/about" target="_blank" />
        <DarkToggle />
      </div>
    </div>
    <div h-6 w-full class="splitter" />
    <div flex="~" justify-center>
      <div w-770px>
        <slot />
      </div>
    </div>

    <div flex="~" mt-4 h-16 w-full items-center justify-center>
      CC BY-NC-SA 4.0
    </div>
  </main>
</template>

<style>
.splitter {
  background: linear-gradient(to bottom, rgb(33, 147, 176), rgb(109, 213, 237));
}
</style>
