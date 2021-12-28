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
            width="180"
            class="mb-3 "
            id="crm_white"
          />
          <img
            lazy="loading"
            v-once
            src="@/assets/images/logo/logo_landing.png"
            alt="Logo CRM"
            width="180"
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
                  <h1>
                    CEPAT. MUDAH. <br />
                    LEBIH MENGUNTUNGKAN.
                  </h1>
                  <h3>
                    Selamat datang di Solusi Digital Semen Indonesia.
                    <br />
                    Segera daftar dengan ID bisnis Kokoh Anda !
                  </h3>
                  <div class="current-ico-bouns">
                    <div class="bouns-progress">
                      <ul class="bouns-labels-list list-unstyled list-inline">
                        <li>
                          <h4>02 - 10 Nov</h4>
                          <h4><small class="color1">Recuirement</small></h4>
                        </li>
                        <li>
                          <h4>10 - 22 Nov</h4>
                          <h4><small class="color2">Design</small></h4>
                        </li>
                        <li>
                          <h4>22 - 29 Nov</h4>
                          <h4><small class="color3">Develop</small></h4>
                        </li>
                        <li>
                          <h4>22 - 29 Nov</h4>
                          <h4><small class="color3">Production</small></h4>
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
            Tentang Solusi Digital Semen Indonesia
          </h2>
          <p class="text-center information">
            Semen Indonesia berkomitmen untuk selalu memberikan layanan terbaik kepada mitra kami
            dengan menggunakan teknologi dan integrasi semua proses ke dalam satu solusi. Anda dapat
            melihat dan memesan semua produk Semen Indonesia, membayar dengan berbagai metode
            pembayaran, memperbarui alamat pengiriman, mendapatkan diskon tambahan, semua di satu
            tempat.
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
            Get Started
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
                <h4><a href="#">Get Apps</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quo in animi
                  laudantium libero impedit praesentium asperiores iure accusamus fugiat distinctio
                  voluptatum.
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
                <h4><a href="#">Login</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quo in animi
                  laudantium libero impedit praesentium asperiores iure accusamus fugiat distinctio
                  voluptatum.
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
                <h4><a href="#">Start Using</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quo in animi
                  laudantium libero impedit praesentium asperiores iure accusamus fugiat distinctio
                  voluptatum.
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
              <h2 class="text-white font-weight-bold">CEPAT. MUDAH.</h2>
              <h2 class="text-white font-weight-bold">LEBIH MENGUNTUNGKAN.</h2>
              <p class="text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="money-exchange" id="about">
      <img
        class="bg-shape-bot"
        src="@/assets/LandingPage/images/FooterBG.png"
        alt=" bg bottom"
      />
      <div class="container">
        <div class="row flex-md-row-reverse">
          <div class="col-md-6">
            <div class="money-exchange-right">
              <h2 data-aos="fade-up" class="">
                Exchange cryptocurrency wherever you are
              </h2>
              <p data-aos="fade-up" class="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque expedita accusamus
                accusantium velit eos voluptate nisi, natus culpa est quos rerum illo similique
                possimus asperiores animi hic, reiciendis cupiditate totam.
              </p>
              <ul class="s-list list-unstyled mb-20">
                <li>
                  <span class="fa fa-check"></span>Donec facilisis velit eu est phasellus consequat
                  quis nostrud
                </li>
                <li>
                  <span class="fa fa-check"></span>Aenean vitae quam. Vivamus et nunc nunc conseq
                </li>
                <li>
                  <span class="fa fa-check"></span>Sem vel metus imperdiet lacinia enea sapiente
                  maior
                </li>
                <li>
                  <span class="fa fa-check"></span>Dapibus aliquam augue fusce eleifend quisque tels
                </li>
                <li>
                  <span class="fa fa-check"></span>Dapibus aliquam augue fusce tels optio facilis
                  sapiente maiores
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="money-exchange-left">
              <img src="@/assets/LandingPage/images/MobileView.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- <section class="ico-distribution bird-background" id="sale">
      <div class="container">
        <div class="text-center">
          <div class="section-title">
            <h3>Tohfa ICO Distribution</h3>
            <span></span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12 ">
            <div id="container"></div>
            <div class="center-values">
              <span class="phx trix">Tohfa</span><br />
              <h6 class="margin-btm">27,000,000</h6>
              <span class="phx">Total Supply</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-12 col-xs-12 progress-div">
            <h6 class="angle-round">
              Token Pre-Sale <span class="middle-span1">17-03-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar background-one wid-46">0.7 $</div>
            </div>

            <h6 class="angle-round">
              Round 1 <span class="color-ccc ml-126">30-03-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar background-two wid-52 bg1">0.9 $</div>
            </div>

            <h6 class="angle-round">
              Round 2 <span class="color-ccc ml-126">04-04-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar background-three wid-64 bg2">0.95 $</div>
            </div>

            <h6 class="angle-round">
              Round 3 <span class="color-ccc ml-126">09-04-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar wid-75 bg3">1.05 $</div>
            </div>

            <h6 class="angle-round">
              Round 4 <span class="color-ccc ml-126">14-04-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar wid-87 bg4">1.10 $</div>
            </div>

            <h6 class="angle-round">
              Round 5 <span class="color-ccc ml-126">19-04-2021</span
              ><span class="number">1,000,000 Tohfa</span>
            </h6>
            <div class="progress progress-cls">
              <div class="progress-bar wid-94 bg5">1.20 $</div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- <div class="clearfix"></div> -->

    <!-- <div
      class="two-wrapper"
      :style="{
        background:
          'url(' +
          require('../../assets/LandingPage/images/elements/shape-3.png') +
          ') no-repeat top center',
      }"
      id="close"
    >
      <section class="roadmap pb-0" id="roadmap">
        <div class="title-box">
          <h2
            class="title-center"
            :style="
              'background-image: url(' +
                require('@/assets/LandingPage/images/elements/line.png') +
                'no-repeat bottom center'
            "
          >
            Tohfa ICO Roadmap
          </h2>
          <p class="description text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur possi mus quod nemo.
            elit. Pariatur possimus quod nemo.
          </p>
        </div>
        <div class="container">
          <div class="row">
            <div class="timeline-split">
              <div class="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12">
                <div class="timeline section-box-margin">
                  <div class="block block-left">
                    <h3>Tohfa Development Starts</h3>
                    <span>MARCH 12, 2021 to Novamber 19, 2017</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto adipisci
                      provident officia animi. Impedit dicta, veniam quae in, animi autem illum eos
                      tempore iste a nisi.
                    </p>
                  </div>

                  <div class="block block-right mt-30">
                    <h3>Groundwork Preparation for ICO</h3>
                    <span>DECAMBER 3, 2017 to DECAMBER 23, 2017</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto adipisci
                      provident officia animi. Impedit dicta, veniam quae in, animi autem illum eos
                      tempore iste a nisi.
                    </p>
                  </div>

                  <div class="block block-left mt-30">
                    <h3>Tohfa Blockchain First Release</h3>
                    <span>JANUARY 02, 2021 to MARCH 17, 2021</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto adipisci
                      provident officia animi. Impedit dicta, veniam quae in, animi autem illum eos
                      tempore iste a nisi.
                    </p>
                  </div>

                  <div class="block block-right mt-30">
                    <h3>Tohfa Bank & Cards Phase</h3>
                    <span>APRIL 28, 2021 to MAY 28, 2021</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto adipisci
                      provident officia animi. Impedit dicta, veniam quae in, animi autem illum eos
                      tempore iste a nisi.
                    </p>
                  </div>
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="o-hidden">
        <div class="container-fluid">
          <div class="row">
            <div
              class="services-column col-lg-5 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12"
            >
              <div class="services-block-four">
                <div class="inner-box">
                  <div class="icon-box">
                    <span class="icon flaticon-target"></span>
                  </div>
                  <h3><a href="#">Initial coin offering dashboard</a></h3>
                  <div class="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, repellat
                    tempora ullam dolor, vel voluptas quo aut autem similique, voluptatum
                    blanditiis. Hic vitae nostrum, quidem cupiditate, vero ullam excepturi dicta!
                  </div>
                </div>
              </div>

              <div class="services-block-four">
                <div class="inner-box">
                  <div class="icon-box">
                    <span class="icon flaticon-speedometer"></span>
                  </div>
                  <h3><a href="#">Real time prices and marketcap</a></h3>
                  <div class="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, repellat
                    tempora ullam dolor, vel voluptas quo aut autem similique, voluptatum
                    blanditiis. Hic vitae nostrum, quidem cupiditate, vero ullam excepturi dicta!
                  </div>
                </div>
              </div>

              <div class="services-block-four">
                <div class="inner-box">
                  <div class="icon-box">
                    <span class="icon flaticon-cogwheel"></span>
                  </div>
                  <h3><a href="#">Super easy to adjust, edit or use</a></h3>
                  <div class="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, repellat
                    tempora ullam dolor, vel voluptas quo aut autem similique, voluptatum
                    blanditiis. Hic vitae nostrum, quidem cupiditate, vero ullam excepturi dicta!
                  </div>
                </div>
              </div>
            </div>
            <div class="service-img-wrapper col-lg-6 col-md-12 col-sm-12">
              <div class="image-box">
                <img src="../../assets/LandingPage/images/laptop2.png" class="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> -->

    <!-- <section class="intro o-hidden no-padding-top">
      <div class="container">
        <div class="intro-wrapper has-gradient o-hidden">
          <div class="single-info-item col-md-3 col-xs-12">
            <div class="info-icon">
              <img src="../../assets/LandingPage/images/icons/1.png" class="center-block" alt="" />
            </div>
            <div class="info-text">
              <h3><a href="#">Secure Wallet</a></h3>
              <p>
                Lorem ipsum dolor sit sunt in culpa sint occaecat qui cupidatat non.
              </p>
            </div>
          </div>
          <div class="single-info-item col-md-3 col-xs-12">
            <div class="info-icon">
              <img src="../../assets/LandingPage/images/icons/2.png" class="center-block" alt="" />
            </div>
            <div class="info-text">
              <h3><a href="#">Instant Exchange</a></h3>
              <p>
                Lorem ipsum dolor sit sunt in culpa sint occaecat qui cupidatat non.
              </p>
            </div>
          </div>
          <div class="single-info-item col-md-3 col-xs-12">
            <div class="info-icon">
              <img src="../../assets/LandingPage/images/icons/3.png" class="center-block" alt="" />
            </div>
            <div class="info-text">
              <h3><a href="#">Crypto Trading</a></h3>
              <p>
                Lorem ipsum dolor sit sunt in culpa sint occaecat qui cupidatat non.
              </p>
            </div>
          </div>
          <div class="single-info-item col-md-3 col-xs-12">
            <div class="info-icon">
              <img src="../../assets/LandingPage/images/icons/4.png" class="center-block" alt="" />
            </div>
            <div class="info-text">
              <h3><a href="#">Crypto Investment</a></h3>
              <p>
                Lorem ipsum dolor sit sunt in culpa sint occaecat qui cupidatat non.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="clearfix"></div> -->

    <!-- <section class="testimonial" id="testimonial">
      <div class="title-box">
        <h2
          class="title-center"
          :style="
            'background-image: url(' +
              require('@/assets/LandingPage/images/elements/line.png') +
              'no-repeat bottom center'
          "
        >
          What our clients say
        </h2>
        <p class="description text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur possi mus quod nemo.
          elit. Pariatur possimus quod nemo.
        </p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="testimonial-item">
              <div class="content">
                <span class="fas fa-quote-left"></span>
                <p>
                  One of the best creative template on themeforest, made by creative minds! nice
                  design, clean code and easy to use
                </p>

                <ul class="rating">
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                </ul>
              </div>
              <div class="author">
                <ul class="list-inline">
                  <li>
                    <img
                      src="../../assets/LandingPage/images/testimonials/testi-image-1.jpg"
                      alt=""
                    />
                  </li>
                  <li>
                    <h3>by Adi12341</h3>
                    <p>Unitef Kingdom</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="testimonial-item">
              <div class="content">
                <span class="fas fa-quote-left"></span>
                <p>
                  The support team are very professional and friendly, I just got amazed at how
                  quickely they response, they are the best
                </p>

                <ul class="rating">
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                </ul>
              </div>
              <div class="author">
                <ul class="list-inline">
                  <li>
                    <img
                      src="../../assets/LandingPage/images/testimonials/testi-image-2.jpg"
                      alt=""
                    />
                  </li>
                  <li>
                    <h3>by maks18011</h3>
                    <p>Russia Federation</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="testimonial-item">
              <div class="content">
                <span class="fas fa-quote-left"></span>
                <p>
                  Excellent quality overall and high attention to details, I have no compliants
                  about this template and would recommend it
                </p>

                <ul class="rating">
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                  <li class="fa fa-star"></li>
                </ul>
              </div>
              <div class="author">
                <ul class="list-inline">
                  <li>
                    <img
                      src="../../assets/LandingPage/images/testimonials/testi-image-3.jpg"
                      alt=""
                    />
                  </li>
                  <li>
                    <h3>by rionneJMS</h3>
                    <p>Japan</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- <section
      class="team features"
      :style="{
        'background-image':
          'url(' + require('../../assets/LandingPage/images/elements/shape2.jpg') + ')',
      }"
      id="team"
    >
      <div class="title-box">
        <h2
          class="title-center"
          :style="
            'background-image: url(' +
              require('@/assets/LandingPage/images/elements/line.png') +
              'no-repeat bottom center'
          "
        >
          Meetup awesome team
        </h2>
        <p class="description text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur possi mus quod nemo.
          elit. Pariatur possimus quod nemo.
        </p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12  col-xs-12">
            <div class="team-member ">
              <div class="team-img">
                <img
                  class="img-responsive center-block"
                  src="../../assets/LandingPage/images/team/person-1.jpg"
                  alt=""
                />
              </div>
              <div class="team-info">
                <h3>Angelita Shalash</h3>
              </div>
              <p class="mb20">
                Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
              </p>
              <ul class="social-icons list-inline list-unstyled">
                <li>
                  <a href="#"><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"
                    ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                  ></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12  col-xs-12">
            <div class="team-member ">
              <div class="team-img">
                <img
                  class="img-responsive center-block"
                  src="../../assets/LandingPage/images/team/person-2.jpg"
                  alt=""
                />
              </div>
              <div class="team-info">
                <h3>Brooks Latshaw</h3>
              </div>
              <p class="mb20">
                Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
              </p>
              <ul class="social-icons list-inline list-unstyled">
                <li>
                  <a href="#"><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"
                    ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                  ></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12  col-xs-12">
            <div class="team-member ">
              <div class="team-img">
                <img
                  class="img-responsive center-block"
                  src="../../assets/LandingPage/images/team/person-3.jpg"
                  alt=""
                />
              </div>
              <div class="team-info">
                <h3>Melva Latshaw</h3>
              </div>
              <p class="mb20">
                Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
              </p>
              <ul class="social-icons list-inline list-unstyled">
                <li>
                  <a href="#"><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"
                    ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                  ></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12  col-xs-12">
            <div class="team-member ">
              <div class="team-img">
                <img
                  class="img-responsive center-block"
                  src="../../assets/LandingPage/images/team/person-4.jpg"
                  alt=""
                />
              </div>
              <div class="team-info">
                <h3>Winford Clay</h3>
              </div>
              <p class="mb20">
                Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
              </p>
              <ul class="social-icons list-inline list-unstyled">
                <li>
                  <a href="#"><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i></a>
                </li>
                <li>
                  <a href="#"
                    ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                  ></a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="col-lg-4 col-md-6 col-sm-12  col-xs-12">
              <div class="team-member ">
                <div class="team-img">
                  <img
                    class="img-responsive center-block"
                    src="../../assets/LandingPage/images/team/person-1.jpg"
                    alt=""
                  />
                </div>
                <div class="team-info">
                  <h3>Angelita Shalash</h3>
                </div>
                <p class="mb20">
                  Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
                </p>
                <ul class="social-icons list-inline list-unstyled">
                  <li>
                    <a href="#"
                      ><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12  col-xs-12">
              <div class="team-member ">
                <div class="team-img">
                  <img
                    class="img-responsive center-block"
                    src="../../assets/LandingPage/images/team/person-2.jpg"
                    alt=""
                  />
                </div>
                <div class="team-info">
                  <h3>Brooks Latshaw</h3>
                </div>
                <p class="mb20">
                  Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
                </p>
                <ul class="social-icons list-inline list-unstyled">
                  <li>
                    <a href="#"
                      ><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 .col-6 col-md-12 col-sm-12 col-xs-12">
              <div class="team-member ">
                <div class="team-img">
                  <img
                    class="img-responsive center-block"
                    src="../../assets/LandingPage/images/team/person-3.jpg"
                    alt=""
                  />
                </div>
                <div class="team-info">
                  <h3>Melva Latshaw</h3>
                </div>
                <p class="mb20">
                  Lorem ipsum dolor sit amet, conse ctetur adipis icing elit. Placeat simi
                </p>
                <ul class="social-icons list-inline list-unstyled">
                  <li>
                    <a href="#"
                      ><i class="fab fa-facebook icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-twitter icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-google-plus icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fab fa-linkedin icon-bordered icon-primary icon-xs"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- End Content -->
    <!-- Footer -->
    <!-- <section class="main-footer footer-style-two text-center" id="contact">
      <div
        class="widgets-section"
        :style="
          'background-image: url(' +
            require('@/assets/LandingPage/images/elements/map-pattern-footer.png') +
            'center 75% no-repeat'
        "
      >
        <div class="container">
          <div class="row clearfix">
            <div class="footer-column col-md-4 col-sm-6 col-xs-12">
              <div class="footer-widget about-widget">
                <h3 class="has-line-center">About Tohfa</h3>
                <div class="widget-content">
                  <div class="text">
                    Tohfa is Powerful and Complete Solution for your Crypto Currencies ICO start up
                    business.Now you can Easily Start an ICO website in just a few adjustmets
                  </div>
                  <ul class="social-links">
                    <li>
                      <a href="#"><span class="fab fa-facebook-f"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-twitter"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-google-plus"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-linkedin"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-instagram"></span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="footer-column col-md-4 col-sm-6 col-xs-12">
              <div class="footer-widget contact-widget">
                <h3 class="has-line-center">Contact Us</h3>
                <div class="widget-content">
                  <ul class="contact-info">
                    <li>
                      <div class="icon">
                        <span class="ui-computer-screen-2"></span>
                      </div>
                    </li>
                    <li>10, Mc Donald Avenue, Sunset Park, Newyork</li>
                    <li>+99 999 9999</li>
                    <li>
                      <a href="https://themeforest.net/user/lightlabs"
                        >themeforest.net/user/lightlabs</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="footer-column col-md-4 col-sm-12 col-xs-12">
              <div class="footer-widget newsletter-widget">
                <h3 class="has-line-center">Newsletter</h3>
                <div class="widget-content">
                  <div class="text">
                    Stay Updated with our latest news. We promise not to spam
                  </div>
                  <div class="newsletter-form">
                    <form method="post">
                      <div class="form-group">
                        <input
                          type="email"
                          name="field-name"
                          value=""
                          placeholder="Your Email"
                          required=""
                        />
                        <button type="submit" class="send-btn">
                          <span class="fa fa-paper-plane-o"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
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
    window.onscroll = function() {
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
