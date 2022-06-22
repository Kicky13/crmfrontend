<template>
  <div class="card card-radius">
    <div class="card-header bg-primary text-white d-flex justify-content-between">
      <h5 class="text-white">Sesi Penilaian</h5>
      <Can do="create" on="SurveySales">
        <div class="nav-item dropdown">
          <a-dropdown placement="bottomLeft" :trigger="['click']">
            <a class="nav-link pt-sm-0" href="javascript: void(0);">
              <i class="fa fa-list text-white" />
            </a>
            <template #overlay>
              <a-menu>
                <Can do="create" on="SurveySales">
                  <a-menu-item @click="modalVisible = true">
                    Tambah Sesi
                  </a-menu-item>
                </Can>
                <Can v-if="list.length != 0" do="update" on="SurveySales">
                  <a-menu-item @click="updateSesiHandle">
                    Update Sesi Penilaian
                  </a-menu-item>
                </Can>
                <Can v-if="list.length != 0" do="delete" on="SurveySales">
                  <a-menu-item
                    @click="deleteConfirm(
                      'Hapus Sesi Penilaian',
                      'Sesi penilaian berhasil dihapus',
                      hapusSesiPenilaian,
                    )
                  ">
                    Hapus Sesi Penilaian
                  </a-menu-item>
                </Can>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </Can>
    </div>
    <div class="card-body">
      <div v-if="list.length == 0" class="text-center text-danger font-italic">-- Sesi penilaian kosong --</div>
      <a-collapse
        v-else
        accordion
        style="background: white !important"
        :bordered="false"
        @change="changeActiveKey"
      >
        <template v-for="(sesi, i) in list" :key="i + 1">
          <a-collapse-panel
            class="text-center"
            :class="i + 1 == getActiveMenu ? { active: true } : { active: false }"
            :header="`${sesi.nm_sesi_penilaian_sales}`"
            :show-arrow="false"
            :style="customStyle"
          />
        </template>
      </a-collapse>
    </div>
  </div>
  <vb-tambah-sesi-penilaian-modal
    :modal-visible="modalVisible"
    :new-sesi-penilaian="sesiPenilaian"
    @handle-ok="handleOk"
    @handle-cancel="modalVisible = false"
  />
  <vb-update-sesi-penilaian-modal
    :modal-visible="modalUpdateVisible"
    :new-sesi-penilaian="sesiPenilaian"
    @handle-ok="handleOkUpdate"
    @handle-cancel="modalUpdateVisible = false"
  />
</template>

<script>
import { notification } from 'ant-design-vue'
import VbTambahSesiPenilaianModal from './modals/TambahSesiPenilaianModal'
import VbUpdateSesiPenilaianModal from './modals/UpdateSesiPenilaianModal'

export default {
  components: {
    VbTambahSesiPenilaianModal,
    VbUpdateSesiPenilaianModal,
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      },
    },
    getActiveMenu: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
    },
  },
  emits: [
    'selectedSesiPenilaian',
    'addSesiPenilaian',
    'updateSesiPenilaian',
    'deleteSesiPenilaian',
    'activeKey',
  ],
  data() {
    return {
      modalVisible: false,
      modalUpdateVisible: false,
      activeKey: 1,
      customStyle:
        'background: white; border-radius: 5px; margin-bottom: 12px; border:1px solid #f0f0f0; overflow: hidden',
      sesiPenilaian: '',
      uuid: '',
    }
  },
  methods: {
    changeActiveKey(key) {
      if (!(key === undefined)) {
        this.$emit('activeKey', key)
      }
    },
    updateSesiHandle() {
      this.modalUpdateVisible = true
      this.uuid = this.list[this.getActiveMenu - 1].uuid_sesi_penilaian_sales
      this.sesiPenilaian = this.list[this.getActiveMenu - 1].nm_sesi_penilaian_sales
    },
    handleOkUpdate(newSesiPenilaian) {
      let check = newSesiPenilaian.trim()
      if (check) {
        const dataForm = {}
        dataForm.uuid = this.uuid
        dataForm.nm_sesi_penilaian_sales = newSesiPenilaian
        this.$emit('updateSesiPenilaian', dataForm)
        notification.success({
          message: 'Sesi Penilaian',
          description: 'Sesi penilaian berhasil diupdate',
        })
        this.modalVisible = false
      } else {
        notification.error({
          message: 'Sesi Penilaian',
          description: 'Kolom sesi penilaian masih kosong',
        })
      }
    },
    handleOk(newSesiPenilaian) {
      let check = newSesiPenilaian.trim()
      if (check) {
        const dataForm = {}
        dataForm.nm_sesi_penilaian_sales = newSesiPenilaian
        this.$emit('addSesiPenilaian', dataForm)
        notification.success({
          message: 'Sesi Penilaian',
          description: 'Sesi penilaian berhasil ditambah',
        })
        this.modalVisible = false
      } else {
        notification.error({
          message: 'Sesi Penilaian',
          description: 'Kolom sesi penilaian masih kosong',
        })
      }
    },
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
      })
    },
    hapusSesiPenilaian() {
      const uuid = this.list[this.getActiveMenu - 1].uuid_sesi_penilaian_sales
      const dataForm = {}
      dataForm.uuid = uuid
      this.$emit('deleteSesiPenilaian', dataForm)
    },
  },
}
</script>

<style>
.card-radius {
  border-radius: 10px;
  overflow: hidden;
}
.ant-collapse-content .ant-collapse-content-box {
  padding: 0 !important;
}
.ant-collapse-header:hover {
  background: #f0f0f0;
}
.active {
  background: #f0f0f0 !important;
}
</style>