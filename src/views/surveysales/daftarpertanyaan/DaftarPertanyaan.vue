<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <template v-if="data.length === 0">
        <h5 class="text-white">Daftar Pertanyaan {{defaultValue.jenis_penilaian}}</h5>
      </template>
      <template v-else>
        <h5 class="text-white">Daftar Pertanyaan {{data.question_title}}</h5>
      </template>
      <i class="fa fa-list fa-lg align-self-center" />
    </div>
    <div class="card-body">
      <template v-if="data.length === 0">
        <a
          v-for="(question, i) in defaultValue.pertanyaan"
          :key="i"
          href="#"
          class="list-group-item list-group-item-action d-flex"
        >
          <i class="fa fa-question-circle fa-lg mr-2" />
          <span v-text="question" />
          <i
            class="fa fa-caret-down"
            style="margin-left: auto;"
          />
        </a>
      </template>
      <template v-else>
        <a
          v-for="(question, i) in data.question_list"
          :key="i"
          href="#"
          class="list-group-item list-group-item-action d-flex"
        >
          <i class="fa fa-question-circle fa-lg mr-2" />
          <span v-text="question" />
          <i
            class="fa fa-caret-down"
            style="margin-left: auto;"
          />
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import { getSurvey } from '@/services/connection/survey-sales/api'

export default {
  props: ['data'],
  data() {
    return {
      defaultValue: {},
    }
  },
  mounted() {
    this.getSurveyListDefault()
  },
  methods: {
    getSurveyListDefault() {
      getSurvey()
      .then(response => {
        this.defaultValue = response[0]
      })
    },
  },
}
</script>