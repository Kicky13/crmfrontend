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
            <strong class="align-self-center">List Bawahan</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="d-flex">
                <div class="align-self-center">
                  <span>Show :</span>
                </div>
                <a-select
                  :default-value="profileUser.itemsPerPage[1]"
                  class="mx-2"
                  @change="handlePaginationSize"
                >
                  <a-select-option
                    v-for="itemPerPage in profileUser.itemsPerPage"
                    :key="itemPerPage"
                  >
                    {{ itemPerPage }}
                  </a-select-option>
                </a-select>
                <div class="align-self-center">
                  <span>entries</span>
                </div>
              </div>
              <!-- <a-input-search placeholder="input search text" style="width: 200px" /> -->
            </div>
            <div class="table-responsive text-nowrap">
              <a-table
                :columns="profileUser.columns_bawahan"
                :data-source="profileUser.data_bawahan"
                :row-key="data => data.id"
                :pagination="profileUser.pagination"
                :loading="profileUser.loading"
              >
                <template #no="{ index }">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template #posisi_jabatan="{ text }">
                  <div>
                    {{ text.posisi_jabatan }}
                  </div>
                </template>
                <template #name="{ text }">
                  <div>
                    {{ text.nama_user }}
                  </div>
                </template>
                <template #start_date="{ text }">
                  <div>
                    {{ text.tanggal_menjabat }}
                  </div>
                </template>
                <template #end_date="{ text }">
                  <div>
                    {{ text.tanggal_selesai }}
                  </div>
                </template>
                <template #status="{ text }">
                  <div>
                    {{ text.status }}
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

export default {
  name: 'Profile',
  computed: {
    ...mapState({
      profileUser: state => state.profileUser.data,
    }),
  },
  async mounted() {
    await this.getListBawahanProfile()
  },

  methods: {
    ...mapActions('profileUser', ['getListBawahanProfile']),
  },
}
</script>
