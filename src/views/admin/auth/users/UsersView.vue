<template>
  <el-row :gutter="10" type="flex" justify="space-bettwen" style="margin: 15px 0">
    <el-col :sm="24" :md="12">
      <el-row :gutter="10">
        <el-col :xs="18" :sm="20" :md="5" class="actions-component">
          <el-button type="primary" @click="openDialogCreate = true">
            <template #icon>
              <v-icon name="md-add-round" />
            </template>
            Nuevo
          </el-button>
        </el-col>
        <el-col :xs="6" :sm="4" :md="3" class="actions-component">
          <el-button type="success" @click="getList">
            <template #icon>
              <v-icon name="co-reload" />
            </template>
          </el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :sm="24" :md="12" class="actions-component">
      <el-input
              v-model="query.keyword"
              placeholder="Buscar por doc. de identidad, apellidos o nombres"
              @change="getList"
            >
              <template #prefix>
                <v-icon name="hi-search" />
              </template>
            </el-input>
    </el-col>
  </el-row>
  <el-table v-loading="loading" :data="tableData" style="width: 100%" :height="alturaPorDispositivo('65vh','50vh')">
    <el-table-column type="index" label="#" width="100" align="center" header-align="center" />
    <el-table-column label="DOC. IDENTIDAD" width="200">
      <template #default="scope">
        {{ scope.row.persona.nro_doc_identidad }}
      </template>
    </el-table-column>
    <el-table-column label="NOMBRE">
      <template #default="scope">
        {{ scope.row.persona.nombre_completo }}
      </template>
    </el-table-column>
    <el-table-column prop="email" label="CORREO" />
    <el-table-column align="center">
      <template #header>
        <el-row type="flex" justify="space-between">
          <el-col :sm="24" :md="12">
            
          </el-col>
          <el-col :sm="24" :md="8"> </el-col>
        </el-row>
      </template>
      <template #default="scope">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link"> Opciones </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="{ item: scope.row.id, action: 'EDIT' }">
                <span>
                  <v-icon name="md-edit-round" style="margin-right: 10px" />
                  Editar
                </span>
              </el-dropdown-item>
              <el-dropdown-item :command="{ item: scope.row.id, action: 'DELETE' }">
                <span>
                  <v-icon name="md-delete" style="margin-right: 10px" />
                  Eliminar
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <el-divider />
  <el-row type="flex" justify="center">
    <el-pagination
      v-model:current-page="query.page"
      v-model:page-size="query.limit"
      :total="total"
      :page-sizes="[10, 15, 25, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="getList"
      @current-change="getList"
    />
  </el-row>
  <!-- <el-dialog top="5vh" v-model="openDialogCreate" :width="calcularAnchoDialog('75%','90%')">
    <template #header>Nueva persona</template>
    <div style="height: 70vh; overflow-y: auto;">
      <create-user @close="handleCloseCreate"/>
    </div>
  </el-dialog>
  <el-dialog top="5vh" v-model="openDialogEdit" :width="calcularAnchoDialog('75%','90%')">
    <template #header>Editar persona</template>
    <div style="height: 70vh; overflow-y: auto;">
      <edit-user :id-user="idItemToEdit" @close="handleCloseEdit"/>
    </div>
  </el-dialog> -->
</template>

<script setup>
import UserRequest from '@/api/auth/usuario'
import { ElMessageBox, ElNotification } from 'element-plus'
import {  alturaPorDispositivo } from '@/utils/responsive'
// calcularAnchoDialog
import { nextTick, onMounted, reactive, ref } from 'vue'
// Componentes
// import CreateUser from './components/CreateUser.vue'
// import EditUser from './components/EditUser.vue'

const userRequest = new UserRequest()

const openDialogCreate = ref(false)
const openDialogEdit = ref(false)
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const query = reactive({
  keyword: '',
  limit: 10,
  page: 1
})
const idItemToEdit = ref('')

onMounted(() => {
  getList()
})

const getList = () => {
  loading.value = true
  userRequest
    .list(query)
    .then((response) => {
      const { data, meta } = response
      tableData.value = data
      total.value = meta.total
      loading.value = false
    })
    .catch((error) => {
      console.log(error)
      loading.value = false
    })
}

// const handleCloseCreate = (status) => {
//   if (status == 'success') getList()
//   openDialogCreate.value = false
// }

// const handleCloseEdit = (status) => {
//   if (status == 'success') getList()
//   openDialogEdit.value = false
//   idItemToEdit.value = ''
// }

const handleCommand = ({ item, action }) => {
  if (action == 'EDIT') {
    idItemToEdit.value = item
    nextTick(() => {
      openDialogEdit.value = true
    })
  }
  if (action == 'DELETE') {
    ElMessageBox.confirm('¿Está seguro que desea eliminar el usuario?', 'Eliminar usuario', {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    })
      .then(() => {
        userRequest
          .destroy(item)
          .then((response) => {
            ElNotification({
              title: 'Usuario eliminado',
              type: 'success',
              duration: 2000
            })
            console.log(response)
            getList()
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
