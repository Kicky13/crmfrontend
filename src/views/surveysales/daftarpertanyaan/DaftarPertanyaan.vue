<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Daftar Pertanyaan</h5>
      <i class="fa fa-list fa-lg align-self-center" />
    </div>
    <div class="card-body">
      <div class="list-group">
        <template
          v-for="(question, i) in questions.pertanyaan"
          :key="i"
        >
          <a
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
  </div>
</template>

<script>
export default {
  props: ['questions'],
}
</script>