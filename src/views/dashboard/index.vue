<template>
  <div>
    <div />
  </div>
  <!-- <a-row :gutter="16">
    <a-col class="gutter-row" :span="12">
      <vue-apex-chart width="500" type="bar" :options="characterOptions" :series="characterSeries" />
    </a-col>
    <a-col class="gutter-row" :span="12">
      <vue-apex-chart width="500" type="line" :options="profitOptions" :series="profitSeries" />
    </a-col>
    <a-col class="gutter-row" :span="12">
      <vue-apex-chart width="500" type="donut" :options="foodOptions" :series="foodSeries" />
    </a-col>
    <a-col class="gutter-row" :span="12">
      <div id="area-chart" />
    </a-col>
    <a-col class="gutter-row" :span="12">
      <div id="radial-chart" />
    </a-col>
    <a-col class="gutter-row" :span="12">
      <div id="treemap-chart" />
    </a-col>
  </a-row> -->
</template>

<script>
// import VueApexChart from 'vue3-apexcharts'
// import ApexChart from 'apexcharts'

export default {
  name: 'VbDashboards',
  components: {
    // VueApexChart,
  },
  // data() {
  //   return {
  //     characterOptions: {
  //       xaxis: {
  //         categories: ['Spider-Man', 'Thor', 'Iron-Man', 'Hulk', 'Loki'],
  //       },
  //     },
  //     characterSeries: [
  //       {
  //         data: [60, 40, 45, 38, 49],
  //       },
  //     ],
  //     profitOptions: {
  //       xaxis: {
  //         categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
  //       },
  //     },
  //     profitSeries: [
  //       {
  //         data: [53, 58, 67, 70, 65, 71, 80, 95, 103],
  //       },
  //     ],
  //     foodOptions: {
  //       labels: ['Bakso', 'Rawon', 'Soto', 'Rendang'],
  //     },
  //     foodSeries: [29, 45, 41, 100],
  //     productOptions: {
  //       series: [
  //         {
  //           name: 'Semen Gresik',
  //           data: [31, 40, 28, 51, 42, 109, 100],
  //         },
  //         {
  //           name: 'Semen Tonasa',
  //           data: [11, 32, 45, 32, 34, 52, 41],
  //         },
  //       ],
  //       chart: {
  //         height: 350,
  //         type: 'area',
  //       },
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       stroke: {
  //         curve: 'smooth',
  //       },
  //       xaxis: {
  //         type: 'datetime',
  //         categories: [
  //           '2018-09-19T00:00:00.000Z',
  //           '2018-09-19T01:30:00.000Z',
  //           '2018-09-19T02:30:00.000Z',
  //           '2018-09-19T03:30:00.000Z',
  //           '2018-09-19T04:30:00.000Z',
  //           '2018-09-19T05:30:00.000Z',
  //           '2018-09-19T06:30:00.000Z',
  //         ],
  //       },
  //       tooltip: {
  //         x: {
  //           format: 'dd/MM/yy HH:mm',
  //         },
  //       },
  //     },
  //     progressOptions: {
  //       chart: {
  //           height: 350,
  //           type: 'radialBar',
  //       },
  //       series: [70],
  //       labels: ['Progres'],
  //     },
  //     cityOptions: {
  //       chart: {
  //         height: 350,
  //         type: "treemap",
  //       },
  //       series: [
  //         {
  //           data: [
  //             {
  //               x: "Gresik",
  //               y: 218,
  //             },
  //             {
  //               x: "Surabaya",
  //               y: 149,
  //             },
  //             {
  //               x: "Tuban",
  //               y: 184,
  //             },
  //             {
  //               x: "Malang",
  //               y: 55,
  //             },
  //             {
  //               x: "Pasuruan",
  //               y: 84,
  //             },
  //             {
  //               x: "Probolinggo",
  //               y: 31,
  //             },
  //             {
  //               x: "Banyuwangi",
  //               y: 70,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   }
  // },
  // mounted() {
  //   this.renderChart('area-chart', this.productOptions)
  //   this.renderChart('radial-chart', this.progressOptions)
  //   this.renderChart('treemap-chart', this.cityOptions)
  // },
  // methods: {
  //   renderChart(type, option) {
  //     new ApexChart(document.querySelector(`#${type}`), option).render()
  //   },
  // },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

#area-chart,
#radial-chart,
#treemap-chart {
  max-width: 500px;
}
</style>