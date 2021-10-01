<template>
  <a-row :gutter="16">
    <a-col
      :lg="9"
      :md="24"
    >
      <vb-jenis-penilaian
        :loading="isLoading"
        :list="surveyList"
        :get-active-menu="activeMenu"
        @active-key="setActiveKey"
        @add-jenis-penilaian="addNewSurvey"
        @selected-jenis-penilaian="fetchQuestionList"
      />
    </a-col>
    <a-col
      :lg="15"
      :md="24"
    >
      <vb-daftar-pertanyaan
        :loading="isLoading"
        :list="questionList"
        @add-pertanyaan="updateSurveyById"
        @delete-pertanyaan="updateSurveyById"
        @update-pertanyaan="updateSurveyById"
        @update-jenis-penilaian="updateSurveyById"
        @delete-jenis-penilaian="deleteSurveyById"
        @add-jawaban="updateSurveyById"
        @delete-jawaban="updateSurveyById"
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
      surveyList: [],
      questionList: {},
      activeMenu: 1,
      isLoading: false,
    }
  },
  mounted() {
    this.fetchSurveyListOnMounted()
  },
  methods: {
    fetchSurveyListOnMounted() {
      this.isLoading = true
      getSurvey()
      .then(response => {
        this.surveyList = response
        this.questionList = response[0]
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      })
    },
    fetchSurveyListOnUpdated() {
      getSurvey()
      .then(response => {
        this.surveyList = response
      })
      .catch(err => {
        console.log(err)
      })
    },
    addNewSurvey(data) {
      addSurvey(data)
      .then(response => {
        console.log(response)
        this.fetchSurveyListOnUpdated()
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateSurveyById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        this.fetchSurveyListOnUpdated()
        this.questionList = response
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteSurveyById(id) {
      deleteSurvey(id)
      .then(response => {
        console.log(response)
        this.fetchSurveyListOnMounted()
        this.activeMenu = 1
      })
      .catch(err => {
        consoel.log(err)
      })
    },
    fetchQuestionList(list) {
      this.questionList = list
    },
    setActiveKey(key) {
      this.activeMenu = key
    },
  },
}
</script>