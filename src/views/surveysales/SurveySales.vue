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
        <a-row>
          <a-col
            :lg="24"
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
            :lg="24"
            :md="24"
          >
            <vb-sesi-penilaian
              :list="sesiList"
              :get-active-menu="sesiActiveMenu"
              @active-key="setSesiActiveKey"
              @add-sesi-penilaian="addNewSesi"
              @update-sesi-penilaian="updateSesiByUuid"
              @delete-sesi-penilaian="deleteSesiByUuid"
              @selected-sesi-penilaian="fetchSesiList"
            />
          </a-col>
        </a-row>
      </a-col>
      <a-col
        :lg="15"
        :md="24"
      >
        <vb-daftar-pertanyaan
          :list="questionList"
          @add-pertanyaan="addNewSurvey"
          @update-pertanyaan="updateSurveyById"
          @delete-pertanyaan="deleteSurveyById"
          @update-jenis-penilaian="updateSurveyById"
          @delete-jenis-penilaian="deleteSurveyById"
          @add-jawaban="addNewSurvey"
          @update-jawaban="updateSurveyById"
          @delete-jawaban="deleteSurveyById"
        />
      </a-col>
    </a-row>
  </template>
</template>

<script>
import {
  surveyList,
  addSurvey,
  updateSurvey,
  deleteSurvey,
  sesiList,
  addSesi,
  updateSesi,
  deleteSesi,
} from '@/services/connection/survey-sales/api'
import VbJenisPenilaian from './jenispenilaian/JenisPenilaian'
import VbSesiPenilaian from './sesipenilaian/SesiPenilaian'
import VbDaftarPertanyaan from './daftarpertanyaan/DaftarPertanyaan'

export default {
  components: {
    VbJenisPenilaian,
    VbSesiPenilaian,
    VbDaftarPertanyaan,
  },
  data() {
    return {
      surveyList: [],
      sesiList: [],
      questionList: {},
      activeMenu: 1,
      sesiActiveMenu: 1,
      isLoading: false,
    }
  },
  mounted() {
    this.fetchSurveyList()
    this.fetchSesiList()
  },
  methods: {
    fetchSurveyList() {
      this.isLoading = true
      surveyList()
      .then(response => {
        if (response) {
          this.surveyList = response.data
          this.questionList = response.data[0]
          this.activeMenu = 1
          this.isLoading = false
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
    addNewSurvey(data) {
      addSurvey(data)
      .then(response => {
        if (response) {
          this.fetchSurveyList()
          this.isLoading = false
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
    updateSurveyById(data) {
      updateSurvey(data)
      .then(response => {
        if (response) {
          this.fetchSurveyList()
        }
      })
      .catch(err => {
        if (err) {}
      })
    },
    deleteSurveyById(data) {
      deleteSurvey(data)
      .then(response => {
        if (response) {
          this.fetchSurveyList()
          this.activeMenu = 1
        }
      })
      .catch(err => {
        if (err) {}
      })
    },
    fetchQuestionList(list) {
      this.questionList = list
    },
    setActiveKey(key) {
      this.activeMenu = key
    },
    setSesiActiveKey(key) {
      this.sesiActiveMenu = key
    },
    fetchSesiList() {
      this.isLoading = true
      sesiList()
      .then(response => {
        if (response.status) {
          this.sesiList = response.data
        } else {
          this.sesiList = []
        }
        this.sesiActiveMenu = 1
        this.isLoading = false
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
    addNewSesi(data) {
      addSesi(data)
      .then(response => {
        if (response) {
          this.fetchSesiList()
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
    deleteSesiByUuid(data) {
      deleteSesi(data)
      .then(response => {
        if (response) {
          this.fetchSesiList()
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
    updateSesiByUuid(data) {
      updateSesi(data)
      .then(response => {
        if (response) {
          this.fetchSesiList()
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false
        }
      })
    },
  },
}
</script>