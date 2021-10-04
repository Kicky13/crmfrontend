<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex justify-content-between">
        <strong class="align-self-center">Mahasiswa</strong>
        <a-button
          type="primary"
          @click="showModalTambah"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Mahasiswa
        </a-button>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="dataSourceTable"
            row-key="id"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="showModalEdit(text)"
                >
                  <i class="fa fa-pencil-square-o"></i>
                  <span class="text-black">Ubah</span>
                </button>
                <button
                  @click="deleteConfirm(text)"
                  type="button"
                  class="btn btn-outline-danger"
                >
                  <i class="fa fa-trash"></i>
                  <span>Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <a-modal
          v-model:visible="modalVisible"
          title="Form Tambah Mahasiswa"
          :confirm-loading="confirmLoading"
          @ok="statusModal ? handleUpdate() : handleOk()"
        >
          <a-form
            :model="mahasiswa"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-form-item
              label="NIM"
              label-align="left"
            >
              <a-input v-model:value="mahasiswa.nim" />
            </a-form-item>
            <a-form-item
              label="Nama"
              label-align="left"
            >
              <a-input v-model:value="mahasiswa.nama" />
            </a-form-item>
            <a-form-item
              label="Jurusan"
              label-align="left"
            >
              <a-select
                v-model:value="mahasiswa.jurusan"
                @change="jurusanSelected"
                placeholder=" -- Pilih Jurusan -- "
              >
                <a-select-option
                  disabled
                  value=""
                >
                  Pilih Salah Satu
                </a-select-option>
                <a-select-option
                  v-for="(jurusan, i) in listJurusan"
                  :value="jurusan"
                  :key="i"
                >
                  {{ jurusan }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getListMahasiswa,
  addMahasiswa,
  getMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from '@/services/connection/mahasiswa/api'

const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'NIM',
    dataIndex: 'nim',
    key: 'nim',
  },
  {
    title: 'Nama Mahasiswa',
    dataIndex: 'nama',
    key: 'nama',
  },
  {
    title: 'Jurusan',
    dataIndex: 'jurusan',
    key: 'jurusan',
  },
  {
    title: 'Aksi',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      modalVisible: false,
      mahasiswa: {
        nim: '',
        nama: '',
        jurusan: '',
      },
      dataSourceTable: [],
      listJurusan: [
        'Teknik Informatika',
        'Sistem Informasi',
        'Teknik Industri',
        'Desain Produk',
      ],
      modalStatus: false,
      getId: null,
    }
  },
  mounted() {
    this.fetchGetListMahasiswa()
  },
  methods: {
    showModalTambah() {
      this.resetInput()
      this.modalVisible = true
      this.statusModal = false
    },
    showModalEdit(id) {
      this.modalVisible = true
      this.statusModal = true
      this.getId = id
      this.getMahasiswaById(this.getId)
    },
    fetchGetListMahasiswa() {
      getListMahasiswa()
      .then((response) => {
        if (response) {
          this.dataSourceTable = response
        }
      })
      .catch((err) => {
        console.error(err)
      })
    },
    addNewMahasiswa(data) {
      addMahasiswa(data)
      .then(response => {
        console.log(response)
        this.fetchGetListMahasiswa()
      })
    },
    getMahasiswaById(id) {
      getMahasiswa(id)
      .then(response => {
        this.mahasiswa.nim = response.nim
        this.mahasiswa.nama = response.nama
        this.mahasiswa.jurusan = response.jurusan
      })
    },
    updateMahasiswaById(id, data) {
      updateMahasiswa(id, data)
      .then(response => {
        console.log(response)
        this.fetchGetListMahasiswa()
      })
    },
    deleteMahasiswaById(id) {
      deleteMahasiswa(id)
      .then(response => {
        console.log(response)
        this.fetchGetListMahasiswa()
      })
    },
    handleOk() {
      const data = {
        nim: this.mahasiswa.nim,
        nama: this.mahasiswa.nama,
        jurusan: this.mahasiswa.jurusan,
      }
      this.addNewMahasiswa(data)
      this.modalVisible = false
    },
    handleUpdate() {
      const data = {
        nim: this.mahasiswa.nim,
        nama: this.mahasiswa.nama,
        jurusan: this.mahasiswa.jurusan,
      }
      this.updateMahasiswaById(this.getId, data)
      this.modalVisible = false
    },
    deleteConfirm(id) {
      const deleteMahasiswaMethod = this.deleteMahasiswaById
      this.$confirm({
        title: 'Hapus Mahasiswa',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        cancelText: 'Batal',
        okType: 'primary',
        onOk() {
          deleteMahasiswaMethod(id)
        },
      });
    },
    resetInput() {
      this.mahasiswa = {
        nim: '',
        nama: '',
        jurusan: '',
      }
    },
  },
}
</script>

