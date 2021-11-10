<template>
  <div class="card card-radius">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Daftar Pertanyaan {{ list.jenis_penilaian }}</h5>
      <Can do="update" on="Survey Sales">
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
      </Can>
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
            :header="question.judul"
            :style="customStyle"
          >
            <div class="d-flex justify-content-between mx-3 mt-3">
              <a @click="showTambahOpsionalJawabanModal(list, question)">
                <i class="fa fa-plus-circle fa-lg text-main align-self-center mr-2" />
                <span class="align-self-center">Opsional Jawaban Atas Pertanyaan</span>
              </a>
              <div>
                <a
                  class="btn btn-warning fa fa-pencil-square-o mr-1"
                  @click="showEditPertanyaanModal(question)"
                />
                <a
                  class="btn btn-outline-danger fa fa-trash"
                  @click="deleteConfirm(
                    'Hapus Pertanyaan',
                    'Pertanyaan berhasil dihapus',
                    () => hapusPertanyaan(question)
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
                    @click="showEditOpsionalJawabanModal(question.jawaban, text)"
                  />
                  <a
                    class="btn btn-outline-danger fa fa-trash"
                    @click="deleteConfirm(
                      'Hapus Opsional Jawaban',
                      'Opsional jawaban berhasil dihapus',
                      () => hapusJawaban(text)
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
    :jenis-penilaian-title="jenisPenilaian"
    @handle-ok="pertanyaanModalHandleOk"
    @handle-cancel="pertanyaanModalVisible = false"
  />
  <!-- End of Tambah Pertanyaan Modal End -->
  <!-- Start of Tambah Opsional Jawaban Modal -->
  <vb-opsional-jawaban-modal
    :modal-visible="opsionalJawabanModalVisible"
    :modal-status="opsionalJawabanModalStatus"
    :pertanyaan-title="judulPertanyaan"
    :new-jawaban="jawaban"
    :new-poin="poin"
    @handle-ok="opsionalJawabanModalHandleOk"
    @handle-cancel="opsionalJawabanModalVisible = false"
  />
  <!-- End of Tambah Opsional Jawaban Modal -->
</template>

<script>
import VbPertanyaanModal from './modals/PertanyaanModal'
import VbEditJenisPenilaianModal from './modals/EditJenisPenilaianModal'
import VbOpsionalJawabanModal from './modals/TambahOpsionalJawabanModal'
import { notification } from 'ant-design-vue'

const columns = [
  {
    title: 'Jawaban',
    dataIndex: 'judul',
    key: 'judul',
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
    VbOpsionalJawabanModal,
  },
  props: {
    list: {
      type: Object,
      default: function () {
        return {}
      },
    },
    loading: {
      type: Boolean,
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
      opsionalJawabanModalStatus: true,
      opsionalJawabanModalVisible: false,
      editJenisPenilaianModalVisible: false,
      jenisPenilaian: '',
      pertanyaan: '',
      jawaban: '',
      poin: '',
      judulPertanyaan: '',
      indexJawaban: null,
      indexPertanyaan: null,
      activeKey: '',
      customStyle: 'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      tempData: {},
      dataSourceTable: [],
      idJenisPenilaian: '',
      idPertanyaan: '',
      idJawaban: '',
      jenisPenilaianObj: null,
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
      this.jenisPenilaian = this.list.jenis_penilaian
      this.pertanyaanModalStatus = true
      this.pertanyaanModalVisible = true
    },
    showEditPertanyaanModal({ key, judul }) {
      this.idPertanyaan = key
      this.pertanyaan = judul
      this.pertanyaanModalStatus = false
      this.pertanyaanModalVisible = true
    },
    showTambahOpsionalJawabanModal({ id }, pertanyaan) {
      this.jawaban = ''
      this.poin = ''
      this.idJenisPenilaian = id
      this.idPertanyaan = pertanyaan.key
      this.judulPertanyaan = pertanyaan.judul
      this.opsionalJawabanModalStatus = true
      this.opsionalJawabanModalVisible = true
    },
    showEditOpsionalJawabanModal(listJawaban, key) {
      const opsiJawaban = listJawaban.find(jawaban => jawaban.key === key)
      this.idJawaban = opsiJawaban.key
      this.jawaban = opsiJawaban.judul
      this.poin = opsiJawaban.poin
      this.opsionalJawabanModalStatus = false
      this.opsionalJawabanModalVisible = true
    },
    // ========== End of Show Modal ==========
    // ========== Start of Handle Ok ==========
    pertanyaanModalHandleOk(status, newPertanyaan) {
      let message = ''
      let description = ''
      if (status) {
        let check = newPertanyaan.trim()
        if (check) {
          this.tambahPertanyaanModalHandleOk(check)
          message = 'Tambah Pertanyaan'
          description = 'Pertanyaan berhasil ditambah'
        } else {
          notification.error({
            message: 'Tambah Pertanyaan',
            description: 'Kolom tambah pertanyaan masih kosong',
          })

          return false
        }
      } else {
        this.editPertanyaanModalHandleOk(newPertanyaan)
        message = 'Edit Pertanyaan'
        description = 'Pertanyaan berhasil diupdate'
      }
      notification.success({
        message,
        description,
      })
      this.pertanyaan = ''
      this.indexPertanyaan = null
      this.pertanyaanModalVisible = false
    },
    opsionalJawabanModalHandleOk(status, newJawaban) {
      let message = ''
      let description = ''
      if (status) {
        let check = {
          jawaban: newJawaban.jawaban.trim(),
          poin: newJawaban.poin.trim(),
        }
        if (check.jawaban && check.poin) {
          this.tambahOpsionalJawabanModalHandleOk(check)
          message = 'Tambah Opsional Jawaban'
          description = 'Opsional jawaban berhasil ditambah'
        } else {
          notification.error({
            message: 'Tambah Opsional Jawaban',
            description: 'Kolom tambah jawaban atau poin masih kosong',
          })

          return false
        }
      } else {
        this.editOpsionalJawabanModalHandleOk(newJawaban)
        message = 'Edit Opsional Jawaban'
        description = 'Opsional jawaban berhasil diupdate'
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
      const dataForm = {}
      dataForm.mode = 2
      dataForm.id_penilaian = this.list.id
      dataForm.nm_pertanyaan = newPertanyaan
      this.$emit('addPertanyaan', dataForm)
    },
    editPertanyaanModalHandleOk(newPertanyaan) {
      const dataForm = {}
      dataForm.mode = 2
      dataForm.id = this.idPertanyaan
      dataForm.judul = newPertanyaan
      this.$emit('updatePertanyaan', dataForm)
    },
    editJenisPenilaianModalHandleOk(newJenisPenilaian) {
      const dataForm = {}
      dataForm.mode = 1
      dataForm.id = this.list.id
      dataForm.judul = newJenisPenilaian
      this.$emit('updateJenisPenilaian', dataForm)
      notification.success({
        message: 'Jenis Penilaian',
        description: 'Jenis penilaian berhasil diupdate',
      })
      this.editJenisPenilaianModalVisible = false
    },
    tambahOpsionalJawabanModalHandleOk(newJawaban) {
      const dataForm = {}
      dataForm.mode = 3
      dataForm.id_penilaian = this.idJenisPenilaian
      dataForm.id_pertanyaan = this.idPertanyaan
      dataForm.nm_jawaban = newJawaban.jawaban
      dataForm.poin = newJawaban.poin
      this.$emit('addJawaban', dataForm)
      this.indexJawaban = null
      this.judulPertanyaan = ''
      this.tambahOpsionalJawabanVisible = false
    },
    editOpsionalJawabanModalHandleOk(newJawaban) {
      const dataForm = {}
      dataForm.mode = 3
      dataForm.id = this.idJawaban
      dataForm.judul = newJawaban.jawaban
      dataForm.poin = newJawaban.poin
      console.log(dataForm)
      this.$emit('updateJawaban', dataForm)
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
      const dataForm = {}
      dataForm.mode = 1
      dataForm.id = this.list.id
      this.$emit('deleteJenisPenilaian', dataForm)
    },
    hapusPertanyaan({ key }) {
      const dataForm = {}
      dataForm.mode = 2
      dataForm.id = key
      this.$emit('deletePertanyaan', dataForm)
      this.activeKey = ''
    },
    hapusJawaban(key) {
      const dataForm = {}
      dataForm.mode = 3
      dataForm.id = key
      this.$emit('deleteJawaban', dataForm)
    },
    // ========== End of Delete Modal ==========
    changeActiveKey(key) {
      this.activeKey = key
    },
  },
}
</script>

<style>
.card-radius {
  border-radius: 10px;
  overflow: hidden;
}
</style>