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
          <a-col :xs="24" :md="4">
            <!-- <Multiselect
              placeholder="Region"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="[
                {
                  label: '-- Select All --',
                  options: region,
                }
              ]"
              no-options-text="List kosong"
              @change="regionHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label overflow-hidden">
                  Region
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="4">
            <!-- <Multiselect
              placeholder="Provinsi"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="[
                {
                  label: '-- Select All --',
                  options: provinsi,
                }
              ]"
              no-options-text="List kosong"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Provinsi
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="4">
            <!-- <Multiselect
              placeholder="Area"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="[
                {
                  label: '-- Select All --',
                  options: area,
                }
              ]"
              no-options-text="List kosong"
              @change="areaHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Area
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Distrik"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="[
                {
                  label: '-- Select All --',
                  options: distrik,
                }
              ]"
              no-options-text="List kosong"
              @change="distrikHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Distrik
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Distributor"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="[
                {
                  label: '-- Select All --',
                  options: distributor,
                }
              ]"
              no-options-text="List kosong"
              @change="distributorHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Distributor
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="4">
            <!-- <a-button type="primary" @click="showMetabaseResult" class="mb-3">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Tampilkan
            </a-button> -->
          </a-col>
          <a-col :xs="24" :md="2">
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
// import Multiselect from '@vueform/multiselect'

export default {
  // components: {
  //   Multiselect,
  // },
  computed: {
    ...mapState({
      rbpMovement: state => state.rbpMovement.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    // await this.getMetabaseRBPMovement()
    await this.getData()
  },
  methods: {
    ...mapActions(
      'rbpMovement',
      [
        'getMetabaseRBPMovement',
        'getDataTso',
        'getDataDistributor',
      ],
    ),

    async handleRefresh() {
      // await this.getMetabaseRBPMovement()
      await this.getData()
    },

    async getData() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const roleUser = userData.role
      
      switch (roleUser) {
        case 'TSO':
          await this.getDataTso({
            id: userData.userid,
          })

          await this.getMetabaseRBPMovement({
            pdistrik: this.rbpMovement.getDataTsoResult.pdistrik,
            pdistributor: this.rbpMovement.getDataTsoResult.pdistributor,
          })
        break
        case 'Admin Dist':
          await this.getDataDistributor({
            id: userData.userid,
          })

          await this.getMetabaseRBPMovement({
            pdistrik: this.rbpMovement.getDataDistributorResult.pdistrik,
            pdistributor: this.rbpMovement.getDataDistributorResult.pdistributor,
          })
        break
        case 'Admin':
          await this.getMetabaseRBPMovement({
            pdistrik: [],
            pdistributor: [],
          })
        break
        default:
          await this.getMetabaseRBPMovement({
            pdistrik: [],
            pdistributor: [],
          })
      }
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
