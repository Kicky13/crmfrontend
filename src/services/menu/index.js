export const getAdminMenuData = [
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
    children: [
      {
        title: 'CA & Volume Analytcs',
        key: 'dpr214',
        url: '/dashboard/volume_analytcs',
      },
      // {
      //   title: 'Visit',
      //   key: 'dpr512',
      //   url: '/dashboard/visit',
      // },
      {
        title: 'Visit',
        key: 'dpr510',
        url: '/dashboard/visit',
      },
      {
        title: 'Promotion',
        key: 'dpr017',
        url: '/dashboard/promotion',
      },
      {
        title: 'RBP Movement',
        key: 'rbp126',
        url: '/dashboard/rbp_movement',
      },
      {
        title: 'Price Monitoring',
        key: 'pmo235',
        url: '/dashboard/price_monitoring',
      },
      // {
      //   title: 'SOW',
      //   key: 'pmo231',
      //   url: '/dashboard/sow',
      // },
      {
        title: 'Share Of  Wallet',
        key: 'pmo261',
        url: '/dashboard/sow',
      },
      // {
      //   title: 'SOW V3',
      //   key: 'pmo265',
      //   url: '/dashboard/sow-v3',
      // },

      {
        title: 'Sales Route  Compliance',
        key: 'jkr01l23',
        url: '/dashboard/sales_route',
      },
    ],
  },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/marketing',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
      },
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
        children: [
          {
            title: 'Tambah Berita',
            key: 'tbr322',
            url: '/marketing/berita/tambah',
          },
          {
            title: 'Update Berita',
            key: 'ubr322',
            url: '/marketing/berita/update',
            statusId: true,
          },
          {
            title: 'Detail Berita',
            key: 'dbr322',
            url: '/marketing/berita/detail',
            statusId: true,
          },
        ],
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
        children: [
          {
            title: 'Tambah Program',
            key: 'tpr322',
            url: '/marketing/program/tambah',
          },
          {
            title: 'Update Program',
            key: 'upr322',
            url: '/marketing/program/edit',
            statusId: true,
          },
          {
            title: 'Detail Program',
            key: 'dpr322',
            url: '/marketing/program/detailProgram',
            statusId: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Master Data',
    key: 'mrda01',
    url: '/master_data',
    icon: 'fa fa-database',
    children: [
      {
        title: 'Tipe',
        key: 'tipe01',
        url: '/master_data/tipe',
      },
      {
        title: 'Brand',
        key: 'brnd02',
        url: '/master_data/brand',
      },
      {
        title: 'Kemasan',
        key: 'kmsn03',
        url: '/master_data/kemasan',
      },
      {
        title: 'Produk',
        key: 'prdk04',
        url: '/master_data/produk',
      },
      {
        title: 'Distrik RET',
        key: 'dire05',
        url: '/master_data/distrik_ret',
      },
      {
        title: 'Kategori Promo',
        key: 'kapr06',
        url: '/master_data/kategori_promo',
      },
      {
        title: 'Weekly Config',
        key: 'weco07',
        url: '/master_data/weekly_config',
      },
    ],
  },
  {
    title: 'Weekly Price',
    key: 'wepr02',
    url: '/weekly_price',
    icon: 'fa fa-tags',
    children: [
      {
        title: 'Weekly Input',
        key: 'wein01',
        url: '/weekly_price/weekly_input',
      },
      {
        title: 'WP Approval',
        key: 'wpap03',
        url: '/weekly_price/wp_approval',
      },
      {
        title: 'WP Publish',
        key: 'wppu04',
        url: '/weekly_price/wp_publish',
      },
      {
        title: 'Promotion',
        key: 'prom02',
        url: '/weekly_price/promotion',
      },
    ],
  },
  {
    title: 'Weekly Price Monitoring',
    key: 'wpmo03',
    url: '/wpm',
    icon: 'fa fa-file',
    children: [
      {
        title: 'Report',
        key: 'rprt01',
        url: '/wpm/report',
      },
      {
        title: 'Promotion',
        key: 'prmt02',
        url: '/wpm/promotion',
      },
      {
        title: 'Price Movement',
        key: 'prnt03',
        url: '/wpm/price_movement',
      },
      {
        title: 'GAP Harga',
        key: 'gaph04',
        url: '/wpm/gap_harga',
      },
    ],
  },
  {
    title: 'User Management',
    key: 'aw67ac',
    url: '/users',
    icon: 'fa fa-user',
    children: [
      {
        title: 'Management User CRM',
        key: 'jty2ap',
        url: '/users',
      },
      {
        title: 'Management User Hirarki',
        key: 'gfd34a',
        url: '/users/hierarchy',
      },
      {
        title: 'List Users',
        key: 'gfd34b2',
        url: '/users/list',
      },
      {
        title: 'Management User Hirarki',
        key: 'gfd34a',
        url: '/users/hierarchy',
        children: [
          {
            title: 'Mapping User',
            key: '12sas2',
            url: '/users/profile/jabatan',
            statusId: true,
          },
          {
            title: 'Mapping User TSO',
            key: '12sas2',
            url: '/users/profile/TSO',
            statusId: true,
          },
          {
            title: 'Mapping SPC',
            key: '125as2',
            url: '/users/profile/SPC',
            statusId: true,
          },
          {
            title: 'Mapping Admin Distributor',
            key: '125a62',
            url: '/users/profile/admin-distributor',
            statusId: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Manajemen Menu',
    key: '6rq4ze6',
    url: '/user',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Level User',
        key: 'e38wke',
        url: '/user/level_user',
      },
      {
        title: 'Sales Distributor',
        key: 's4d10r',
        url: '/reporting-tso/sales-distributor',
      },
    ],
  },
  {
    title: 'Settings & Configuration',
    key: 'St01Cf',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Penguncian Koordinat Toko',
        key: 'gh898s',
        url: '/koordinatlock',
      },
      {
        title: 'Radius Wilayah',
        key: 'St11Cf',
        url: '/radiusdistrik',
      },
      {
        title: 'Mapping Customer',
        key: 'St12Cf',
        url: '/mappingcustomer',
      },
      {
        title: 'Sync Customer',
        key: 'St13Cf',
        url: '/customersync',
      },
      // {
      //   title: 'Log Sync Customer',
      //   key: 'St15Cf',
      //   url: '/log-sync-customer',
      // },
      {
        title: 'Validasi Harga Survey',
        key: 'St14Cf',
        url: '/validasiharga',
      },
    ],
  },
  {
    title: 'Visit Plan',
    key: 'Vs01Pl',
    url: '/visit',
    icon: 'fa fa-street-view',
    children: [
      {
        title: 'Upload Visit Plan',
        key: 'Vs11Pl',
        url: '/uploadvisitplan',
      },
      {
        title: 'Otomatisasi Visit Plan',
        key: 'Vs12Pl',
        url: '/otomatisasivisit',
      },
    ],
  },
  // {
  //   category: true,
  //   title: 'Report Admin',
  //   key: '2h83ot12',
  // },
  // {
  //   title: 'Report Admin',
  //   key: '82hskb',
  //   url: '/roles-permissions',
  //   icon: 'fa fa-list-ul',
  //   children: [
  //     {
  //       title: 'Data Sales SBI',
  //       key: 'a32jab',
  //       // url: '/datasales',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Customer Mapping',
  //       key: '12sa2s',
  //       // url: '/report/customer_mapping',
  //       url: '/auth/underconstruct',
  //     },
  //   ],
  // },
  {
    title: 'Supervisory Visit',
    key: '78ehnf',
    url: '/sales',
    icon: 'fa fa-book',
    children: [
      {
        title: 'Master Penilaian Sales',
        key: '8sugn8',
        url: '/sales/survey_sales',
      },
    ],
  },
  // {
  //   title: 'Reporting',
  //   key: '123saz',
  //   url: '/reporting',
  //   icon: 'fa fa-newspaper-o',
  // },

  {
    title: 'Reporting',
    key: 'Rs123s',
    url: '/reporting-tso',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'Customer Mapping',
        key: 'Rp1nsx',
        url: '/reporting/customer-mapping',
      },
      {
        title: 'Sales Distributor',
        key: '125a92',
        url: '/reporting/sales-distributor',
      },
      {
        title: 'Download Data',
        key: '12sa92',
        url: '/reporting',
      },
    ],
  },

  //  {
  //    title: 'Penarikan Data',
  //    key: '123swa',
  //    url: '/penarikan-data',
  //    icon: 'fa fa-get-pocket',
  //    children: [
  //      {
  //        title: 'Report Visit',
  //        key: '10092x',
  //        url: '/penarikan-data/report-visit',
  //      },
  //      {
  //        title: 'Hasil Survey',
  //        key: 'ppla21',
  //        url: '/penarikan-data/hasil-survey',
  //      },
  //    ],
  //  },
]

export const getUserMenuData = [
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/berita',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
    ],
  },
  {
    title: 'Settings & Configuration',
    key: 'dawdasw',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Log Sync Customer',
        key: '1121sw',
        url: '/log-sync-customer',
      },
      {
        title: 'Validasi Harga Survey',
        key: 'Adaws5',
        url: '/validasiharga',
      },
    ],
  },
  {
    category: true,
    title: 'Report Admin',
    key: '1231sa',
  },
  {
    title: 'Report Admin',
    key: '1131sa',
    url: '/roles-permissions',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Data Sales SBI',
        key: 'asa123',
        // url: '/datasales',
        url: '/auth/underconstruct',
      },
      {
        title: 'Customer Mapping',
        key: 'xca132',
        // url: '/report/customer_mapping',
        url: '/auth/underconstruct',
      },
    ],
  },
  {
    category: true,
    title: 'Roles & Permissions',
    key: '2h83od',
  },
]

export const getTsoMenuData = [
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/marketing',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
    ],
  },
  {
    title: 'Weekly Price',
    key: 'wepr02',
    url: '/weekly_price',
    icon: 'fa fa-tags',
    children: [
      {
        title: 'Weekly Input',
        key: 'wein01',
        url: '/weekly_price/weekly_input',
      },
    ],
  },
  {
    title: 'Settings & Configuration',
    key: 'St01Cf',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Radius Wilayah',
        key: 'St11Cf',
        url: '/radiusdistrik',
      },
      {
        title: 'Mapping Customer',
        key: 'St12Cf',
        url: '/mappingcustomer',
      },
    ],
  },
  {
    title: 'Visit Plan',
    key: 'Vs01Pl',
    url: '/visit',
    icon: 'fa fa-street-view',
    children: [
      {
        title: 'Upload Visit Plan',
        key: 'Vs11Pl',
        url: '/uploadvisitplan',
      },
      {
        title: 'Otomatisasi Visit Plan',
        key: 'Vs12Pl',
        url: '/otomatisasivisit',
      },
    ],
  },
  {
    title: 'Reporting',
    key: 'Rs123s',
    url: '/reporting-tso',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'Customer Mapping',
        key: 'Rp1nsx',
        url: '/reporting-tso/customer-mapping',
      },
      {
        title: 'Sales Distributor',
        key: '125a92',
        url: '/reporting-tso/sales-distributor',
      },
    ],
  },

  // {
  //   title: 'Peta Kunjungan',
  //   key: 'iw82km',
  //   url: '/mappedVisit',
  //   icon: 'fa fa-street-view',
  //   children: [
  //     {
  //       title: 'Route Complient',
  //       key: 'acs293',
  //       // url: '/mappedVisit/route',
  //       url: '/auth/underconstruct',
  //     },
  //   ],
  // },
  // {
  //   title: 'Report Admin',
  //   key: '82hskb',
  //   url: '/report-admin',
  //   icon: 'fa fa-list-ul',
  //   children: [
  //     {
  //       title: 'Data Sales SBI',
  //       key: 'a32jab',
  //       // url: '/datasales',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Customer Mapping',
  //       key: '12sa2s',
  //       // url: '/report/customer_mapping',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Laporan Toko Dikunjungi',
  //       key: '872ksj',
  //       // url: '/report/toko_dikunjungi',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Laporan Visit Plan - Actual',
  //       key: '888sja',
  //       // url: '/report/visit_actual',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Laporan Kapasitas Toko',
  //       key: 'jsdj22',
  //       // url: '/report/kapasitasToko',
  //       url: '/auth/underconstruct',
  //     },
  //     {
  //       title: 'Hasil Survey',
  //       key: '98ksds',
  //       // url: '/report/hasilSurvey',
  //       url: '/auth/underconstruct',
  //     },
  //   ],
  // },
  // {
  //   title: 'Supervisory Visit',
  //   key: '78ehnf',
  //   url: '/sales',
  //   icon: 'fa fa-book',
  //   children: [
  //     {
  //       title: 'Report Supervisory Visit',
  //       key: '23jsu2',
  //       // url: '/sales/report_supervisory',
  //       url: '/auth/underconstruct',
  //     },
  //   ],
  // },
]

export const getASMMenuData = [
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/berita',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
    ],
  },
  {
    title: 'Weekly Price',
    key: 'wepr02',
    url: '/weekly_price',
    icon: 'fa fa-tags',
    children: [
      {
        title: 'WP Approval',
        key: 'wein01',
        url: '/weekly_price/wp_approval',
      },
    ],
  },
  {
    title: 'Settings & Configuration',
    key: 'dawdasw',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Log Sync Customer',
        key: '1121sw',
        url: '/log-sync-customer',
      },
      {
        title: 'Validasi Harga Survey',
        key: 'Adaws5',
        url: '/validasiharga',
      },
    ],
  },
  {
    category: true,
    title: 'Report Admin',
    key: '1231sa',
  },
  {
    title: 'Report Admin',
    key: '1131sa',
    url: '/roles-permissions',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Data Sales SBI',
        key: 'asa123',
        // url: '/datasales',
        url: '/auth/underconstruct',
      },
      {
        title: 'Customer Mapping',
        key: 'xca132',
        // url: '/report/customer_mapping',
        url: '/auth/underconstruct',
      },
    ],
  },
  {
    category: true,
    title: 'Roles & Permissions',
    key: '2h83od',
  },
]

export const getSSMMenuData = [
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/berita',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/berita',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
    ],
  },
  {
    title: 'Weekly Price',
    key: 'wepr02',
    url: '/weekly_price',
    icon: 'fa fa-tags',
    children: [
      {
        title: 'WP Publish',
        key: 'wein01',
        url: '/weekly_price/wp_publish',
      },
    ],
  },
  {
    title: 'Settings & Configuration',
    key: 'dawdasw',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Log Sync Customer',
        key: '1121sw',
        url: '/log-sync-customer',
      },
      {
        title: 'Validasi Harga Survey',
        key: 'Adaws5',
        url: '/validasiharga',
      },
    ],
  },
  {
    category: true,
    title: 'Report Admin',
    key: '1231sa',
  },
  {
    title: 'Report Admin',
    key: '1131sa',
    url: '/roles-permissions',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Data Sales SBI',
        key: 'asa123',
        // url: '/datasales',
        url: '/auth/underconstruct',
      },
      {
        title: 'Customer Mapping',
        key: 'xca132',
        // url: '/report/customer_mapping',
        url: '/auth/underconstruct',
      },
    ],
  },
  {
    category: true,
    title: 'Roles & Permissions',
    key: '2h83od',
  },
]
