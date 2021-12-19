<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <router-link :to="`/users/hierarchy`" class="font-weight-bold text-primary">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke User Hirarki</router-link
        >
      </div>
    </div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Preview Data {{ $route.params.name }}</strong>
      </div>
      <div class="card-body">
        <div class="table-visit table-responsive text-nowrap">
          <a-table
            class=" "
            :columns="importExelHirarki.columns_preview"
            :data-source="importExelHirarki.columns_preview"
            :scroll="{ x: 1500 }"
            :loading="importExelHirarki.loading_preview"
            :row-class-name="tableRowClassName"
            :row-key="data => data.id_toko"
          >
            <!-- <template #icon="{ text }">
              <div v-if="text.status === true">
                <img lazy="loading" v-once src="@/assets/images/check.svg" alt="Benar" />
              </div>
              <div v-else>
                <img lazy="loading" v-once src="@/assets/images/wrong.svg" alt="Salah" />
              </div>
            </template>
            <template #nama_toko="{ text }">
              <div data-toggle="tooltip" data-placement="top" :title="text.nama_toko">
                {{ text.nama_toko.slice(0, 12) + `....` }}
              </div>
            </template>
            <template #distributor="{ text }">
              <div data-toggle="tooltip" data-placement="top" :title="text.nama_distributor">
                {{ text.nama_distributor.slice(0, 12) + `....` }}
              </div>
            </template>
            <template #days="{ text }">
              <div v-if="text == istrue">
                <a-checkbox checked="true" />
              </div>
              <div v-else-if="text == isfalse">
                <a-checkbox checked="true" disabled />
              </div>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
                ><button type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span></button
                ><button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template> -->
          </a-table>
        </div>
        <div class="d-flex flex-row-reverse mt-4">
          <a-button type="primary" @click="onSubmitData()" class="mt-2">
            <i class="fa fa-upload mr-2" />
            Commit to Database
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PreviewExcel',
  computed: {
    ...mapState({
      importExelHirarki: state => state.importExelHirarki.data,
    }),
  },
  methods: {
    ...mapActions('importExelHirarki', []),
    tableRowClassName(text) {
      if (text.status === false) {
        return 'non-active'
      } else {
        return ''
      }
    },
  },
}
</script>
