import AdminLayout from '@/layouts/adminLayout/adminLayout.vue'

const authRoutes = {
  path: '/autenticacion',
  component: AdminLayout,
  redirect: '/autenticacion/usuarios',
  name: 'Autenticacion',
  meta: {
    title: 'Autenticación',
    icon: 'hi-identification',
    noCache: true,
    // ,
    permissions: ['permisos.listar', 'roles.listar', 'usuarios.listar']
  },
  children: [
    {
      path: 'permisos',
      component: () => import('@/views/admin/auth/permissions/PermissionsView.vue'),
      name: 'PermisosAuth',
      meta: { title: 'Permisos', icon: 'md-playlistaddcheck-round', noCache: true, permissions: ['permisos.listar'] }
    },
    {
      path: 'roles',
      component: () => import('@/views/admin/auth/roles/RolesView.vue'),
      name: 'RolesAuth',
      meta: { title: 'Roles', icon: 'bi-person-lines-fill', noCache: true, permissions: ['roles.listar'] }
    },
    {
      path: 'usuarios',
      component: () => import('@/views/admin/auth/users/UsersView.vue'),
      name: 'UsuariosAuth',
      meta: { title: 'Usuarios', icon: 'hi-solid-users', noCache: true, permissions: ['usuarios.listar'] }
    }
  ]
}

export default authRoutes