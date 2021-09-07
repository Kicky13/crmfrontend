<template>
  <div class="card border-radius-card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Jenis Penilaian</h5>
      <a
        class="fa fa-plus-circle fa-lg align-self-center text-white"
        @click="tambahJenisPenilaianModalVisible = true"
      />
    </div>
    <div class="card-body">
      <a-collapse
        accordion
        :bordered="false"
        style="background: white !important;"
        @change="changeActiveKey"
      >
        <template
          v-for="(survey, i) in list"
          :key="i + 1"
        >
          <a-collapse-panel
            :header="`${survey.jenis_penilaian} [${survey.pertanyaan.length}]`"
            :show-arrow="false"
            :style="customStyle"
            class="text-center"
            :class="i + 1 === activeKey ? { active: true } : { active: false }"
            @click="getJenisPenilaianById(survey.id)"
          />
        </template>
      </a-collapse>
    </div>
  </div>
  <!-- Tambah Jenis Penilaian Modal Start -->
  <vb-tambah-jenis-penilaian-modal
    :modal-visible="tambahJenisPenilaianModalVisible"
    :new-jenis-penilaian="jenisPenilaian"
    @handle-ok="tambahJenisPenilaianHandleOk"
    @handle-cancel="tambahJenisPenilaianModalVisible = false"
  />
  <!-- Tambah Jenis Penilaian Modal End -->
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
  },
  emits: [
    'selectedJenisPenilaian',
    'addSurvey',
  ],
  data() {
    return {
      activeKey: 1,
      tambahJenisPenilaianModalVisible: false,
      customStyle: 'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      jenisPenilaian: '',
      newSurvey: {},
    }
  },
  methods: {
    changeActiveKey(key) {
      if (!(key === undefined)) {
        this.activeKey = key
      }
    },
    getJenisPenilaianById(id) {
      const survey = this.list.find(survey => survey.id === id)
      const jenis_penilaian = survey.jenis_penilaian
      const data = {
        id,
        jenis_penilaian,
        pertanyaan: survey.pertanyaan,
      }
      this.$emit('selectedJenisPenilaian', data)
    },
    tambahJenisPenilaianHandleOk(newJenisPenilaian) {
      this.newSurvey.jenis_penilaian = newJenisPenilaian
      this.newSurvey.pertanyaan = []
      this.$emit('addSurvey', this.newSurvey)
      notification.success({
        message: 'Jenis Penilaian',
        description: 'Jenis penilaian berhasil ditambah',
      })
      this.resetAfterSubmit()
      this.tambahJenisPenilaianModalVisible = false
    },
    resetAfterSubmit() {
      this.newSurvey = {}
      this.jenisPenilaian = ''
    },
  },
}
</script>

<style>
.border-radius-card {
  border-radius: 10px;
  overflow: hidden;
}
.ant-collapse-content .ant-collapse-content-box {
  padding: 0 !important;
}
.active {
  background: #f0f0f0 !important;
}
</style>