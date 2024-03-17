import request from '@/utils/request'

import Resource from '../resource'

class RoleRequest extends Resource {
  constructor() {
    super('roles')
  }
  all() {
    return request({
      url: '/' + this.uri + 'all',
      method: 'get'
    })
  }
  syncRolePermissions(data) {
    return request({
      url: '/syncRolePermissions',
      method: 'post',
      data
    })
  }
}

export { RoleRequest as default }