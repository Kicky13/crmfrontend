<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Jenis Penilaian</h5>
      <i class="fa fa-plus-circle fa-lg align-self-center" />
    </div>
    <div class="card-body">
      <div class="list-group">
        <template
          v-for="survey in surveyList"
          :key="survey.id"
        >
          <a
            class="list-group-item list-group-item-action"
            @click="pilihPenilaian(survey.id)"
          >
            {{survey.jenis_penilaian}} [{{survey.pertanyaan.length}}]
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getSurvey } from '@/services/connection/survey-sales/api'

export default {
  data() {
    return {
      surveyList: {},
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
      })
    },
    pilihPenilaian(id) {
      const question_list = this.surveyList.find(survey => survey.id === id)
      const question_title = question_list.jenis_penilaian
      const data = {
        question_list: question_list.pertanyaan,
        question_title,
      }
      this.$emit('evaluationSelected', data)
    },
  },
}
</script>