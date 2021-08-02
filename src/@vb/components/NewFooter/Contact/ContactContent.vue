<template>
  <div
    class="row p-5"
    style="background-color: #343a40;"
  >
    <div class="col-md-12 col-xl-3 mb-5 mb-xl-0 text-center">
      <img
        src="@/assets/images/logo/akses-toko-logo.png"
        alt="Logo Akses Toko"
        style="max-width: 150px;"
      />
      <div class="my-3">
        <template
          v-for="(item, i) in mediaSosial"
          :key="i"
        >
          <a
            class="text-white mx-3"
            :href="item.link"
            target="_blank"
          >
            <i
              :class="item.icon"
              class="fa-lg"
            />
          </a>
        </template>
      </div>
      <a
        class="badge badge-pill badge-light py-2"
        href="mailto:customerservice@aksestoko.id"
        target="_blank"
      >
        <i class="fa fa-envelope-o"></i>
        <span> customerservice@aksestoko.id</span>
      </a>
    </div>
    <div class="col-md-3 col-lg mb-4 mb-lg-0">
      <h4 class="text-white">
        Memulai
      </h4>
      <ul>
        <template v-for="(item, i) in memulai" :key="i">
          <li>
            <text-link :link="item.link" :text="item.text" />
          </li>
        </template>
      </ul>
    </div>
    <div class="col-md-3 col-lg mb-4 mb-lg-0">
      <h4 class="text-white">
        Bantuan
      </h4>
      <ul>
        <template v-for="(item, i) in bantuan" :key="i">
          <li>
            <text-link :link="item.link" :text="item.text" />
          </li>
        </template>
      </ul>
    </div>
    <div class="col-md-3 col-lg mb-4 mb-lg-0">
      <h4 class="text-white">
        Tentang Kami
      </h4>
      <ul>
        <template v-for="(item, i) in tentangKami" :key="i">
          <li>
            <text-link :link="item.link" :text="item.text" />
          </li>
        </template>
      </ul>
    </div>
    <div class="col-md-3 col-lg">
      <h4 class="text-white">
        Aplikasi
      </h4>
      <ul>
        <li class="mb-3">
          <a
            href="https://play.google.com/store/apps/details?id=id.sisi.aksestokomobile"
            target="_blank"
          >
            <img
              src="@/assets/images/logo/google-play.png"
              alt="Logo Google Play"
              style="max-width: 150px;"
            />
          </a>
        </li>
        <li>
          <a
            href="https://aksestoko.id/application/ios"
            target="_blank"
          >
            <img
              src="@/assets/images/logo/app-store.png"
              alt="Logo App Store"
              style="max-width: 150px;"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TextLink from './../TextLink/TextLink'

export default {
  components: {
    TextLink,
  },

  data() {
    return {
      mediaSosial: [
        {
          icon: 'fa fa-whatsapp',
          link: 'https://wa.me/6281132001306',
        },
        {
          icon: 'fa fa-facebook-f',
          link: 'https://www.facebook.com/aksestokoid',
        },
        {
          icon: 'fa fa-instagram',
          link: 'https://www.instagram.com/aksestokoid',
        },
      ],
      memulai: [
        {
          text: 'Daftar',
          link: 'https://qa.aksestoko.id/auth/signup',
        },
        {
          text: 'Masuk',
          link: 'https://qa.aksestoko.id/auth/signin',
        },
        {
          text: 'Akun',
          link: 'https://qa.aksestoko.id/auth/profile',
        },
        {
          text: 'Pesanan',
          link: 'https://qa.aksestoko.id/order',
        },
      ],
      bantuan: [
        {
          text: 'FAQ',
          link: 'https://qa.aksestoko.id/home/faq',
        },
        {
          text: 'Layanan Pelanggan',
          link: 'https://qa.aksestoko.id/home/cs',
        },
      ],
      tentangKami: [
        {
          text: 'PT Semen Indonesia (Persero) Tbk (SIG)',
          link: 'https://sig.id',
        },
        {
          text: 'PT Sinergi Informatika Semen Indonesia (SISI)',
          link: 'https://sisi.id',
        },
      ],
    }
  },
}
</script>

<style lang="scss" module>
ul {
  list-style-type: none;
  padding: 0;
}

ul li a:hover {
  text-decoration: underline;
}
</style>
