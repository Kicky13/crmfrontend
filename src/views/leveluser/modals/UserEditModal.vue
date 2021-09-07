<template>
  <a-modal
    :title="`Edit Menu: ${ username }`"
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="Jenis User">
        <a-input v-model:value="isEditUsername" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    modalVisible: Boolean,
    editUsername: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
  },
  emits: [
    'handleOk',
    'handleCancel',
  ],
  data() {
    return {
      isEditUsername: '',
    }
  },
  watch: {
    editUsername() {
      this.isEditUsername = this.editUsername
    },
  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.isEditUsername)
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isEditUsername = this.username
    },
  },
}
</script>