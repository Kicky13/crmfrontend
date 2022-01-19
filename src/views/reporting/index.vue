<template>
  <div>
    <div class="card card-radius">
      <div class="card-header bg-primary text-white header_report"></div>
      <div class="card-body p-4">
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Master Mapping Hirarki Internal
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Mapping TSO Distrik
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Mapping Toko Distributor
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Mapping Customer Sales
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Report Visit (7 Hari Terakhir)
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Hasil Survey (7 Hari Terakhir)
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Reporting',
}
</script>
<style>
.card-radius {
  border-radius: 10px;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
@import './style.scss';
</style>
