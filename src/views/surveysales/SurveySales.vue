<template>
  <a-row :gutter="16">
    <a-col :span="9">
      <vb-jenis-penilaian
        :list="surveyList"
        @add-survey="addNewSurvey"
        @selected-penilaian="getQuestionList"
      />
    </a-col>
    <a-col :span="15">
      <vb-daftar-pertanyaan
        :list="questionList"
        @update-survey="updateSurveyById"
        @update-pertanyaan="updatePertanyaanById"
      />
    </a-col>
  </a-row>
</template>

<script>
import { getSurvey, addSurvey, updateSurvey } from '@/services/connection/survey-sales/api'
import VbJenisPenilaian from './jenispenilaian/JenisPenilaian'
import VbDaftarPertanyaan from './daftarpertanyaan/DaftarPertanyaan'
import { message } from 'ant-design-vue'

export default {
  components: {
    VbJenisPenilaian,
    VbDaftarPertanyaan,
  },
  data() {
    return {
      surveyList: {},
      questionList: {},
    }
  },
  mounted() {
    this.fetchSurveyList()
  },
  methods: {
    fetchSurveyList() {
      getSurvey()
      .then(response => {
        this.surveyList = response
        this.questionList.id = response[0].id
        this.questionList.jenis_penilaian = response[0].jenis_penilaian
        this.questionList.pertanyaan = response[0].pertanyaan
      })
    },
    addNewSurvey(data) {
      addSurvey(data)
      .then(response => {
        console.log(response)
        this.fetchSurveyList()
        message.success('Jenis penilaian berhasil ditambahkan')
      })
    },
    updateSurveyById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        console.log(response)
        this.fetchSurveyList()
        message.success('Jenis penilaian berhasil diupdate')
      })
    },
    updatePertanyaanById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        console.log(response)
        this.fetchSurveyList()
        message.success('Pertanyaan berhasil ditambahkan')
      })
    },
    getQuestionList(list) {
      this.questionList = list
    },
  },
}
</script>