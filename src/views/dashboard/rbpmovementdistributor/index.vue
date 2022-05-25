<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-body p-2">
        <!-- <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </div>
        </div> -->
        <a-row :gutter="[8, 8]" class="mb-3">
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Region"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="region"
              ref="region"
              @change="regionHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label overflow-hidden">
                  {{ values.length }} selected
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Provinsi"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="provinsi"
              no-options-text="List masih kosong"
              ref="provinsi"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
                </div>
              </template>
            </Multiselect>  
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Area"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="area"
              no-options-text="List masih kosong"
              ref="area"
              @change="areaHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Distrik"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="distrik"
              no-options-text="List masih kosong"
              ref="distrik"
              @change="distrikHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="5">
            <a-button type="primary" @click="showMetabaseResult" class="mb-3">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Tampilkan
            </a-button>
          </a-col>
          <a-col :xs="24" :md="7">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </a-col>
        </a-row>
        <iframe
          class="w-100"
          :src="rbpMovement.dataMetabase"
          frameborder="0"
          height="800"
          allowtransparency
        ></iframe>
        <!-- <iframe
          src="https://mtb.aksestoko.com/public/dashboard/47812e1e-1dc4-4c26-a2ee-e4b32541e8ab"
          frameborder="0"
          height="800"
          class="w-100 border-0 rounded"
          allowtransparency
        ></iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Multiselect,
  },
  computed: {
    ...mapState({
      filter: state => state.filter.data,
      rbpMovement: state => state.rbpMovement.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getMetabaseRBPMovement()
  },
  methods: {
    ...mapActions('rbpMovement', ['getMetabaseRBPMovement', 'getRegionList', 'getProvinsiList', 'getAreaList', 'getDistrikList', 'getDistributorList']),

    async handleRefresh() {
      await this.getMetabaseRBPMovement()
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>