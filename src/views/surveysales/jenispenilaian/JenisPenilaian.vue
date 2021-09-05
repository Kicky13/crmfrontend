<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Jenis Penilaian</h5>
      <a
        class="fa fa-plus-circle fa-lg align-self-center text-white"
        @click="showModal"
      />
    </div>
    <div class="card-body">
      <div class="list-group">
        <template
          v-for="survey in list"
          :key="survey.id"
        >
          <a
            class="list-group-item list-group-item-action"
            @click="getPenilaian(survey.id)"
          >
            {{survey.jenis_penilaian}} [{{survey.pertanyaan.length}}]
          </a>
        </template>
      </div>
    </div>
  </div>
  <a-modal
    :visible="modalVisible"
    title="Tambah Jenis Penilaian"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{span: 6}"
      :wrapper-col="{span: 18}"
    >
      <a-form-item label="Jenis Penilaian">
        <a-input
          placeholder="Masukkan jenis penilaian"
          v-model:value="inputPenilaianBaru"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      modalVisible: false,
      inputPenilaianBaru: '',
      newSurvey: {},
    }
  },
  methods: {
    getPenilaian(id) {
      const survey = this.list.find(survey => survey.id === id)
      const jenis_penilaian = survey.jenis_penilaian
      const data = {
        id,
        jenis_penilaian,
        pertanyaan: survey.pertanyaan,
      }
      this.$emit('selectedPenilaian', data)
    },
    showModal() {
      this.modalVisible = true
    },
    handleOk() {
      this.modalVisible = false
      console.log(this.inputPenilaianBaru)
      this.newSurvey.jenis_penilaian = this.inputPenilaianBaru
      this.newSurvey.pertanyaan = []
      this.$emit('addSurvey', this.newSurvey)
      this.resetAfterSubmit()
    },
    handleCancel() {
      this.modalVisible = false
    },
    resetAfterSubmit() {
      this.newSurvey = {}
      this.inputPenilaianBaru = ''
    },
  },
}
</script>