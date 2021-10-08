export const getAdminMenuData = [
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
      // {
      //   title: 'Mahasiswa',
      //   key: 'xyz321',
      //   url: '/mahasiswa',
      // },
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
        title: 'Radius Distrik',
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
        url: '/customerscyn',
      },
      {
        title: 'Log Sync Customer',
        key: 'St15Cf',
        url: '/log-sync-customer',
      },
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
  {
    category: true,
    title: 'Report Admin',
    key: '2h83ot12',
  },
  {
    title: 'Report Admin',
    key: '82hskb',
    url: '/roles-permissions',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Data Sales SBI',
        key: 'a32jab',
        url: '/datasales',
      },
      {
        title: 'Customer Mapping',
        key: '12sa2s',
        url: '/report/customer_mapping',
      },
    ],
  },
  {
    category: true,
    title: 'Roles & Permissions',
    key: '2h83od',
  },
  {
    title: 'Roles & Permissions',
    key: '82hska',
    url: '/roles-permissions',
    icon: 'fe fe-database',
    children: [
      {
        title: 'Roles',
        key: 'a32jaa',
        url: '/roles',
      },
      {
        title: 'Permissions',
        key: 'echa2a',
        url: '/permissions',
      },
      {
        title: 'Assign Roles',
        key: 'acc441',
        url: '/assignrole',
      },
    ],
  },
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
      // {
      //   title: 'Penguncian Koordinat Toko',
      //   key: 'awqsaw',
      //   url: '/koordinatlock',
      // },
      // {
      //   title: 'Radius Distrik',
      //   key: 'Adawsd',
      //   url: '/radiusdistrik',
      // },
      // {
      //   title: 'Mapping Customer',
      //   key: 'Adaws1',
      //   url: '/mappingcustomer',
      // },
      // {
      //   title: 'Sync Customer',
      //   key: 'Adaws2',
      //   url: '/customerscyn',
      // },
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
        url: '/datasales',
      },
      {
        title: 'Customer Mapping',
        key: 'xca132',
        url: '/report/customer_mapping',
      },
    ],
  },
  {
    category: true,
    title: 'Roles & Permissions',
    key: '2h83od',
  },
  {
    title: 'Roles & Permissions',
    key: '82hska',
    url: '/roles-permissions',
    icon: 'fe fe-database',
    children: [
      {
        title: 'Roles',
        key: 'a32jaa',
        url: '/roles',
      },
      {
        title: 'Permissions',
        key: 'echa2a',
        url: '/permissions',
      },
      {
        title: 'Assign Roles',
        key: 'acc441',
        url: '/assignrole',
      },
    ],
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
    title: 'Peta Kunjungan',
    key: 'iw82km',
    url: '/mappedVisit',
    icon: 'fa fa-street-view',
    children: [
      {
        title: 'Route Complient',
        key: 'acs293',
        url: '/mappedVisit/route',
      },
    ],
  },
  {
    title: 'Report Admin',
    key: '82hskb',
    url: '/report-admin',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Data Sales SBI',
        key: 'a32jab',
        url: '/datasales',
      },
      {
        title: 'Customer Mapping',
        key: '12sa2s',
        url: '/report/customer_mapping',
      },
      {
        title: 'Laporan Toko Dikunjungi',
        key: '872ksj',
        url: '/report/toko_dikunjungi',
      },
      {
        title: 'Laporan Visit Plan - Actual',
        key: '888sja',
        url: '/report/visit_actual',
      },
      {
        title: 'Laporan Kapasitas Toko',
        key: 'jsdj22',
        url: '/report/kapasitasToko',
      },
      {
        title: 'Hasil Survey',
        key: '98ksds',
        url: '/report/hasilSurvey',
      },
    ],
  },
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
      {
        title: 'Report Supervisory Visit',
        key: '23jsu2',
        url: '/sales/report_supervisory',
      },
    ],
  },
]
