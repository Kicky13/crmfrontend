<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <span class="font-weight-bold welcome">Selamat Datang,</span>
                <br />
                <span class="name-people"
                  ><strong>{{ $store.state.user.name.toUpperCase() }}</strong> pada Dashboard</span
                >
                <span class="name-product">
                  Akses<span class="name-product_toko">Toko</span>-<span class="name-product_toko"
                    >C</span
                  >RM</span
                >

                <br />
                <button class="btn btn-role btn-sm">{{ $store.state.user.role }}</button>
              </div>
            </div>
            {{ $store.state.user.role }}
            <div class="row mt-5">
              <div class="col-md-8 dashboard_menu">
                <div class="row">
                  <div class="col-md-4">
                    <div :class="$store.state.user.role == `SSM` ? `lock` : `unlock`">
                      <img
                        lazy="loading"
                        v-once
                        :src="
                          $store.state.user.role == `SSM`
                            ? require('@/assets/images/icon/lock.svg')
                            : require('@/assets/images/icon/unlock.svg')
                        "
                        alt="shop"
                      />
                    </div>

                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/volume_analytics.svg')"
                          alt="shop"
                        />
                      </div>
                      <span class="dashboard_menu_box_role ">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          CA & Volume
                        </span>
                        <br />
                        <span>Analytics</span>
                      </div>
                    </div>
                    <router-link :to="`/dashboard/volume_analytcs`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                  <div class="col-md-4">
                    <div :class="$store.state.user.role == `SSM` ? `lock` : `unlock`">
                      <img
                        lazy="loading"
                        v-once
                        :src="
                          $store.state.user.role == `SSM`
                            ? require('@/assets/images/icon/lock.svg')
                            : require('@/assets/images/icon/unlock.svg')
                        "
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/visit.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          Visit
                        </span>
                        <br />
                      </div>
                    </div>
                    <router-link :to="`/dashboard/visit`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                  <div class="col-md-4">
                    <div class="unlock">
                      <img
                        lazy="loading"
                        v-once
                        :src="require('@/assets/images/icon/unlock.svg')"
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/promo.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          Promotion
                        </span>
                        <br />
                      </div>
                    </div>
                    <router-link :to="`/dashboard/promotion`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                </div>
                <div class="row mt-5">
                  <div class="col-md-4">
                    <div class="unlock">
                      <img
                        lazy="loading"
                        v-once
                        :src="require('@/assets/images/icon/unlock.svg')"
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/movement.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          RBP
                        </span>
                        <br />
                        <span>Movement</span>
                      </div>
                    </div>
                    <router-link :to="`/dashboard/rbp_movement`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                  <div class="col-md-4">
                    <div class="unlock">
                      <img
                        lazy="loading"
                        v-once
                        :src="require('@/assets/images/icon/unlock.svg')"
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/monitoring.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          Price
                        </span>
                        <br />
                        <span>Monitoring</span>
                      </div>
                    </div>
                    <router-link :to="`/dashboard/price_monitoring`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                  <div class="col-md-4">
                    <div :class="$store.state.user.role == `SSM` ? `lock` : `unlock`">
                      <img
                        lazy="loading"
                        v-once
                        :src="
                          $store.state.user.role == `SSM`
                            ? require('@/assets/images/icon/lock.svg')
                            : require('@/assets/images/icon/unlock.svg')
                        "
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/share.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          Share of
                        </span>
                        <br />
                        <span>Wallet</span>
                      </div>
                    </div>
                    <router-link :to="`/dashboard/sow`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                </div>
                <div class="row mt-5">
                  <div class="col-md-4">
                    <div :class="$store.state.user.role == `SSM` ? `lock` : `unlock`">
                      <img
                        lazy="loading"
                        v-once
                        :src="
                          $store.state.user.role == `SSM`
                            ? require('@/assets/images/icon/lock.svg')
                            : require('@/assets/images/icon/unlock.svg')
                        "
                        alt="shop"
                      />
                    </div>
                    <div class="dashboard_menu_box text-center">
                      <div class="avatar-icon mb-4">
                        <img
                          lazy="loading"
                          v-once
                          :src="require('@/assets/images/icon/sales_route.svg')"
                          alt="shop"
                        />
                      </div>

                      <span class="dashboard_menu_box_role">
                        Dashboard Menu
                      </span>
                      <div class="mt-4">
                        <span>
                          Sales Route
                        </span>
                        <br />
                        <span>Compliance</span>
                      </div>
                    </div>
                    <router-link :to="`/dashboard/sales_route`" class="btn btn-visit w-100"
                      >Kunjungi</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="access-menu">
                  <span class="access-menu_title">Menu</span>
                  <br />
                  <span class="access-menu_subtitle">Menu yang dapat diakses</span>

                  <div class="access-menu_list mt-2">
                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Dashboard</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Marketing</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Master Data</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Weekly Price</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Weekly Price Monitoring</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">User Management</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Manajemen Menu</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Setting & Configuration</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Visit Plan</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Supervisory Visit</div>
                      </div>
                      <hr />
                    </div>

                    <div>
                      <div class="access-menu_list_item d-flex align-items-center">
                        <div class="item_box"></div>
                        <div class="ml-2 item_menu">Reporting</div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Dashboard/index.scss';
</style>
