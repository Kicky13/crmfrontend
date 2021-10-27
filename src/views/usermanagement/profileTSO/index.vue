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
        <strong>Profile TSO</strong>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-3 col-md-3">
            <a-form-item label="List Distrik">
              <a-select
                v-model:value="profileTSO.formData.id_distrik"
                style="width: 10rem !important;"
                class="col-lg-12 col-md-12 pr-2"
                placeholder="Pilih Distrik"
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option
                  v-for="(item, index) in profileTSO.daftar_distrik"
                  :value="item.idDistrik"
                  :key="`distrik_${index}`"
                >
                  {{ item.namaDistrik }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div class="col-xs-3 col-md-3">
            <a-form-item label="Tgl Mulai">
              <a-date-picker
                v-model:value="profileTSO.formData.tgl_mulai"
                placeholder="Pilih Tanggal"
                style="width: 10rem !important;"
              />
            </a-form-item>
          </div>
          <div class="col-xs-3 col-md-3">
            <a-form-item label="Tgl Akhir">
              <a-date-picker
                v-model:value="profileTSO.formData.tgl_akhir"
                placeholder="Pilih Tanggal"
                style="width: 10rem !important;"
              />
            </a-form-item>
          </div>
          <div class="col-xs-3 col-md-3">
            <a-button type="primary" class="mb-3 w-100" @click="handleSubmit()">
              <i class="fa fa-eye mr-2" />
              Tambahkan
            </a-button>
          </div>
        </div>

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="profileTSO.columns"
            :data-source="profileTSO.list_distrik_bawahan"
            :row-key="data => data.idDistrik"
            :loading="profileTSO.isLoading"
          >
            <template #no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #id_distrik="{ text }">
              <div>
                {{ text.idDistrik != null ? text.idDistrik : '-' }}
              </div>
            </template>
            <template #nama_distrik="{ text }">
              <div>
                {{ text.namaDistrik != null ? text.namaDistrik : '-' }}
              </div>
            </template>
            <template #action="{ text }">
              <div>
                <button
                  @click="deleteRow(text.idDistrik)"
                  type="button"
                  class="btn btn-outline-danger mr-2"
                >
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'

export default {
  name: 'ProfileTSO',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      profileTSO: state => state.profileTSO.data,
    }),
  },
  async mounted() {
    await this.getListDistrik({
      id_tso: this.$route.params.id,
    })
    await this.getListDistrikHirarki({
      id_tso: this.$route.params.id,
    })
  },
  methods: {
    ...mapActions('profileTSO', [
      'getListDistrik',
      'getListDistrikHirarki',
      'deleteListDistrikHirarki',
      'addDistrikHirarki',
    ]),

    deleteRow(id_distriks) {
      this.$confirm({
        title: 'Apakah anda yakin akan menghapus data ini?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          return new Promise((resolve, reject) => {
            this.deleteListDistrikHirarki({
              id_tso: this.$route.params.id,
              id_distrik: id_distriks,
            })
            this.getListDistrik({
              id_tso: this.$route.params.id,
            })
            this.getListDistrikHirarki({
              id_tso: this.$route.params.id,
            })
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {},
      })
    },
    async handleSubmit() {
      await this.addDistrikHirarki({
        id_tso: this.$route.params.id,
      })
      await this.getListDistrik({
        id_tso: this.$route.params.id,
      })
      await this.getListDistrikHirarki({
        id_tso: this.$route.params.id,
      })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
