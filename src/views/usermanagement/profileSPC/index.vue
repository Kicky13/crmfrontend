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
                  {{
                    userManagement.detail_jabatan.namaUser
                      ? userManagement.detail_jabatan.namaUser
                      : 'Belum Tersedia'
                  }}
                </div>
                <div class="font-size-16">
                  Kode / ID :
                  {{
                    userManagement.detail_jabatan.idUser
                      ? userManagement.detail_jabatan.idUser
                      : '-'
                  }}
                </div>
                <!-- <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div> -->
                <div class="font-size-16">
                  Email :
                  {{
                    userManagement.detail_jabatan.email ? userManagement.detail_jabatan.email : '-'
                  }}
                </div>
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
            <a-form :model="profileSPC.formData" :rules="profileSPC.rules">
              <div class="row mb-4">
                <div class="col-xs-3 col-md-3">
                  <a-select
                    v-model:value="profileSPC.formData.id_distrik"
                    class="w-100"
                    placeholder="Pilih Distrik"
                    show-search
                  >
                    <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                    <a-select-option
                      v-for="(item, index) in profileSPC.daftar_distrik"
                      :value="item.idDistrik"
                      :key="`distrik_${index}`"
                      data-toggle="tooltip"
                      data-placement="top"
                      :title="item.namaDistrik"
                    >
                      {{ item.idDistrik }} - {{ item.namaDistrik }}
                    </a-select-option>
                  </a-select>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-form-item label="" name="tgl_mulai">
                    <!-- <a-date-picker
                      v-model:value="profileTSO.formData.tgl_mulai"
                      :disabled-date="disabledStartDate"
                      format="DD-MM-YYYY"
                      placeholder="Tanggal Mulai"
                      style="width: 10rem !important;"
                    /> -->
                    <datepicker></datepicker>
                    <vue-datepicker
                      class="ant-calendar-picker ant-calendar-picker-input ant-input"
                      v-model="profileSPC.formData.tgl_mulai"
                      placeholder="Tanggal Mulai"
                      input-format="dd-MM-yyyy"
                    />
                  </a-form-item>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-form-item label="" name="tgl_akhir">
                    <!-- <a-date-picker
                      v-model:value="profileTSO.formData.tgl_akhir"
                      :disabled-date="disabledEndDate"
                      placeholder="Tanggal Akhir"
                      format="DD-MM-YYYY"
                      style="width: 10rem !important;"
                    /> -->
                    <datepicker></datepicker>

                    <vue-datepicker
                      class="ant-calendar-picker ant-calendar-picker-input ant-input"
                      v-model="profileSPC.formData.tgl_akhir"
                      placeholder="Tanggal Akhir"
                      input-format="dd-MM-yyyy"
                    />
                  </a-form-item>
                </div>
                <div class="col-xs-3 col-md-3">
                  <a-button html-type="submit" type="primary" @click="handleSubmit()">
                    <i class="fa fa-eye mr-2" />
                    Tambahkan
                  </a-button>
                </div>
              </div>
            </a-form>
            <div class="table-responsive text-nowrap">
              <a-table
                :columns="profileSPC.columns"
                :data-source="profileSPC.list_distrik_bawahan"
                :row-key="data => data.idDistrik"
                :loading="profileSPC.isLoading"
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
                      @click="openModalDelete(text.idDistrik)"
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
    <a-modal
      v-model:visible="modalDeleteView"
      :title="`Kosongkan`"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="modalDeleteView = false">Batal</a-button>
        <a-button @click="deleteRow()" key="submit" type="primary">Hapus</a-button>
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Tanggal Akhir" name="Tanggal Akhir">
          <datepicker></datepicker>
          <vue-datepicker
            class="ant-calendar-picker ant-calendar-picker-input ant-input"
            v-model="profileSPC.formData.tgl_akhir"
            placeholder="Tanggal Akhir"
            input-format="dd-MM-yyyy"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import VueDatepicker from 'vue3-datepicker'

export default {
  name: 'ProfileSPC',
  components: {
    VueDatepicker,
  },
  setup() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    }
  },

  data() {
    return {
      modalDeleteView: false,
      data_distrik: '',
    }
  },

  computed: {
    ...mapState({
      profileSPC: state => state.profileSPC.data,
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getListDistrik({
      id_tso: this.$route.params.id_jabatan,
    })
    await this.getDetailProfile({
      id_jabatan: this.$route.params.id_jabatan,
    })
    await this.getListDistrikHirarki({
      id_tso: this.$route.params.id_jabatan,
    })
  },
  methods: {
    ...mapActions('profileSPC', [
      'getListDistrik',
      'getListDistrikHirarki',
      'deleteListDistrikHirarki',
      'addDistrikHirarki',
    ]),
    ...mapActions('userManagement', ['getDetailProfile']),
    openModalDelete(id_distriks) {
      this.modalDeleteView = true
      this.data_distrik = id_distriks
    },
    disabledStartDate(startValue) {
      const endValue = this.profileSPC.formData.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.profileSPC.formData.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    async deleteRow() {
      await this.deleteListDistrikHirarki({
        id_tso: this.$route.params.id_jabatan,
        id_distrik: this.data_distrik,
      })
      await this.getListDistrik({
        id_tso: this.$route.params.id_jabatan,
      })
      await this.getListDistrikHirarki({
        id_tso: this.$route.params.id_jabatan,
      })
      this.$store.commit('profileSPC/changeProfileTSO', {
        formData: {
          tgl_akhir: '',
        },
      })
      this.modalDeleteView = false
    },
    async handleSubmit() {
      if (this.profileSPC.formData.id_distrik) {
        await this.addDistrikHirarki({
          id_tso: this.$route.params.id_jabatan,
        })
      }
      await this.getListDistrik({
        id_tso: this.$route.params.id_jabatan,
      })
      await this.getListDistrikHirarki({
        id_tso: this.$route.params.id_jabatan,
      })
      this.$store.commit('profileSPC/changeProfileTSO', {
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
