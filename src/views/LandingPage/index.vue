<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top nav-base dark" id="minify_nav">
      <div class="container">
        <a class="navbar-brand">
          <!-- <img
            class="toggle-logo logo-white"
            src="../../assets/LandingPage/images/logo.png"
            alt=""
          /> -->

          <img
            lazy="loading"
            v-once
            src="@/assets/images/logo/logo_crm_white.png"
            alt="Logo CRM"
            width="220"
            class="mb-3"
            id="crm_white"
          />
          <img
            lazy="loading"
            v-once
            src="@/assets/images/logo/logo_landing.png"
            alt="Logo CRM"
            width="220"
            class="mb-3 d-none"
            id="crm_color"
          />
          <!-- <img
            class="toggle-logo logo-blue"
            src="../../assets/LandingPage/images/toggle-logo.png"
            alt=""
          /> -->
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!data_login">
              <router-link class="nav-link special" :to="`/auth/login`">Login</router-link>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link special" :to="`/dashboard`">Dashboard</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section
      class="main-header demo1"
      :style="'background-image: url(' + require('@/assets/LandingPage/images/MainBG.webp')"
      style="background-color: #b20838"
      id="main"
    >
      <div class="home-cont">
        <div class="container">
          <div class="row">
            <div class="col-xl-7 col-lg-6 col-md-12">
              <div class="main-header-sub sub text-left">
                <div class="content-text">
                  <h1>(TEST QA) MUDAH, AKURAT, EFEKTIF & EFISIEN.</h1>
                  <h3>
                    Selamat datang di AksesToko-CRM
                    <br />
                    Segera daftarkan perusahaan anda untuk mendapatkan layanan CRM guna meningkatkan
                    kinerja & layanan untuk meraih kepuasan pelanggan.
                  </h3>
                  <div class="current-ico-bouns">
                    <div class="bouns-progress">
                      <ul class="bouns-labels-list list-unstyled list-inline">
                        <li>
                          <h4><i class="fa fa-users"></i></h4>
                          <h4><small class="color1">Mapping Customer</small></h4>
                        </li>
                        <li>
                          <h4><i class="fa fa-calendar icon-danger"></i></h4>
                          <h4><small class="color2">Schedule Survey</small></h4>
                        </li>
                        <li>
                          <h4><i class="fa fa-file"></i></h4>
                          <h4><small class="color3">Survey Product & Market</small></h4>
                        </li>
                        <li>
                          <h4><i class="fa fa-dashboard"></i></h4>
                          <h4><small class="color3">Dashboard & Evaluation</small></h4>
                        </li>
                      </ul>
                      <div class="progress">
                        <div
                          class="progress-bar bg-color1"
                          role="progressbar"
                          aria-valuenow="15"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                        <div
                          class="progress-bar bg-color2"
                          role="progressbar"
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                        <div
                          class="progress-bar bg-color3"
                          role="progressbar"
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                        <div
                          class="progress-bar bg-color3"
                          role="progressbar"
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="current-ico-bouns buttons">
                    <div class="bouns-progress text-center">
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <a href="#" class="spesial-btn text-center float-right">
                            <img
                              lazy="loading"
                              v-once
                              src="@/assets/images/logo/google-play.webp"
                              alt="Logo SIG"
                              width="170"
                            />
                          </a>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <a href="#" class="spesial-btn text-center float-left">
                            <img
                              lazy="loading"
                              v-once
                              src="@/assets/images/logo/app-store.webp"
                              alt="Logo SIG"
                              width="170"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-5 col-lg-6 col-md-12">
              <div class="counter-down">
                <img
                  lazy="loading"
                  v-once
                  src="@/assets/images/logo/preview-apps.webp"
                  alt=""
                  class="img-fluid height-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="round-header-circle hidden-sm hidden-xs">
        <div class="round-animate">
          <div class="round-1">
            <span class="r-1"></span>
            <span class="r-2"></span>
            <span class="r-3"></span>
            <span class="r-4"></span>
          </div>
          <div class="round-2">
            <span class="r-1"></span>
            <span class="r-2"></span>
            <span class="r-3"></span>
            <span class="r-4"></span>
          </div>
          <div class="round-3">
            <span class="r-1"></span>
            <span class="r-2"></span>
            <span class="r-3"></span>
            <span class="r-4"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="our-services" id="start">
      <div class="container">
        <div class="title-box">
          <h2
            class="title-center mb-2"
            :style="
              'background-image: url(' +
              require('@/assets/LandingPage/images/elements/line.png') +
              'no-repeat bottom center'
            "
          >
            Apa Itu AksesToko-CRM?
          </h2>
          <p class="text-center information">
            AksesToko-CRM merupakan platform digital yang dikembangkan oleh PT. Sinergi Informatika
            Semen Indonesia guna yang memudahkan pelanggan untuk mengumpulkan informasi produk
            retail, promosi, keluhan serta informasi lainnya berdasarkan data pelanggan secara
            efektif dan efisien.
          </p>
          <br />
          <p class="text-center information">
            Dashboard menampilkan informasi yang telah dikumpulkan oleh sales / agent support
            berdasarkan kondisi real dilapangan. Menampilkan statistik kinerja sales / agent sesuai
            dengan penilaian dari supervisor sales / agent. Memonitoring data dan tingkat kepuasan
            pelanggan sehingga dapat dijadikan bahan analisa dan evaluasi untuk menentukan strategi
            market yang lebih kompetititf.
          </p>
        </div>
        <div class="title-box">
          <h2
            class="title-center"
            :style="
              'background-image: url(' +
              require('@/assets/LandingPage/images/elements/line.png') +
              'no-repeat bottom center'
            "
          >
            Bagaimana Cara Pemakaian AksesToko-CRM?
          </h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="single-service-item">
              <span class="top-border"></span>
              <span class="right-border"></span>
              <span class="bottom-border"></span>

              <div class="service-left-bg"></div>
              <div class="service-icon">
                <img
                  lazy="loading"
                  v-once
                  class="icon center-block"
                  src="@/assets/LandingPage/images/Getapps.webp"
                  alt=""
                />
              </div>
              <div class="service-text">
                <h4><a href="#">Install Aplikasi</a></h4>
                <p>
                  Dapatkan aplikasi WEB untuk setup data master user / agent dan monitoring data.
                  Aplikasi Mobile dapat didownload diplaystore untuk android dan AppStore untuk iOS.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="single-service-item">
              <span class="top-border"></span>
              <span class="right-border"></span>
              <span class="bottom-border"></span>

              <div class="service-left-bg"></div>
              <div class="service-icon">
                <img
                  lazy="loading"
                  v-once
                  class="icon iconscenter-block"
                  src="@/assets/LandingPage/images/Verifikasi.webp"
                  alt=""
                />
              </div>
              <div class="service-text">
                <h4><a href="#">Setup Data</a></h4>
                <p>
                  Lakukan setup data user, hirarki organisasi, mastering data produk, distributor &
                  customer. Kemudian lakukan mapping data dan konfigurasi jadwal survey market.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="single-service-item">
              <span class="top-border"></span>
              <span class="right-border"></span>
              <span class="bottom-border"></span>

              <div class="service-left-bg"></div>
              <div class="service-icon">
                <img
                  lazy="loading"
                  v-once
                  class="icon center-block"
                  src="@/assets/LandingPage/images/Touch.webp"
                  alt=""
                />
              </div>
              <div class="service-text">
                <h4><a href="#">Mulai Pemakaian</a></h4>
                <p>
                  Sales / agent melakukan survey market sesuai dengan jadwal yang telah ditetapkan.
                  Mengumpulkan informasi produk retail, promosi, keluhan dan informasi lainnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="clearfix"></div>

    <section
      class="information-mobile"
      :style="'background-image: url(' + require('@/assets/LandingPage/images/FooterBG.webp')"
      style="background-color: #b20838"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="image_mobile">
              <img lazy="loading" v-once src="@/assets/LandingPage/images/MobileView.webp" alt="" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="information">
              <h2 class="text-white font-weight-bold">MUDAH, AKURAT,</h2>
              <h2 class="text-white font-weight-bold">EFEKTIF & EFISIEN</h2>
              <p class="text-white">
                Tersedia dalam platform mobile untuk memudahkan sales / agent untuk mengumpulkan
                data produk retail, promosi, keluhan dan pemesanan produk dari customer. Tidak
                terhambat oleh konektifitas walaupun sedang di area yang tidak terjangkau oleh
                sinyal karena data yang telah dikumpulkan bisa diupload kapan saja saat konektifitas
                lebih stabil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/footer/Footer'
export default {
  name: 'LandingPage',
  components: {
    Footer,
  },
  data() {
    return {
      data_login: localStorage.getItem('userData'),
    }
  },
  mounted() {
    window.onscroll = function () {
      onWindowScroll()
    }

    let navbar = document.getElementById('minify_nav')
    let image_navbar_color = document.getElementById('crm_color')
    let image_navbar_white = document.getElementById('crm_white')

    function onWindowScroll() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.classList.add('shrink')
        image_navbar_color.classList.add(`show`)
        image_navbar_color.classList.remove(`d-none`)
        image_navbar_white.classList.add('d-none')
      } else {
        navbar.classList.remove('shrink')
        image_navbar_color.classList.remove(`show`)
        image_navbar_color.classList.add(`d-none`)
        image_navbar_white.classList.remove('d-none')
        // image_navbar_white.classList.remove('view')
      }
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import '@/styles/css/LandingPage/index.scss';
</style>
