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
    <div class="row">
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Mapping User</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/users.png')"
                  alt="Mary Stanform"
                />
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20">
                  {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">
                  Kode / ID : {{ userManagement.detail_jabatan.idUser }}
                </div>
                <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">Email : {{ userManagement.detail_jabatan.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Jenis User : {{ userManagement.detail_jabatan.namaJabatan }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header">
            <strong>Profile TSO</strong>
          </div>
          <div class="card-body">
            <a-form :model="profileTSO.formData" :rules="profileTSO.rules">
              <div class="row">
                <div class="col-xs-3 col-md-3">
                  <a-form-item label="" name="id_distrik">
                    <a-select
                      v-model:value="profileTSO.formData.id_distrik"
                      style="width: 10rem !important;"
                      class="col-lg-12 col-md-12 pr-2"
                      placeholder="Pilih Distrik"
                      show-search
                    >
                      <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                      <a-select-option
                        v-for="(item, index) in profileTSO.daftar_distrik"
                        :value="item.idDistrik"
                        :key="`distrik_${index}`"
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="item.namaDistrik"
                      >
                        {{ item.idDistrik }} - {{ item.namaDistrik }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-form-item label="" name="tgl_mulai">
                    <a-date-picker
                      v-model:value="profileTSO.formData.tgl_mulai"
                      :disabled-date="disabledStartDate"
                      placeholder="Tanggal Mulai"
                      style="width: 10rem !important;"
                    />
                  </a-form-item>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-form-item label="" name="tgl_akhir">
                    <a-date-picker
                      v-model:value="profileTSO.formData.tgl_akhir"
                      :disabled-date="disabledEndDate"
                      placeholder="Tanggal Akhir"
                      style="width: 10rem !important;"
                    />
                  </a-form-item>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-form-item>
                    <a-button html-type="submit" type="primary" @click="handleSubmit()">
                      <i class="fa fa-eye mr-2" />
                      Tambahkan
                    </a-button>
                  </a-form-item>
                </div>
              </div>
            </a-form>
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
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getListDistrik({
      id_tso: this.$route.params.id,
    })
    await this.getDetailProfile({
      id_jabatan: this.$route.params.id_jabatan,
    })
    await this.getListDistrikHirarki({
      id_tso: this.$route.params.id_jabatan,
    })
  },
  methods: {
    ...mapActions('profileTSO', [
      'getListDistrik',
      'getListDistrikHirarki',
      'deleteListDistrikHirarki',
      'addDistrikHirarki',
    ]),
    ...mapActions('userManagement', ['getDetailProfile']),
    disabledStartDate(startValue) {
      const endValue = this.profileTSO.formData.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.profileTSO.formData.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
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

            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)

            if (resolve) {
              this.getListDistrik({
                id_tso: this.$route.params.id,
              })
              this.getListDistrikHirarki({
                id_tso: this.$route.params.id,
              })
            }
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {},
      })
    },
    async handleSubmit() {
      if (
        this.profileTSO.formData.id_distrik &&
        this.profileTSO.formData.tgl_mulai &&
        this.profileTSO.formData.tgl_akhir
      ) {
        await this.addDistrikHirarki({
          id_tso: this.$route.params.id,
        })
      }

      await this.getListDistrik({
        id_tso: this.$route.params.id,
      })
      await this.getListDistrikHirarki({
        id_tso: this.$route.params.id,
      })
      this.$store.commit('profileTSO/changeProfileTSO', {
        formData: {
          id_distrik: null,
          tgl_mulai: '',
          tgl_akhir: '',
        },
      })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
