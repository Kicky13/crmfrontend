<template>
  <!-- <a-button class="mb-4" type="primary" @click="deleteRow">
    <i class="fa fa-plus mr-2" />
    Tambah Data
  </a-button>
  <div class="d-flex justify-content-center">
    <hot-table :data="data" :settings="hotSettings" />
  </div> -->
  <div></div>
</template>

<script>
// import { HotTable } from '@handsontable/vue3'
// import { registerAllModules } from 'handsontable/registry'
// import { progressBarRenderer, starRenderer } from './customRenderers'
// import {
//   alignHeaders,
//   drawCheckboxInRowHeaders,
//   addClassesToRows,
//   changeCheckboxCell,
// } from './hooksCallbacks'
import axios from 'axios'
// import 'handsontable/dist/handsontable.full.css'
// import { ContextMenu } from 'handsontable/plugins';
// import Handsontable from 'handsontable';

// registerAllModules()

export default {
  name: 'VbDashboards',
  components: {
    // HotTable,
  },
  data() {
    return {
      data: [],
      // hotSettings: {
      //   width: '75vw',
      //   height: 450,
      //   dropdownMenu: true,
      //   hiddenColumns: {
      //     indicators: true,
      //   },
      //   contextMenu: true,
      //   multiColumnSorting: true,
      //   filters: true,
      //   rowHeaders: true,
      //   afterOnCellMouseDown: changeCheckboxCell,
      //   afterGetColHeader: alignHeaders,
      //   afterGetRowHeader: drawCheckboxInRowHeaders,
      //   beforeRenderer: addClassesToRows,
      //   colHeaders: [
      //     'Nama Perusahaan',
      //     'Negara',
      //     'Nama',
      //     'Tanggal Penjualan',
      //     'ID Pemesanan',
      //     'Stok',
      //     'Jumlah',
      //     'Progres',
      //     'Rating',
      //   ],
      //   columns: [
      //     {
      //       data: 'company_name',
      //       type: 'text',
      //     },
      //     {
      //       data: 'country',
      //       type: 'dropdown',
      //       source: [
      //         'Brazil',
      //         'China',
      //         'India',
      //         'Indonesia',
      //         'Philippines',
      //         'United Kingdom',
      //         'United States',
      //       ],
      //     },
      //     {
      //       data: 'name',
      //       type: 'text',
      //     },
      //     {
      //       data: 'date',
      //       type: 'date',
      //       allowInvalid: false,
      //     },
      //     {
      //       data: 'order_id',
      //       type: 'text',
      //     },
      //     {
      //       data: 'check_stock',
      //       type: 'checkbox',
      //       className: 'htCenter',
      //     },
      //     {
      //       data: 'stock',
      //       type: 'numeric',
      //     },
      //     {
      //       data: 'progress',
      //       renderer: progressBarRenderer,
      //       readOnly: true,
      //       className: 'htMiddle',
      //     },
      //     {
      //       data: 'rate',
      //       renderer: starRenderer,
      //       readOnly: true,
      //       className: 'star htCenter',
      //     },
      //   ],
      //   licenseKey: 'non-commercial-and-evaluation',
      // },
    }
  },
  mounted() {
    // axios
    // .create({
    //   baseURL: 'http://localhost:3000/',
    // })
    // .get('/handsone_table')
    // .then(response => {
    //     if (response) {
    //       response.data.map(item => this.data.push(item))
    //     }
    //     return false
    // })
  },
  methods: {
    deleteRow() {
      console.log('Hello, World!')
    },
  },
}
</script>

<style>
/* 
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

[data-color='green'] {
  background: #37bc6c;
}

[data-color='orange'] {
  background: #fcb515;
}
*/
</style>
