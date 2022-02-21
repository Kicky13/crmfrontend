<template>
  <!-- <div class="d-flex justify-content-center">
    <hot-table :data="data" :settings="hotSettings" />
  </div>
  <div class="d-flex justify-content-center">
    <a-button class="mt-4" type="primary">
      Simpan
    </a-button>
  </div> -->
  <div></div>
</template>

<script>
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import { getData } from "./constants";
import {
  progressBarRenderer,
  starRenderer,
} from "./customRenderers";
import {
  alignHeaders,
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
} from "./hooksCallbacks";
import 'handsontable/dist/handsontable.full.css'

registerAllModules()

export default {
  name: 'VbDashboards',
  components: {
    // HotTable,
  },
  data() {
    return {
      hotSettings: {
        width: '75vw',
        height: 450,
        dropdownMenu: true,
        hiddenColumns: {
          indicators: true,
        },
        contextMenu: true,
        multiColumnSorting: true,
        filters: true,
        rowHeaders: true,
        afterOnCellMouseDown: changeCheckboxCell,
        afterGetColHeader: alignHeaders,
        afterGetRowHeader: drawCheckboxInRowHeaders,
        beforeRenderer: addClassesToRows,
        colHeaders: [
          'Nama Perusahaan',
          'Negara',
          'Nama',
          'Tanggal Penjualan',
          'ID Pemesanan',
          'Stok',
          'Jumlah',
          'Progres',
          'Rating',
        ],
        columns: [
          { data: 1, type: 'text' },
          { data: 2, type: 'text' },
          { data: 3, type: 'text' },
          {
            data: 4,
            type: 'date',
            allowInvalid: false,
          },
          { data: 5, type: 'text' },
          {
            data: 6,
            type: 'checkbox',
            className: 'htCenter',
          },
          {
            data: 7,
            type: 'numeric',
          },
          {
            data: 8,
            renderer: progressBarRenderer,
            readOnly: true,
            className: 'htMiddle',
          },
          {
            data: 9,
            renderer: starRenderer,
            readOnly: true,
            className: 'star htCenter',
          },
        ],
        licenseKey: 'non-commercial-and-evaluation',
      },
      data: getData(),
    }
  },
}
</script>

<style>
table.htCore td.star {
  color: #fcb515;
}

table.htCore tr.odd td {
  background: #fafbff;
}

table.htCore td .progressBar {
  background: #37bc6c;
  height: 10px;
}

table.htCore tr.selected td {
  background: #edf3fd;
}

.collapsibleIndicator {
  text-align: center;
}

.handsontable .htRight .changeType {
  margin: 3px 1px 0 13px;
}
.handsontable .green {
  background: #37bc6c;
  font-weight: bold;
}

.handsontable .orange {
  background: #fcb515;
  font-weight: bold;
}

.btn {
  padding: 20px;
  font: 1.4em sans-serif;
}

[data-color="green"] {
  background: #37bc6c;
}

[data-color="orange"] {
  background: #fcb515;
}
</style>