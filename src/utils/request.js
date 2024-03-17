import axios from 'axios'
import { getToken, removeToken } from './auth'
import { ElMessage, ElMessageBox } from 'element-plus'
// import useAuthStore from '../stores/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // url = base url + request url
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // 1000milisegundos * #segundos
})

service.interceptors.request.use(
  (config) => {
    if (getToken() != null) {
      const token = getToken()
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      // setToken(response.headers.authorization)
      response.data.token = response.headers.authorization
    }
    const res = response.data
    return res
  },
  error => {
    // Captura error 400 Bad request
    if (error.response.status === 400) {
      console.log(error.response)
    }
    if (error.response.status === 409) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && getToken() !== null) {
      // to re-login
      ElMessageBox.confirm(
        'Su sesión ha caducado, por favor vuelva a iniciar sesión',
        'Atención',
        {
          confirmButtonText: 'Ir a iniciar sesión',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        }
      ).then(() => {
        // this.$store.dispatch('user/resetToken').then() => {
        removeToken()
        // store.dispatch('user/resetToken').then(() => {
          // })
        location.reload()
      })
    }
    // se venció el tiempo de csrf
    if (error.response.status === 419) {
      // to re-login csrf timeout
      location.reload()
    }
    // //////////////////////////////////////////////////////////////////////////////////////////////////
    // Mostrar errores no controlados
    // console.log('err ', error.response.status) // for debug
    let mimsgerror = error.message
    // let mititle = 'Error inesperado'
    let mimsg = '<ul>'

    // Este error devuelto con codigo 422, Request Laravel
    if (error.response.status === 422) {
      if (Object.getOwnPropertyDescriptor(error.response, 'data')) {
        // console.log(error.response)
        if (Object.getOwnPropertyDescriptor(error.response.data, 'errors')) {
          Object.entries(error.response.data.errors).forEach(function(item) {
            item[1].forEach(function(elemento) {
              mimsg += '<li>' + elemento + '</li>'
            })
          })
        }
        ElMessage({
          dangerouslyUseHTMLString: true,
          message: '<strong>Operación no realizada!</strong> <em> las razones pueden ser:</em><br>' + mimsg,
          type: 'info',
          duration: 6.25 * 1000
        })

        return Promise.reject(error)
      }
    }

    // Error 500
    if (error.response.status === 500) {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '<strong>Ups!</strong> <em>algo salió mal...</em><br>Se ha producido un error interno...</em>',
        type: 'info',
        duration: 6.25 * 1000
      })

      return Promise.reject(error)
    }

    // Error 404
    if (error.response.status === 404) {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '<strong>Ups!</strong> <em>algo salió mal...</em><br>No se ha llevado a cabo la operación solicitada</em>',
        type: 'info',
        duration: 6.25 * 1000
      })

      return Promise.reject(error)
    }

    if (error.response.data && error.response.data.errors) {
      mimsgerror = error.response.data.errors
      if (mimsgerror.message) {
        const _message = mimsgerror.message
        _message.forEach(element => {
          mimsg += '<li>' + element + '</li>'
        })
        mimsg += '</ul>'
      } else {
        mimsg = error.response.data.errors
      }
      // message.message = mimsg
    } else if (error.response.data && error.response.data.error) {
      mimsgerror = error.response.data.error
      if (mimsgerror.message) {
        mimsg = mimsgerror.message
      } else {
        mimsg = error.response.data
      }
    } else {
      // mititle = error.response.status
      mimsg = error.message
    }
    // if (mimsgerror.title) {
    //   // mititle = mimsgerror.title
    // } else {
    //   // mititle = error.response.status
    // }

    ElMessage({
      dangerouslyUseHTMLString: true,
      message: '<strong>Ups!</strong> <em>algo salió mal...</em><br>' + mimsg,
      type: 'info',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;