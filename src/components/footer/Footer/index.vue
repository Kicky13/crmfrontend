<template>
  <div
    :class="{
      [$style.footerDark]: true,
      [$style.footerFullWidth]: !settings.isContentMaxWidth,
    }"
  >
    <div class="pt-5 pb-4" :class="$style.outer">
      <div :class="$style.container">
        <a-row :gutter="16">
          <a-col class="text-center mb-5 mb-lg-0" :lg="6" :md="24" :sm="24" :xs="24">
            <img
              lazy="loading"
              v-once
              src="@/assets/images/logo/logo-akses-toko.webp"
              alt="Logo Akses Toko"
              width="150"
            />
            <div class="my-3">
              <a href="https://wa.me/6281132001306" target="_blank">
                <i class="fa fa-whatsapp fa-lg" />
              </a>
              <a class="mx-4" href="https://www.facebook.com/aksestokoid" target="_blank">
                <i class="fa fa-facebook fa-lg" />
              </a>
              <a href="https://www.instagram.com/aksestokoid" target="_blank">
                <i class="fa fa-instagram fa-lg" />
              </a>
            </div>
            <a
              class="text-lowercase badge rounded-pill bg-light text-dark p-2"
              href="mailto:customerservice@aksestoko.id"
              target="_blank"
            >
              <i class="fa fa-envelope-o" />
              <span> customerservice@aksestoko.id</span>
            </a>
          </a-col>
          <a-col :lg="4" :md="6" :sm="24" :xs="24">
            <h5 class="font-weight-bold mb-4">Memulai</h5>
            <ul class="list-unstyled">
              <li><a href="https://qa.aksestoko.id/auth/signup" target="_blank">Daftar</a></li>
              <li><a href="https://qa.aksestoko.id/auth/signin" target="_blank">Masuk</a></li>
              <li><a href="https://qa.aksestoko.id/auth/profile" target="_blank">Akun</a></li>
              <li><a href="https://qa.aksestoko.id/order" target="_blank">Pesanan</a></li>
            </ul>
          </a-col>
          <a-col :lg="4" :md="6" :sm="24" :xs="24">
            <h5 class="font-weight-bold mb-4">Bantuan</h5>
            <ul class="list-unstyled">
              <li><a href="https://qa.aksestoko.id/home/faq" target="_blank">FAQ</a></li>
              <li>
                <a href="https://qa.aksestoko.id/home/cs" target="_blank">Layanan Pelanggan</a>
              </li>
              <li><a href="https://qa.aksestoko.id/home/cs" target="_blank">Live Chat</a></li>
            </ul>
          </a-col>
          <a-col :lg="6" :md="6" :sm="12" :xs="24">
            <h5 class="font-weight-bold mb-4">Tentang Kami</h5>
            <ul class="list-unstyled">
              <li>
                <a href="https://sig.id" target="_blank">PT Semen Indonesia (Persero) Tbk (SIG)</a>
              </li>
              <li>
                <a href="https://sisi.id" target="_blank"
                  >PT Sinergi Informatika Semen Indonesia (SISI)</a
                >
              </li>
            </ul>
          </a-col>
          <a-col :lg="4" :md="6" :sm="24" :xs="24">
            <h5 class="font-weight-bold mb-4">Aplikasi</h5>
            <ul class="list-unstyled">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=id.sisi.aksestokomobile"
                  target="_blank"
                >
                  <img
                    lazy="loading"
                    v-once
                    class="img-fluid mb-3 d-none d-md-inline-block"
                    src="@/assets/images/logo/google-play.webp"
                    alt="Logo Google Play"
                  />
                  <img
                    lazy="loading"
                    v-once
                    class="img-fluid mb-3 d-md-none"
                    src="@/assets/images/logo/google-play.webp"
                    alt="Logo Google Play"
                    width="150"
                  />
                </a>
              </li>
              <li>
                <a href="https://aksestoko.id/application/ios" target="_blank">
                  <img
                    lazy="loading"
                    v-once
                    class="img-fluid d-none d-md-inline-block"
                    src="@/assets/images/logo/app-store.webp"
                    alt="Logo App Store"
                  />
                  <img
                    lazy="loading"
                    v-once
                    class="img-fluid d-md-none"
                    src="@/assets/images/logo/app-store.webp"
                    alt="Logo App Store"
                    width="150"
                  />
                </a>
              </li>
            </ul>
          </a-col>
        </a-row>
      </div>
    </div>
    <div :class="$style.bottom" class="py-4">
      <div :class="$style.container">
        <div class="text-center d-sm-flex align-items-sm-center justify-content-center">
          <span class="text-white">
            COPYRIGHT © {{ new Date().getFullYear() }}
            <a
              class="text-danger font-weight-bold d-block d-sm-inline-block"
              href="https://sisi.id"
              target="_blank"
            >
              PT Sinergi Informatika Semen Indonesia
            </a>
            <span class="d-none d-sm-inline-block"
              >, anak usaha dari PT Semen Indonesia TBK. All rights reserved.</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)

    return {
      settings,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
