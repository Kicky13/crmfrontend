<template>
  <div class="container-fluid">
    <footer>
      <slot name="footer">
        <contact-content />
      </slot>
    </footer>
    <footer>
      <slot name="footer">
        <contact-footer />
      </slot>
    </footer>
  </div>
</template>

<script>
import ContactContent from './Contact/ContactContent'
import ContactFooter from './Contact/ContactFooter'

export default {
  components: {
    ContactContent,
    ContactFooter,
  },
}
</script>
