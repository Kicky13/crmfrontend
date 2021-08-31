<template>
  <a-row :gutter="16">
    <a-col :span="9">
      <vb-jenis-penilaian @evaluation-selected="getQuestionList" />
    </a-col>
    <a-col :span="15">
      <vb-daftar-pertanyaan :data="questionList" />
    </a-col>
  </a-row>
</template>

<script>
import VbJenisPenilaian from './jenispenilaian/JenisPenilaian'
import VbDaftarPertanyaan from './daftarpertanyaan/DaftarPertanyaan'

export default {
  components: {
    VbJenisPenilaian,
    VbDaftarPertanyaan,
  },
  data() {
    return {
      questionList: [],
    }
  },
  methods: {
    getQuestionList(list) {
      this.questionList = list
    },
  },
}
</script>