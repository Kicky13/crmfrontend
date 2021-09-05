<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Daftar Pertanyaan {{list.jenis_penilaian}}</h5>
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
                <a>Hapus Jenis Penilaian</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="card-body">
      <a-collapse v-model="activeKey">
        <template
          v-for="(question, i) in list.pertanyaan"
          :key="i"
        >
          <a-collapse-panel :header="question">
            <div class="d-flex justify-content-between mb-2">
              <div>
                <a
                  class="fa fa-plus-circle fa-lg text-main align-self-center mr-2"
                  @click="showTambahOpsionalModal(question)"
                />
                <span class="align-self-center">Opsional Jawaban Atas Pertanyaan</span>
              </div>
              <div>
                <a
                  class="btn btn-warning fa fa-pencil-square-o mr-1"
                  @click="showEditPertanyaanModal(question)"
                />
                <i class="btn btn-outline-danger fa fa-trash" />
              </div>
            </div>
            <a-table
              :columns="columns"
              :data-source="dataSourceTable"
              :row-key="dataSourceTable => dataSourceTable.id"
              :pagination="false"
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
        </template>
      </a-collapse>
    </div>
  </div>
  <!-- Start of Edit Jenis Penilaian Modal -->
  <a-modal
    :visible="editJenisPenilaianModalVisible"
    title="Edit Jenis Penilaian"
    @ok="editJenisPenilaianModalHandleOk"
    @cancel="editJenisPenilaianModalVisible = false"
  >
    <a-form
      :label-col="{span: 6}"
      :wrapper-col="{span: 18}"
    >
      <a-form-item label="Jenis Penilaian">
        <a-input
          placeholder="Masukkan jenis penilaian"
          v-model:value="penilaianBaru"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- End of Edit Jenis Penilaian Modal -->
  <!-- Start of Tambah Pertanyaan Modal -->
  <a-modal
    :visible="tambahPertanyaanModalVisible"
    :title="`Tambah Pertanyaan [${list.jenis_penilaian}]`"
    @ok="tambahPertanyaanModalHandleOk"
    @cancel="tambahPertanyaanModalVisible = false"
  >
    <a-form
      :label-col="{span: 6}"
      :wrapper-col="{span: 18}"
    >
      <a-form-item label="Pertanyaan">
        <a-input
          placeholder="Masukkan pertanyaan"
          v-model:value="pertanyaanBaru"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- End of Tambah Pertanyaan Modal -->
  <!-- Start of Edit Pertanyaan Modal -->
  <a-modal
    :visible="editPertanyaanModalVisible"
    :title="`Edit Pertanyaan [${judulPertanyaan}]`"
    @ok="editPertanyaanModalHandleOk"
    @cancel="editPertanyaanModalVisible = false"
  >
    <a-form
      :label-col="{span: 6}"
      :wrapper-col="{span: 18}"
    >
      <a-form-item label="Pertanyaan">
        <a-input
          placeholder="Masukkan pertanyaan"
          v-model:value="pertanyaanBaru"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- End of Edit Pertanyaan Modal -->
  <!-- Start of Tambah Opsional Jawaban Modal -->
  <a-modal
    :visible="tambahOpsionalModalVisible"
    :title="`Tambah Opsional Jawaban [${judulPertanyaan}]`"
    @ok="tambahOpsionalModalHandleOk"
    @cancel="this.tambahOpsionalModalVisible = false"
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
          v-model:value="opsiBaru"
        />
      </a-form-item>
      <a-form-item
        label="Poin"
        label-align="left"
      >
        <a-input
          placeholder="Masukkan poin"
          v-model:value="pointBaru"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- End of Tambah Opsional Jawaban Modal -->
</template>

<script>
const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Jawaban',
    dataIndex: 'jawaban',
    key: 'jawaban',
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
  props: ['list'],
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      editJenisPenilaianModalVisible: false,
      tambahPertanyaanModalVisible: false,
      editPertanyaanModalVisible: false,
      tambahOpsionalModalVisible: false,
      penilaianBaru: '',
      pertanyaanBaru: '',
      idPenilaian: null,
      judulPertanyaan: '',
      tempData: {},
      dataSourceTable: [
        {
          no: 1,
          jawaban: 'Ya',
          point: 1,
        },
        {
          no: 2,
          jawaban: 'Tidak',
          point: 0,
        },
      ],
    }
  },
  methods: {
    // Start of Show Modal
    showEditJenisPenilaianModal() {
      this.editJenisPenilaianModalVisible = true
      this.penilaianBaru = this.list.jenis_penilaian
    },
    showTambahPertanyaanModal() {
      this.tambahPertanyaanModalVisible = true
    },
    showEditPertanyaanModal(pertanyaan) {
      this.editPertanyaanModalVisible = true
      this.judulPertanyaan = pertanyaan
    },
    showTambahOpsionalModal(pertanyaan) {
      this.tambahOpsionalModalVisible = true
      this.judulPertanyaan = pertanyaan
    },
    // End of Show Modal
    // Start of Handle Ok
    editJenisPenilaianModalHandleOk() {
      this.editJenisPenilaianModalVisible = false
      this.idPenilaian = this.list.id
      this.tempData.jenis_penilaian = this.penilaianBaru
      this.tempData.pertanyaan = this.list.pertanyaan
      this.$emit('updateSurvey', this.idPenilaian, this.tempData)
      this.resetAfterSubmit()
    },
    tambahPertanyaanModalHandleOk() {
      this.tambahPertanyaanModalVisible = false
      this.idPenilaian = this.list.id
      this.tempData = this.list
      this.tempData.pertanyaan.push(this.pertanyaanBaru)
      this.$emit('updatePertanyaan', this.idPenilaian, this.tempData)
      this.resetAfterSubmit()
    },
    editPertanyaanModalHandleOk() {
      this.editPertanyaanModalVisible = false
    },
    tambahOpsionalModalHandleOk() {
      this.tambahOpsionalModalVisible = false
    },
    // End of Handle Cancel
    resetAfterSubmit() {
      this.idPenilaian = null
      this.penilaianBaru = ''
      this.pertanyaanBaru = ''
      this.tempData = {}
    },
  },
}
</script>