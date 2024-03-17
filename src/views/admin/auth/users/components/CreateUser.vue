<template>
  <div v-loading="loading">
    <el-form :model="formData" :rules="formRules" ref="createUserForm" label-position="top">
      <el-row :gutter="10">
        <el-col :sm="24" :md="16">
          <el-form-item>
            <el-col :sm="24" :md="11">
              <el-form-item label="Tipo Doc. Identidad" prop="tipo_doc_identidad">
                <el-select
                  v-model="formData.id_tipo_doc_identidad"
                  placeholder="Seleccione un tipo"
                >
                  <el-option
                    v-for="tipo in tiposDocIdentidad"
                    :key="tipo.id"
                    :label="tipo.nombre"
                    :value="tipo.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="2" />
            <el-col :sm="24" :md="11">
              <el-form-item label="Nro. Doc. Identidad" prop="nro_doc_identidad">
                <el-input v-model="formData.nro_doc_identidad">
                  <template #suffix>
                    <v-icon name="hi-search" @click="fetchPersonByDNI" />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :sm="24" :md="11">
              <el-form-item label="Apellido Paterno" prop="apellido_paterno" @input="formData.apellido_paterno = formData.apellido_paterno.toUpperCase()">
                <el-input v-model="formData.apellido_paterno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="2" />
            <el-col :sm="24" :md="11">
              <el-form-item label="Apellido Materno" prop="apellido_materno" @input="formData.apellido_materno = formData.apellido_materno.toUpperCase()">
                <el-input v-model="formData.apellido_materno" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="Nombres" prop="nombres" @input="formData.nombres = formData.nombres.toUpperCase()">
                <el-input v-model="formData.nombres" />
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :sm="24" :md="11">
              <el-form-item label="Fecha de Nacimiento" prop="fecha_nacimiento">
                <el-date-picker
                  v-model="formData.fecha_nacimiento"
                  type="date"
                  format="DD-MM-YYYY"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="2" />
            <el-col :sm="24" :md="11">
              <el-form-item label="Género" prop="genero">
                <el-select v-model="formData.genero">
                  <el-option label="Masculino" value="MASCULINO"></el-option>
                  <el-option label="Femenino" value="FEMENINO"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :sm="24" :md="11">
              <el-form-item label="Celular" prop="celular">
                <el-input v-model="formData.celular"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="2" />
            <el-col :sm="24" :md="11">
              <el-form-item label="Email" prop="email" @input="formData.email = formData.email.toUpperCase()">
                <el-input v-model="formData.email" />
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :sm="24" :md="11">
              <el-form-item label="Pais" prop="id_pais">
                <el-select
                  v-model="formData.id_pais"
                  filterable
                  placeholder="Seleccione un pais"
                  @change="fetchDepartamentos"
                >
                  <el-option
                    v-for="pais in paises"
                    :key="pais.id"
                    :label="pais.nombre"
                    :value="pais.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="2" />
            <el-col :sm="24" :md="11">
              <el-form-item label="Departamento" prop="id_departamento">
                <el-select
                  v-model="formData.id_departamento"
                  filterable
                  placeholder="Seleccione un departamento"
                >
                  <el-option
                    v-for="departamento in departamentos"
                    :key="departamento.id"
                    :label="departamento.nombre"
                    :value="departamento.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="8">
          <label>
            Roles
          </label>
          <div style="height: 40vh; overflow-y: auto;margin-top: 7px;">
            <el-input v-model="filterText" placeholder="Buscar rol" />
            <el-divider />
            <el-tree
              ref="treeRefRoles"
              node-key="id"
              :data="roles"
              :props="defaultProps"
              show-checkbox
              :filter-node-method="filterNode"
            />
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :sm="24" :md="4">
        <el-button @click="close('canceled')">Cancelar</el-button>
      </el-col>
      <el-col :sm="24" :md="4">
        <el-button @click="submitForm">Guardar</el-button>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
// imports de api
import TipoDocIdentidadRequest from '@/api/maestros/tipodocidentidad'
const tipoDocIdentidadRequest = new TipoDocIdentidadRequest()
import RoleRequest from '@/api/auth/role'
const roleRequest = new RoleRequest()
import PaisRequest from '@/api/maestros/pais'
const paisRequest = new PaisRequest()
import DepartamentoRequest from '@/api/maestros/departamento'
const departamentoRequest = new DepartamentoRequest()
import UtilsRequest from '@/api/utils/utils'
const utilsRequest = new UtilsRequest()
import UserRequest from '@/api/auth/usuario'
const userRequest = new UserRequest()
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'



const emit = defineEmits(['close'])
const loading = ref(false)
const createUserForm = ref()

const filterNode = (value, roles) => {
  if (!value) return true
  return roles.name.includes(value)
}

const formData = ref({
  apellido_paterno: '',
  apellido_materno: '',
  nombres: '',
  nro_doc_identidad: '',
  fecha_nacimiento: '',
  genero: '',
  celular: '',
  email: '',
  id_pais: '',
  id_departamento: '',
  id_tipo_doc_identidad: null,
  roles: null
})

const formRules = ref({
  apellido_paterno: [{ required: true, message: 'Ingrese el apellido paterno', trigger: 'blur' }],
  apellido_materno: [{ required: true, message: 'Ingrese el apellido materno', trigger: 'blur' }],
  nombres: [{ required: true, message: 'Ingrese los nombres', trigger: 'blur' }],
  nro_doc_identidad: [
    { required: true, message: 'Ingrese el número de documento', trigger: 'blur' }
  ],
  fecha_nacimiento: [
    { required: true, message: 'Seleccione la fecha de nacimiento', trigger: 'change' }
  ],
  genero: [{ required: true, message: 'Seleccione el género', trigger: 'change' }],
  celular: [{ required: true, message: 'Ingrese el número de celular', trigger: 'blur' }],
  email: [{ required: true, message: 'Ingrese el correo electrónico', trigger: 'blur' }],
  id_departamento: [{ required: true, message: 'Seleccione el departamento', trigger: 'change' }],
  id_pais: [{ required: true, message: 'Seleccione el pais', trigger: 'change' }],
  id_tipo_doc_identidad: [
    { required: true, message: 'Seleccione el tipo de doc. identidad', trigger: 'blur' }
  ]
})

const tiposDocIdentidad = ref([])
const paises = ref([])
const roles = ref([])
const departamentos = ref([])
const filterText = ref('')
const treeRefRoles = ref()

const defaultProps = {
  label: 'name',
  id: 'id'
}
// Recuperando Informacion necesaria para registrar:
onMounted(() => {
  fecthTiposDocIdentidad()
  fecthPaises()
  fetchRoles()
})

const fecthTiposDocIdentidad = () => {
  tipoDocIdentidadRequest
    .all()
    .then((response) => {
      console.log(response)
      tiposDocIdentidad.value = response.data
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        type: 'error',
        title: 'Error al precargar data del formulario',
        duration: 2000
      })
      close('canceled')
    })
}

const fecthPaises = () => {
  paisRequest
    .all()
    .then((response) => {
      console.log(response)
      paises.value = response.data
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        type: 'error',
        title: 'Error al precargar data del formulario',
        duration: 2000
      })
      close('canceled')
    })
}

const fetchDepartamentos = () => {
  if (formData.value.id_pais != null && formData.value.id_pais != '') {
    departamentoRequest
      .fetchByPaisId({ id_pais: formData.value.id_pais })
      .then((response) => {
        console.log(response)
        departamentos.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const fetchRoles = () => {
  roleRequest.all()
    .then((response) => {
      console.log(response)
      roles.value = response.data
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        type: 'error',
        title: 'Error al precargar data del formulario',
        duration: 2000
      })
      close('canceled')
    })
}

const fetchPersonByDNI = () => {
  const regDNI =
    tiposDocIdentidad.value[
      tiposDocIdentidad.value.findIndex((registro) => registro.nombre == 'DNI')
    ]
  if (regDNI.id == formData.value.id_tipo_doc_identidad) {
    if (formData.value.nro_doc_identidad != '') {
      loading.value = true
      utilsRequest
        .fetchPersonByDNI({ dni: formData.value.nro_doc_identidad })
        .then((response) => {
          const { data } = response
          formData.value.apellido_paterno = data.apellido_paterno
          formData.value.apellido_materno = data.apellido_materno
          formData.value.nombres = data.nombre
          loading.value = false
        })
        .catch((error) => {
          console.log(error)
          loading.value = false
        })
    } else {
      ElNotification({
        type: 'warning',
        title: 'Debe ingresar el DNI'
      })
    }
  } else {
    ElNotification({
      type: 'warning',
      title: 'Busqueda no disponible',
      message: 'La busqueda está disponible solo para DNI'
    })
  }
}

// Método para enviar el formulario
const submitForm = () => {
  formData.value.roles = treeRefRoles.value.getCheckedKeys(true)
  // Validar el formulario usando VeeValidate u otra biblioteca de validación
  createUserForm.value.validate((valid) => {
    if (valid) {
      // El formulario es válido, puedes realizar acciones adicionales aquí
      console.log('Formulario válido, enviando datos:', formData.value)
      loading.value = true
      userRequest.store(formData.value)
        .then((response) => {
          console.log(response)
          ElNotification({
            type: 'success',
            title: 'Usuario creado',
          })
          loading.value = false
          close('success')
        })
        .catch((error) => {
          console.log(error)
          loading.value = false
          ElNotification({
            type: 'error',
            title: 'Ocurrio un error al registrar al usuario',
          })
        })
    } else {
      console.error('Formulario no válido')
    }
  })
}


const close = (status) => {
  emit('close', status)
}
</script>
