<template>
  <a-card class="card border-radius-card" :loading="loading">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Jenis Penilaian</h5>
      <Can do="create" on="Survey Sales">
        <a
          class="fa fa-plus-circle fa-lg align-self-center text-white"
          @click="modalVisible = true"
        />
      </Can>
    </div>
    <div class="card-body">
      <a-collapse
        accordion
        style="background: white !important;"
        :bordered="false"
        @change="changeActiveKey"
      >
        <template
          v-for="(survey, i) in list"
          :key="i + 1"
        >
          <a-collapse-panel
            class="text-center"
            :class="i + 1 === getActiveMenu ? { active: true } : { active: false }"
            :header="`${ survey.jenis_penilaian } [${ survey.pertanyaan.length }]`"
            :show-arrow="false"
            :style="customStyle"
            @click="getJenisPenilaianById(survey.id)"
          />
        </template>
      </a-collapse>
    </div>
  </a-card>
  <vb-tambah-jenis-penilaian-modal
    :modal-visible="modalVisible"
    :new-jenis-penilaian="jenisPenilaian"
    @handle-ok="handleOk"
    @handle-cancel="modalVisible = false"
  />
</template>

<script>
import { notification } from 'ant-design-vue'
import VbTambahJenisPenilaianModal from './modals/TambahJenisPenilaianModal'

export default {
  components: {
    VbTambahJenisPenilaianModal,
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      },
    },
    getActiveMenu: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
    },
  },
  emits: [
    'selectedJenisPenilaian',
    'addJenisPenilaian',
    'activeKey',
  ],
  data() {
    return {
      modalVisible: false,
      activeKey: 1,
      customStyle: 'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      jenisPenilaian: '',
    }
  },
  methods: {
    changeActiveKey(key) {
      if (!(key === undefined)) {
        this.$emit('activeKey', key)
      }
    },
    getJenisPenilaianById(id) {
      const survey = this.list.find(survey => survey.id === id)
      const jenis_penilaian = survey.jenis_penilaian
      const pertanyaan = survey.pertanyaan
      const data = {
        id,
        jenis_penilaian,
        pertanyaan,
      }
      this.$emit('selectedJenisPenilaian', data)
    },
    handleOk(newJenisPenilaian) {
      let check = newJenisPenilaian.trim()
      if (check) {
        const dataForm = {}
        dataForm.jenis_penilaian = newJenisPenilaian
        dataForm.pertanyaan = []
        this.$emit('addJenisPenilaian', dataForm)
        notification.success({
          message: 'Jenis Penilaian',
          description: 'Jenis penilaian berhasil ditambah',
        })
        this.modalVisible = false
      } else {
        notification.error({
          message: 'Tambah Jenis Penilaian',
          description: 'Kolom tambah jenis penilaian masih kosong',
        })
      }
    },
  },
}
</script>

<style>
.ant-collapse-content .ant-collapse-content-box {
  padding: 0 !important;
}
.ant-collapse-header:hover {
  background: #f0f0f0;
}
.active {
  background: #f0f0f0 !important;
}
</style>