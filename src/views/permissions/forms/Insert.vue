<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header"><vb-headers-card-header :data="{ title: 'Create New Permission' }" /></div>
          <div class="card-body">
            <a-form label-align="left" layout="vertical">
                <div class="row">
                    <div class="col-lg-6">
                        <a-form-item label="Actor">
                            <a-input />
                        </a-form-item>
                    </div>
                    <div class="col-lg-6">
                        <a-form-item label="Page Name">
                            <a-input />
                        </a-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <a-form-item label="Subject">
                            <a-input />
                        </a-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <a-form-item label="Permission">
                            <a-input />
                        </a-form-item>
                    </div>
                </div>
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
