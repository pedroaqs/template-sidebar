<template>
  <div v-loading="loading">
    <el-form ref="editRoleForm" :model="permission" :rules="rules" label-position="top">
      <el-form-item prop="name" label="Nombre">
        <el-input v-model="permission.name" placeholder="Ejem: admin" />
      </el-form-item>
    </el-form>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :md="7" style="margin: 0 0 7px 0">
        <el-button @click="close('canceled')">CANCELAR</el-button>
      </el-col>
      <el-col :xs="24" :md="7">
        <el-button type="primary" @click="submitForm(editRoleForm)">GUARDAR</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import RoleRequest from '@/api/auth/role'
import { ElNotification } from 'element-plus'
const roleRequest = new RoleRequest()
import { reactive, ref, onMounted, watch } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  idRole: {
    type: String,
    required: true
  }
})

watch(() => {
  return props.idRole;
}, (newValue, oldValue) => {
  if(newValue != oldValue && newValue != '' && newValue != null) {
    cargarRegistro()
  }
});
const emit = defineEmits(['close'])

const loading = ref(false)
const editRoleForm = ref()
const permission = reactive({
  id: '',
  name: ''
})

const cargarRegistro = () => {
  loading.value = true
  roleRequest
    .get(props.idRole)
    .then((response) => {
      const { data } = response
      Object.assign(permission, data)
      // permission.value = data
      loading.value = false
    })
    .catch((error) => {
      console.log(error)
      loading.value = true
      ElNotification({
        type: 'error',
        title: 'Error al recuperar el registro',
        duration: 2000
      })
      close('canceled')
    })
}

onMounted(() => {
  cargarRegistro()
})

const rules = reactive({
  name: [{ required: true, message: 'Campo obligatorio', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid) => {
    if (valid) {
      roleRequest
        .update(permission.id,permission)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          ElNotification({
            type: 'success',
            title: 'Rol actualizado',
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
  Object.assign(
    permission,
    reactive({
      id: '',
      name: ''
    })
  )
}

const close = (status) => {
  emit('close', status)
  resetForm()
}
</script>
