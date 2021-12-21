<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Detail informasi</strong>
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
                  {{ $store.state.user.name }}
                </div>
                <div class="font-size-16">Kode / ID : {{ $store.state.user.userid }}</div>
                <!-- <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div> -->
                <div class="font-size-16">Email : {{ $store.state.user.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Posisi Saat ini : {{ $store.state.user.role }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Data Sales TSO</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
            </div>
            <a-collapse v-model="activeKey">
              <a-collapse-panel key="1" header="Data Sales">
                <a-table
                  :columns="profileUser.columns_tso"
                  :data-source="profileUser.data_sales_tso"
                  :row-key="data => data.idToko"
                  :pagination="profileUser.pagination"
                  :loading="profileUser.isLoading"
                >
                  <template #no="{ index }">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template #nama_toko="{ item }">
                    <div>
                      {{ item.namaToko }}
                    </div>
                  </template>
                  <template #telp_toko="{ item }">
                    <div>
                      {{ item.telpToko }}
                    </div>
                  </template>
                  <template #alamat_toko="{ item }">
                    <div>
                      {{ item.alamat ? item.alamat : `-` }}
                    </div>
                  </template>
                </a-table>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ['1'],
    }
  },

  computed: {
    ...mapState({
      profileUser: state => state.profileUser.data,
    }),
  },
  watch: {
    activeKey(key) {
      console.log(key)
    },
  },
  async mounted() {
    await this.getSalesTSO({
      idJabatan: this.$store.state.user.idJabatan ? this.$store.state.user.idJabatan : 0,
    })
  },

  methods: {
    ...mapActions('profileUser', ['getListBawahanProfile', 'getSalesTSO']),
  },
}
</script>
