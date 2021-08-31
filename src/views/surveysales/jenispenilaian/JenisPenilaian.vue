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
      surveyList: [],
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
      const questionList = this.surveyList.find(survey => survey.id === id)
      this.$emit('evaluationSelected', questionList)
    },
  },
}
</script>