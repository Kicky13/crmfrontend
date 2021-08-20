<template>
  <a-modal
    title="Tambah Berita"
    :visible="showModalTambah"
    @ok="handleOkModal"
    @cancel="handleCancelModal"
    ok-text="Tambah"
    cancel-text="Batal"
    style="top: 20px;"
  >
    <a-form :model="formState" label-align="left" layout="vertical">
      <a-form-item label="Judul">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="Konten">
        <quill-editor style="height: 200px" v-model:value="formState.detail"></quill-editor>
      </a-form-item>
      <a-form-item label="Upload Gambar">
        <div class="clearfix">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <i class="fa fa-plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { quillEditor } from 'vue3-quill'
import { defineComponent, reactive, toRaw } from 'vue'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  components: {
    quillEditor,
  },
  props: ['showModalTambah'],
  setup() {
    const formState = reactive({
      title: '',
      detail: '',
    })

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    return {
      formState,
      onSubmit,
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  },
  methods: {
    handleOkModal(e) {
      this.$emit('handleOk', this.formState)
      this.formState.title = ''
      this.formState.detail = ''
    },
    handleCancelModal(e) {
      this.$emit('handleCancel')
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
})
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>