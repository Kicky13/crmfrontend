<template>
  <div>
      <div class="container">
        <div>
            <a class="btn btn-main btn-with-addon text-nowrap pull-left" href="#/program/tambah"><span class="btn-addon">
            <i class="btn-addon-icon fe fe-plus-circle"></i>
            </span>Add New Program</a>
        </div><br><br>
        <!-- <div class="card-placeholder"><vb-headers-tag :data="{ title: 'List Program' }" /></div> -->
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <!-- <vb-widgets-list-program /> -->
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <!-- <vb-widgets-list-program /> -->
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <!-- <vb-widgets-list-program /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import VbHeadersTag from '@/@vb/widgets/Headers/Tag'
// import VbWidgetsListProgram from '@/@vb/widgets/WidgetsLists/ListProgram'

export default {
  components: {
    // VbHeadersTag,
    // VbWidgetsListProgram,
  },
}
</script>
