<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header"><vb-headers-card-header :data="{ title: 'Create New Role' }" /></div>
          <div class="card-body">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol" label-align="left">
              <a-form-item label="Role name">
                <a-input placeholder="Insert Role name..." />
              </a-form-item>
              <a-form-item label="Role Code">
                <a-input placeholder="Insert Role code..." />
              </a-form-item>
            </a-form>
            <button type="submit" class="btn btn-success px-5">Submit Data</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VbHeadersCardHeader from '@/@vb/widgets/Headers/CardHeader'
import { reactive, toRaw } from 'vue'

export default {
  name: 'VbFormExamples',
  components: {
    VbHeadersCardHeader,
  },
  setup() {
    const formState = reactive({
      name: '',
      email: '',
      budget: '',
      amount: 0,
    })

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    }
  },
}
</script>
