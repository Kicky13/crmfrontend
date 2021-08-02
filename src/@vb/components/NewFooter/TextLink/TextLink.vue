<template>
  <a
    class="text-white"
    v-text="text"
    :href="link"
    target="_blank"
    style="font-size: 1.1rem;"
  />
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
}
</script>
