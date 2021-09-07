<template>
  <div class="card border-radius-card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Daftar Pertanyaan {{ list.jenis_penilaian }}</h5>
      <div class="nav-item dropdown">
        <a-dropdown
          placement="bottomLeft"
          :trigger="['click']"
        >
          <a
            class="nav-link pt-sm-0"
            href="javascript: void(0);"
          >
            <i class="fa fa-list text-white" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click="tambahPertanyaanModalVisible = true">Tambah Pertanyaan</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="showEditJenisPenilaianModal">Edit Jenis Penilaian</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="hapusJenisPenilaian">Hapus Jenis Penilaian</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="card-body">
      <a-collapse
        v-model="activeKey"
        :bordered="false"
        style="background: white !important;"
        ref="collapseItems"
      >
        <a-collapse-panel
          v-for="(question, i) in list.pertanyaan"
          :key="i"
          :header="question.title"
          :style="customStyle"
        >
          <div class="d-flex justify-content-between mx-3">
            <a @click="showTambahOpsionalModal(i, question.title)">
              <i class="fa fa-plus-circle fa-lg text-main align-self-center mr-2" />
              <span class="align-self-center">Opsional Jawaban Atas Pertanyaan</span>
            </a>
            <div>
              <a
                class="btn btn-warning fa fa-pencil-square-o mr-1"
                @click="showEditPertanyaanModal(i, question.title)"
              />
              <a
                class="btn btn-outline-danger fa fa-trash"
                @click="hapusPertanyaan(i)"
              />
            </div>
          </div>
          <a-table
            :columns="columns"
            :data-source="question.jawaban"
            :row-key="i"
            :pagination="false"
            class="m-3"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action>
              <div>
                <i class="btn btn-warning fa fa-pencil-square-o mr-1" />
                <i class="btn btn-outline-danger fa fa-trash" />
              </div>
            </template>
          </a-table>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
  <!-- Tambah Pertanyaan Modal Start -->
  <vb-tambah-pertanyaan-modal
    :modal-visible="tambahPertanyaanModalVisible"
    :jenis-penilaian-title="list.jenis_penilaian"
    :new-pertanyaan="pertanyaan"
    @handle-ok="tambahPertanyaanModalHandleOk"
    @handle-cancel="tambahPertanyaanModalVisible = false"
  />
  <!-- Tambah Pertanyaan Modal End -->
  <!-- Start of Edit Jenis Penilaian Modal -->
  <vb-edit-jenis-penilaian-modal
    :modal-visible="editJenisPenilaianModalVisible"
    :new-jenis-penilaian="editJenisPenilaian"
    @handle-ok="editJenisPenilaianModalHandleOk"
    @handle-cancel="editJenisPenilaianModalVisible = false"
  />
  <!-- End of Edit Jenis Penilaian Modal -->
  <!-- Start of Edit Pertanyaan Modal -->
  <vb-edit-pertanyaan-modal
    :modal-visible="editPertanyaanModalVisible"
    :new-pertanyaan="editJenisPenilaian"
    @handle-ok="editPertanyaanModalHandleOk"
    @handle-cancel="editPertanyaanModalVisible = false"
  />
  <!-- End of Edit Pertanyaan Modal -->
  <!-- Start of Tambah Opsional Jawaban Modal -->
  <a-modal
    :visible="tambahOpsionalModalVisible"
    :title="`Tambah Opsional Jawaban [${judulPertanyaan}]`"
    @ok="tambahOpsionalModalHandleOk"
    @cancel="tambahOpsionalModalVisible = false"
  >
    <a-form
      :label-col="{span: 6}"
      :wrapper-col="{span: 18}"
    >
      <a-form-item
        label="Pertanyaan"
        label-align="left"
      >
        <a-input
          placeholder="Masukkan opsi jawaban"
          v-model:value="opsi"
        />
      </a-form-item>
      <a-form-item
        label="Poin"
        label-align="left"
      >
        <a-input
          placeholder="Masukkan poin"
          v-model:value="point"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- End of Tambah Opsional Jawaban Modal -->
</template>

<script>
import VbTambahPertanyaanModal from './modals/TambahPertanyaanModal'
import VbEditPertanyaanModal from './modals/EditPertanyaanModal'
import VbEditJenisPenilaianModal from './modals/EditJenisPenilaianModal'
import { notification } from 'ant-design-vue'

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Jawaban',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Point',
    dataIndex: 'point',
    key: 'point',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  components: {
    VbTambahPertanyaanModal,
    VbEditPertanyaanModal,
    VbEditJenisPenilaianModal,
  },
  props: {
    list: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  emits: [
    'tambahPertanyaan',
    'updateSurvey',
  ],
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      tambahPertanyaanModalVisible: false,
      editJenisPenilaianModalVisible: false,
      editPertanyaanModalVisible: false,
      tambahOpsionalModalVisible: false,
      pertanyaan: '',
      indexPertanyaan: null,
      editJenisPenilaian: '',
      opsi: '',
      point: '',
      customStyle: 'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      tempData: {},
      dataSourceTable: [],
    }
  },
  methods: {
    // Start of Show Modal
    showEditJenisPenilaianModal() {
      this.editJenisPenilaianModalVisible = true
      this.editJenisPenilaian = this.list.jenis_penilaian
    },
    showEditPertanyaanModal(i, pertanyaan) {
      this.editPertanyaanModalVisible = true
      this.indexPertanyaan = i
      this.editJenisPenilaian = pertanyaan
    },
    showTambahOpsionalModal(i, pertanyaan) {
      this.tambahOpsionalModalVisible = true
      this.indexPertanyaan = i
      this.judulPertanyaan = pertanyaan
    },
    // End of Show Modal
    // Start of Handle Ok
    tambahPertanyaanModalHandleOk(newPertanyaan) {
      const pertanyaanData = {}
      pertanyaanData.title = newPertanyaan
      pertanyaanData.jawaban = [
        {
          title: "Ya",
          point: 1,
        },
        {
          title: "Tidak",
          point: 0,
        },
      ]
      this.tempData = this.list
      this.tempData.pertanyaan.push(pertanyaanData)
      this.$emit('tambahPertanyaan', this.tempData.id, this.tempData)
      notification.success({
        message: 'Tambah Pertanyaan',
        description: 'Pertanyaan berhasil ditambah',
      })
      this.resetAfterSubmit()
      this.tambahPertanyaanModalVisible = false
    },
    editJenisPenilaianModalHandleOk(newJenisPenilaian) {
      this.tempData.id = this.list.id
      this.tempData.jenis_penilaian = newJenisPenilaian
      this.tempData.pertanyaan = this.list.pertanyaan
      this.$emit('updateSurvey', this.tempData.id, this.tempData)
      notification.success({
        message: 'Jenis Penilaian',
        description: 'Jenis penilaian berhasil diupdate',
      })
      this.resetAfterSubmit()
      this.editJenisPenilaianModalVisible = false
    },
    editPertanyaanModalHandleOk(newPertanyaan) {
      this.tempData.id = this.list.id
      this.tempData.jenis_penilaian = this.list.jenis_penilaian
      this.tempData.pertanyaan = this.list.pertanyaan
      this.tempData.pertanyaan[this.indexPertanyaan].title = newPertanyaan
      this.$emit('updatePertanyaan', this.tempData.id, this.tempData)
      notification.success({
        message: 'Edit Pertanyaan',
        description: 'Pertanyaan berhasil diupdate',
      })
      this.resetAfterSubmit()
      this.editPertanyaanModalVisible = false
    },
    tambahOpsionalModalHandleOk() {
      const opsi = {
        title: this.opsi,
        point: this.point,
      }
      this.tempData.id = this.list.id
      this.tempData.jenis_penilaian = this.list.jenis_penilaian
      this.tempData.pertanyaan = this.list.pertanyaan
      this.tempData.pertanyaan[this.indexPertanyaan].jawaban.push(opsi)
      this.$emit('tambahOpsi', this.tempData.id, this.tempData)
      notification.success({
        message: 'Tambah Opsi',
        description: 'Opsi berhasil ditambah',
      })
      this.resetAfterSubmit()
      this.tambahOpsionalModalVisible = false
    },
    // End of Handle Cancel
    hapusPertanyaan(i) {
      const list = this.$props.list
      const obj = this
      this.$confirm({
        title: 'Hapus Pertanyaan',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          list.pertanyaan.splice(i, 1)
          obj.$emit('hapusPertanyaan', list.id, list)
          notification.success({
            message: 'Hapus Pertanyaan',
            description: 'Pertanyaan berhasil dihapus',
          })
        },
      });
    },
    hapusJenisPenilaian() {
      const list = this.$props.list
      const obj = this
      this.$confirm({
        title: 'Hapus Jenis Penilaian',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          obj.$emit('hapusJenisPenilaian', list.id)
          notification.success({
            message: 'Hapus Jenis Penilaian',
            description: 'Jenis penilaian berhasil dihapus',
          })
        },
      });
    },
    resetAfterSubmit() {
      this.pertanyaan = ''
      this.tempData = {}
      this.editJenisPenilaian = ''
      this.indexPertanyaan = 0
    },
  },
}
</script>

<style scoped>
.border-radius-card {
  border-radius: 10px;
  overflow: hidden;
}
</style>