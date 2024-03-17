<template>
  <div v-loading="loading">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-input v-model="filterText" placeholder="Buscar por nombre" />
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="5">
        <el-button type="success" @click="loadData">
          <template #icon>
            <v-icon name="co-reload" />
          </template>
        </el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="5">
        <el-button type="primary" @click="syncPermissions">
          <template #icon>
            <v-icon name="md-cloudsync" />
          </template>
          SINCRONIZAR
        </el-button>
      </el-col>
    </el-row>
    <el-divider />
    <div style="height: 50vh; overflow-y: auto">
      <el-tree
        ref="treeRef"
        class="filter-tree"
        node-key="id"
        :data="listaPermisos"
        :props="defaultProps"
        :default-checked-keys="rolePermissions"
        show-checkbox
        :filter-node-method="filterNode"
      />
    </div>
  </div>
</template>

<script setup>
import PermissionRequest from '@/api/auth/permision'
const permissionRequest = new PermissionRequest()
import RoleRequest from '@/api/auth/role'
import { ElNotification } from 'element-plus'
const roleRequest = new RoleRequest()

import { onMounted, reactive, ref, watch } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps({
  idRole: {
    type: String,
    required: true
  }
})
const loading = ref(false)
const listaPermisos = reactive([])
const rolePermissions = ref([])

watch(
  () => {
    return props.idRole
  },
  (newValue, oldValue) => {
    if (newValue != oldValue && newValue != '' && newValue != null) {
      loading.value = true
      cargarListaPermisos()
      cargarListaPermisosRol()
    }
  }
)

onMounted(() => {
  loading.value = true
  cargarListaPermisos()
  cargarListaPermisosRol()
})
const loadData = () => {
  loading.value = true
  cargarListaPermisos()
  cargarListaPermisosRol()
}
const filterText = ref('')
const treeRef = ref()

const defaultProps = {
  label: 'name',
  id: 'id'
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, listaPermisos) => {
  if (!value) return true
  return listaPermisos.name.includes(value)
}

const cargarListaPermisos = () => {
  permissionRequest
    .all()
    .then((response) => {
      const { data } = response
      Object.assign(listaPermisos, reactive(data))
    })
    .catch((error) => console.log(error))
}
const cargarListaPermisosRol = () => {
  permissionRequest
    .fetchPermissionsForRole({ role_id: props.idRole })
    .then((response) => {
      const { data } = response
      rolePermissions.value = data.map((elemento) => elemento.id)
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      console.log(error)
    })
}

const syncPermissions = () => {
  roleRequest
    .syncRolePermissions({role_id: props.idRole, permissions: treeRef.value.getCheckedKeys(true)})
    .then(() => {
      ElNotification({
        type: 'success',
        title: 'Permisos actualizados',
        duration: 2000
      })
      emit('close')
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      console.log(error)
    })
}
</script>
