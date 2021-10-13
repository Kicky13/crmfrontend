<template>
  <template v-if="isLoading">
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow spinner-grow-sm text-main" role="status" />
      <div class="spinner-grow text-main mx-2" role="status" />
      <div class="spinner-grow spinner-grow-sm text-main" role="status" />
    </div>
  </template>
  <template v-else>
    <a-row :gutter="16">
      <a-col
        :lg="9"
        :md="24"
      >
        <vb-jenis-penilaian
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
</template>

<script>
import { surveyList, addSurvey, updateSurvey, deleteSurvey } from '@/services/connection/survey-sales/api'
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
      surveyList()
      .then(response => {
        if (response) {
          this.surveyList = response.data
          this.questionList = response.data[0]
          this.isLoading = false
        }
      })
      .catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    fetchSurveyListOnUpdated() {
      this.isLoading = true
      surveyList()
      .then(response => {
        if (response) {
          this.surveyList = response.data
          this.isLoading = false
        }
      })
      .catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    addNewSurvey(data) {
      addSurvey(data)
      .then(response => {
        if (response) {
          this.fetchSurveyListOnUpdated()
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateSurveyById(id, data) {
      updateSurvey(id, data)
      .then(response => {
        if (response) {
          this.fetchSurveyListOnUpdated()
          this.questionList = response
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteSurveyById(id) {
      deleteSurvey(id)
      .then(response => {
        if (response) {
          this.fetchSurveyListOnMounted()
          this.activeMenu = 1
        }
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