<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Otomatisasi Visit Plan</strong>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-3 col-md-3">
            <a-form-item label="Pilih Tahun">
              <a-select
                v-model:value="otomatisasiVisitPlan.body.tahun"
                @change="setSelectMethod"
                class="col-lg-12 col-md-12 pr-2"
                style="width: 100% !important"
                placeholder=" -- Tahun -- "
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
                  {{ tahun }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div class="col-xs-3 col-md-3">
            <a-form-item label="Pilih Bulan">
              <a-select
                v-model:value="otomatisasiVisitPlan.body.bulan"
                class="col-lg-12 col-md-12 pr-2"
                style="width: 100% !important"
                placeholder=" -- Bulan -- "
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option
                  v-for="(bulan, index) in otomatisasiVisitPlan.data_bulan"
                  :value="bulan.id"
                  :key="index"
                >
                  {{ bulan.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div class="col-xs-2 col-md-2">
            <a-button type="primary" class="mb-3" @click="handleOk()">
              <i class="fa fa-eye mr-2" />
              View
            </a-button>
          </div>
        </div>

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="otomatisasiVisitPlan.columns"
            :data-source="otomatisasiVisitPlan.list_data"
            :scroll="{ x: 1500 }"
            :loading="isLoading"
            row-key="id"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #status="{ text }">
              <div v-if="text.status == sukses">
                <a-tag color="green">{{ text }}</a-tag>
              </div>
              <div v-else-if="text.status == gagal">
                <a-tag color="red">{{ text }}</a-tag>
              </div>
              <div v-else-if="text.status == nonwpm">
                <a-tag color="yellow">{{ text }}</a-tag>
              </div>
            </template>
            <template #bulan="{ text }">
              <span>{{ getMonthName(text) }}</span>
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
  name: 'VbAntDesign',
  setup() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapState({
      otomatisasiVisitPlan: (state) => state.otomatisasiVisitPlan.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  mounted() {},
  methods: {
    ...mapActions('otomatisasiVisitPlan', ['getDataListOtomatisasi']),
    async handleOk() {
      if (
        this.otomatisasiVisitPlan.body.bulan === null &&
        this.otomatisasiVisitPlan.body.tahun === null
      ) {
        notification.error({
          message: 'Error',
          description: 'Tahun dan bulan tidak boleh kosong !',
        })
      } else {
        this.isLoading = true
        await this.getDataListOtomatisasi()
        notification.success({
          message: 'Success',
          description: 'Data berhasil ditampilkan!',
        })
        this.isLoading = false
      }
    },
    getMonthName(month) {
      const dataSource = [...this.otomatisasiVisitPlan.data_bulan]
      const filtered = dataSource.filter((x) => x.id == month)

      return filtered[0].name
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
