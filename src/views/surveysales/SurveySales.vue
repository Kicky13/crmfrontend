<template>
  <a-row :gutter="16">
    <a-col :span="9">
      <vb-jenis-penilaian
        :list="surveyList"
        @add-survey="addNewSurvey"
        @selected-jenis-penilaian="fetchQuestionList"
      />
    </a-col>
    <a-col :span="15">
      <vb-daftar-pertanyaan
        :list="questionList"
        @tambah-pertanyaan="updatePertanyaanById"
        @hapus-pertanyaan="updateSurveyById"
        @update-pertanyaan="updateSurveyById"
        @update-survey="updateSurveyById"
        @hapus-jenis-penilaian="deleteSurveyById"
        @tambah-opsi="updateSurveyById"
      />
    </a-col>
  </a-row>
</template>

<script>
import { getSurvey, addSurvey, updateSurvey, deleteSurvey } from '@/services/connection/survey-sales/api'
import VbJenisPenilaian from './jenispenilaian/JenisPenilaian'
import VbDaftarPertanyaan from './daftarpertanyaan/DaftarPertanyaan'

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
    fetchAfterUpdate() {
      getSurvey()
      .then(response => {
        this.surveyList = response
      })
    },
    addNewSurvey(data) {
      addSurvey(data)
      .then(response => {
        console.log(response)
        this.fetchAfterUpdate()
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateSurveyById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        console.log(response)
        this.fetchAfterUpdate()
        this.questionList.id = response.id
        this.questionList.jenis_penilaian = response.jenis_penilaian
        this.questionList.pertanyaan = response.pertanyaan
      })
      .catch(err => {
        console.log(err)
      })
    },
    updatePertanyaanById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        console.log(response)
        this.fetchAfterUpdate()
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteSurveyById(id) {
      deleteSurvey(id)
      .then(response => {
        console.log(response)
        this.fetchSurveyList()
      })
      .catch(err => {
        consoel.log(err)
      })
    },
    fetchQuestionList(list) {
      this.questionList = list
    },
  },
}
</script>