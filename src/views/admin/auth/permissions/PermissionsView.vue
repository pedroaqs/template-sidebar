<template>
  <el-row :gutter="10" type="flex" justify="space-bettwen" style="margin: 15px 0">
    <el-col :sm="24" :md="12">
      <el-row :gutter="10">
        <el-col :xs="18" :sm="20" :md="5" class="actions-component">
          <el-button
            v-permission="['permisos.crear']"
            type="primary"
            @click="openDialogCreate = true"
          >
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
        <template #suffix>
          <v-icon name="hi-search" @click="getList"/>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-table v-loading="loading" :data="tableData" style="width: 100%" :height="alturaPorDispositivo('65vh','50vh')">
    <el-table-column prop="index" label="#" width="100" header-align="center" align="center" />
    <el-table-column prop="name" label="NOMBRE" />
    <el-table-column align="center">
      <template #default="scope">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">Opciones</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-permission="['permisos.actualizar']"
                :command="{ item: scope.row.id, action: 'EDIT' }"
              >
                <span>
                  <v-icon name="md-edit-round" style="margin-right: 10px" />
                  Editar
                </span>
              </el-dropdown-item>
              <el-dropdown-item
                v-permission="['permisos.eliminar']"
                :command="{ item: scope.row.id, action: 'DELETE' }"
              >
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
  <el-dialog v-model="openDialogCreate" :width="calcularAnchoDialog('75%','90%')">
    <template #header> Nuevo permiso</template>
    <create-permision @close="handleCloseCreate" />
  </el-dialog>
  <el-dialog v-model="openDialogEdit" :width="calcularAnchoDialog('75%','90%')">
    <template #header> Editar permiso</template>
    <edit-permission :id-permission="idItemToEdit" @close="handleCloseEdit" />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import CreatePermision from './components/CreatePermision.vue';
import EditPermission from './components/EditPermission.vue';
import PermissionRequest from '@/api/auth/permision';
import { calcularAnchoDialog, alturaPorDispositivo } from '@/utils/responsive';

const permissionRequest = new PermissionRequest();

const loading = ref(false);
const openDialogCreate = ref(false);
const openDialogEdit = ref(false);
const tableData = ref([]);
const total = ref(0);
const query = reactive({
  keyword: '',
  limit: 10,
  page: 1,
});
const idItemToEdit = ref('');

onMounted(() => {
  getList()
})

const getList = () => {
  loading.value = true;
  openDialogCreate.value = false;
  openDialogEdit.value = false;
  permissionRequest
    .list(query)
    .then((response) => {
      const { data, meta } = response;
      data.forEach((elemento, index) => {
        elemento.index = (query.page - 1) * query.limit + index + 1;
      });
      total.value = meta.total;
      tableData.value = data;
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      console.log(error);
    });
};

const handleCloseCreate = (status) => {
  if (status == 'success') getList();
  openDialogCreate.value = false;
};

const handleCloseEdit = (status) => {
  if (status == 'success') getList();
  idItemToEdit.value = '';
  openDialogEdit.value = false;
};

const handleCommand = ({ item, action }) => {
  if (action == 'EDIT') {
    idItemToEdit.value = item;
    nextTick(() => {
      openDialogEdit.value = true;
    });
  }
  if (action == 'DELETE') {
    ElMessageBox.confirm('¿Está seguro que desea eliminar el permiso?', 'Eliminar permiso', {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    })
      .then(() => {
        permissionRequest
          .destroy(item)
          .then((response) => {
            ElNotification({
              title: 'Permiso eliminado',
              type: 'success',
              duration: 2000,
            });
            console.log(response)
            getList();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>
