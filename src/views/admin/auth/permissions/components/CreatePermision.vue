<template>
  <div v-loading="loading">
    <el-form ref="createPermissionForm" :model="permission" :rules="rules" label-position="top">
      <el-form-item prop="name" label="Nombre">
        <el-input v-model="permission.name" placeholder="Ejem: listar-usuarios" />
      </el-form-item>
    </el-form>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :md="7" style="margin: 0 0 7px 0">
        <el-button @click="close('canceled')">CANCELAR</el-button>
      </el-col>
      <el-col :xs="24" :md="7">
        <el-button type="primary" @click="submitForm(createPermissionForm)">GUARDAR</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import PermissionRequest from '@/api/auth/permision'
import { ElNotification } from 'element-plus'
const permissionRequest = new PermissionRequest()
import { reactive, ref } from 'vue'

const emit = defineEmits(['close'])
const loading = ref(false)
const createPermissionForm = ref()
const permission = reactive({
  name: ''
})

const rules = reactive({
  name: [{ required: true, message: 'Campo obligatorio', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid) => {
    if (valid) {
      permissionRequest
        .store(permission)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          ElNotification({
            type: 'success',
            title: 'Permiso creado',
            duration: 2000
          })
          close('success')
          loading.value = false
        })
        .catch((error) => {
          console.log(error)
          loading.value = false
        })
    } else {
      loading.value = false
    }
  })
}

const resetForm = () => {
  Object.assign(permission, reactive({
    name: ''
  }));
}

const close = (status) => {
  emit('close', status)
  resetForm()
}
</script>
