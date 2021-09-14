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
                <a @click="showTambahPertanyaanModal">Tambah Pertanyaan</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="showEditJenisPenilaianModal">Edit Jenis Penilaian</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="deleteConfirm
                (
                  'Hapus Jenis Penilaian',
                  'Jenis penilaian berhasil dihapus',
                  hapusJenisPenilaian
                )"
                >
                  Hapus Jenis Penilaian
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="card-body">
      <a-collapse
        accordion
        style="background: white !important;"
        :bordered="false"
        :active-key="activeKey"
        @change="changeActiveKey"
      >
        <template
          v-for="(question, i) in list.pertanyaan"
          :key="String(i)"
        >
          <a-collapse-panel
            :header="question.title"
            :style="customStyle"
          >
            <div class="d-flex justify-content-between mx-3">
              <a @click="showTambahJawabanModal(i, question.title)">
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
                  @click="deleteConfirm(
                    'Hapus Pertanyaan',
                    'Pertanyaan berhasil dihapus',
                    () => hapusPertanyaan(i)
                  )"
                />
              </div>
            </div>
            <a-table
              class="m-3"
              :columns="columns"
              :data-source="question.jawaban"
              :row-key="i"
              :pagination="false"
            >
              <template #name="{ text }">
                <a href="javascript:;">{{ text }}</a>
              </template>
              <template #action="{ text }">
                <div>
                  <a
                    class="btn btn-warning fa fa-pencil-square-o mr-1"
                    @click="showEditOpsionalJawabanModal(i, question.title, text)"
                  />
                  <a
                    class="btn btn-outline-danger fa fa-trash"
                    @click="deleteConfirm(
                      'Hapus Opsional Jawaban',
                      'Opsional jawaban berhasil dihapus',
                      () => hapusJawaban(i, text)
                    )"
                  />
                </div>
              </template>
            </a-table>
          </a-collapse-panel>
        </template>
      </a-collapse>
    </div>
  </div>
  <!-- Start of Edit Jenis Penilaian Modal -->
  <vb-edit-jenis-penilaian-modal
    :modal-visible="editJenisPenilaianModalVisible"
    :new-jenis-penilaian="jenisPenilaian"
    @handle-ok="editJenisPenilaianModalHandleOk"
    @handle-cancel="editJenisPenilaianModalVisible = false"
  />
  <!-- End of Edit Jenis Penilaian Modal -->
  <!-- Start of Tambah Pertanyaan Modal -->
  <vb-pertanyaan-modal
    :modal-visible="pertanyaanModalVisible"
    :modal-status="pertanyaanModalStatus"
    :new-pertanyaan="pertanyaan"
    :jenis-penilaian-title="list.jenis_penilaian"
    @handle-ok="pertanyaanModalHandleOk"
    @handle-cancel="pertanyaanModalVisible = false"
  />
  <!-- End of Tambah Pertanyaan Modal End -->
  <!-- Start of Tambah Opsional Jawaban Modal -->
  <vb-tambah-opsional-jawaban-modal
    :modal-visible="tambahOpsionalJawabanVisible"
    :pertanyaan-title="judulPertanyaan"
    :new-jawaban="jawaban"
    :new-poin="poin"
    @handle-ok="tambahOpsionalModalHandleOk"
    @handle-cancel="tambahOpsionalJawabanVisible = false"
  />
  <!-- End of Tambah Opsional Jawaban Modal -->
  <!-- Start of Edit Opsional Jawaban Modal -->
  <vb-edit-opsional-jawaban-modal
    :modal-visible="editOpsionalJawabanModalVisible"
    :pertanyaan-title="judulPertanyaan"
    :new-jawaban="jawaban"
    :new-poin="poin"
    @handle-ok="editOpsionalJawabanModalHandleOk"
    @handle-cancel="editOpsionalJawabanModalVisible = false"
  />
  <!-- End of Edit Opsional Jawaban Modal -->
</template>

<script>
import VbPertanyaanModal from './modals/PertanyaanModal'
import VbEditJenisPenilaianModal from './modals/EditJenisPenilaianModal'
import VbTambahOpsionalJawabanModal from './modals/TambahOpsionalJawabanModal'
import VbEditOpsionalJawabanModal from './modals/EditOpsionalJawabanModal'
import { notification } from 'ant-design-vue'

const columns = [
  {
    title: 'Jawaban',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Poin',
    dataIndex: 'poin',
    key: 'poin',
  },
  {
    title: 'Action',
    dataIndex: 'key',
    key: 'key',
    slots: { customRender: 'action' },
  },
]

export default {
  components: {
    VbPertanyaanModal,
    VbEditJenisPenilaianModal,
    VbTambahOpsionalJawabanModal,
    VbEditOpsionalJawabanModal,
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
    'updateJenisPenilaian',
    'deleteJenisPenilaian',
    'addPertanyaan',
    'updatePertanyaan',
    'deletePertanyaan',
    'addJawaban',
    'updateJawaban',
    'deleteJawaban',
  ],
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      pertanyaanModalStatus: true,
      pertanyaanModalVisible: false,
      tambahOpsionalJawabanVisible: false,
      editOpsionalJawabanModalVisible: false,
      editJenisPenilaianModalVisible: false,
      pertanyaan: '',
      jenisPenilaian: '',
      jawaban: '',
      poin: '',
      judulPertanyaan: '',
      indexJawaban: null,
      indexPertanyaan: null,
      activeKey: '',
      customStyle: 'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      tempData: {},
      dataSourceTable: [],
    }
  },
  methods: {
    // ========== Start of Show Modal ==========
    showEditJenisPenilaianModal() {
      this.editJenisPenilaianModalVisible = true
      this.jenisPenilaian = this.list.jenis_penilaian
    },
    showTambahPertanyaanModal() {
      this.pertanyaan = ''
      this.pertanyaanModalStatus = true
      this.pertanyaanModalVisible = true
    },
    showEditPertanyaanModal(index, pertanyaan) {
      this.indexPertanyaan = index
      this.pertanyaan = pertanyaan
      this.pertanyaanModalStatus = false
      this.pertanyaanModalVisible = true
    },
    showTambahJawabanModal(index, pertanyaan) {
      this.jawaban = ''
      this.poin = ''
      this.tambahOpsionalJawabanVisible = true
      this.indexPertanyaan = index
      this.judulPertanyaan = pertanyaan
    },
    showEditOpsionalJawabanModal(index, pertanyaan, key) {
      this.editOpsionalJawabanModalVisible = true
      this.indexPertanyaan = index
      this.judulPertanyaan = pertanyaan
      const indexJawaban = this.list.pertanyaan[index].jawaban.map(pertanyaan => pertanyaan.key).indexOf(key)
      const jawaban = this.list.pertanyaan[index].jawaban[indexJawaban]
      this.indexJawaban = indexJawaban
      this.jawaban = jawaban.title
      this.poin = jawaban.poin
    },
    // ========== End of Show Modal ==========
    // ========== Start of Handle Ok ==========
    pertanyaanModalHandleOk(status, newPertanyaan) {
      let message = ''
      let description = ''
      if (status) {
        this.tambahPertanyaanModalHandleOk(newPertanyaan)
        message = 'Tambah Pertanyaan'
        description = 'Pertanyaan berhasil ditambah'
      } else {
        this.editPertanyaanModalHandleOk(newPertanyaan)
        message = 'Edit Pertanyaan'
        description = 'Pertanyaan berhasil diedit'
      }
      notification.success({
        message,
        description,
      })
      this.pertanyaan = ''
      this.indexPertanyaan = null
      this.pertanyaanModalVisible = false
    },
    tambahPertanyaanModalHandleOk(newPertanyaan) {
      const dataForm = this.list
      const pertanyaanData = {
        title: newPertanyaan,
        jawaban: [
          {
            title: "Ya",
            poin: "1",
            key: 1,
          },
          {
            title: "Tidak",
            poin: "0",
            key: 2,
          },
        ],
      }
      dataForm.pertanyaan.push(pertanyaanData)
      this.$emit('addPertanyaan', dataForm.id, dataForm)
    },
    editPertanyaanModalHandleOk(newPertanyaan) {
      const dataForm = this.list
      dataForm.pertanyaan[this.indexPertanyaan].title = newPertanyaan
      this.$emit('updatePertanyaan', dataForm.id, dataForm)
    },

    editJenisPenilaianModalHandleOk(newJenisPenilaian) {
      const dataForm = this.list
      dataForm.jenis_penilaian = newJenisPenilaian
      this.$emit('updateJenisPenilaian', dataForm.id, dataForm)
      notification.success({
        message: 'Jenis Penilaian',
        description: 'Jenis penilaian berhasil diupdate',
      })
      this.editJenisPenilaianModalVisible = false
    },
    tambahOpsionalModalHandleOk(newJawaban) {
      const dataForm = this.list
      const lastJawabanIndex = dataForm.pertanyaan[this.indexPertanyaan].jawaban.length - 1
      const jawaban = {
        title: newJawaban.jawaban,
        poin: newJawaban.poin,
      }
      jawaban.key = dataForm.pertanyaan[this.indexPertanyaan].jawaban[lastJawabanIndex].key + 1
      dataForm.pertanyaan[this.indexPertanyaan].jawaban.push(jawaban)
      this.$emit('addJawaban', dataForm.id, dataForm)
      notification.success({
        message: 'Tambah Opsi Jawaban',
        description: 'Opsi jawaban berhasil ditambah',
      })
      this.indexJawaban = null
      this.judulPertanyaan = ''
      this.tambahOpsionalJawabanVisible = false
    },
    editOpsionalJawabanModalHandleOk(data) {
      const dataForm = this.list
      dataForm.pertanyaan[this.indexPertanyaan].jawaban[this.indexJawaban].title = data.jawaban
      dataForm.pertanyaan[this.indexPertanyaan].jawaban[this.indexJawaban].poin = data.poin
      this.$emit('updateJawaban', dataForm.id, dataForm)
      notification.success({
        message: 'Edit Opsi Jawaban',
        description: 'Opsi jawaban berhasil diupdate',
      })
      this.judulPertanyaan = ''
      this.indexPertanyaan = null
      this.indexJawaban = null
      this.editOpsionalJawabanModalVisible = false
    },
    // ========== End of Handle Ok ==========
    // ========== Start of Delete Modal ==========
    deleteConfirm(title, description, deleteType) {
      this.$confirm({
        title,
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteType()
          notification.success({
            message: title,
            description,
          })
        },
      });
    },
    hapusJenisPenilaian() {
      const list = this.list
      this.$emit('deleteJenisPenilaian', list.id)
    },
    hapusPertanyaan(index) {
      const list = this.list
      list.pertanyaan.splice(index, 1)
      this.$emit('deletePertanyaan', list.id, list)
      this.activeKey = ''
    },
    hapusJawaban(index, key) {
      const list = this.list
      const indexPertanyaan = list.pertanyaan[index].jawaban.map(pertanyaan => pertanyaan.key).indexOf(key)
      list.pertanyaan[index].jawaban.splice(indexPertanyaan, 1)
      this.$emit('deleteJawaban', list.id, list)
    },
    // ========== End of Delete Modal ==========
    changeActiveKey(key) {
      this.activeKey = key
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