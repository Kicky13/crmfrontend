export const getMenuData = [
  // VB:REPLACE-START:MENU-CONFIG
  // {
  //   category: true,
  //   title: 'Dashboards',
  //   key: 'q7r3hr',
  // },
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  // {
  //   category: true,
  //   title: 'Marketing',
  //   key: '5hb7fe',
  // },
  {
    title: 'Marketing',
    key: 'aw57eky',
    url: '/berita',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        title: 'News',
        key: 'jkr01l',
        url: '/marketing/artikel',
      },
      {
        title: 'Program',
        key: 'jkr02l',
        url: '/marketing/program',
      },
    ],
  },
  // {
  //   category: true,
  //   title: 'Manajemen Menu',
  //   key: '2t2ghm',
  // },
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
  // {
  //   category: true,
  //   title: 'Settings & Configuration',
  //   key: 'St00Cf',
  // },
  {
    title: 'Settings & Configuration',
    key: 'St01Cf',
    url: '/settings',
    icon: 'fa fa-gear',
    children: [
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
        title: 'Validasi Harga Survey',
        key: 'St14Cf',
        url: '/validasiharga',
      },
    ],
  },
  // {
  //   category: true,
  //   title: 'Visit Plan',
  //   key: 'Vs00Pl',
  // },
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
  //   title: 'Roles & Permissions',
  //   key: '2h83od',
  // },
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
  // {
  //   category: true,
  //   title: 'Supervisory Visit',
  //   key: 'hsu3894',
  // },
  {
    title: 'Supervisory Visit',
    key: '78ehnf',
    url: '/sales',
    icon: 'fa fa-user',
    children: [
      {
        title: 'Master Penilaian Sales',
        key: '8sugn8',
        url: '/sales/survey_sales',
      },
    ],
  },
  {
    title: 'Report Admin',
    key: '12seaw',
    url: '/report',
    icon: 'fa fa-list-ul',
    children: [
      {
        title: 'Customer Mapping',
        key: '12sa2s',
        url: '/report/customer_mapping',
      },
    ],
  },
]
