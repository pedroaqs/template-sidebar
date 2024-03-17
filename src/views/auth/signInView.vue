<template>
  <div class="sign-in-container">
    <el-card>
      <div>
        <el-row type="flex" justify="center">
          <img id="form-image" src="@/assets/img/admin-template-main.png" alt="Main Image" />
        </el-row>
        <el-row type="flex" justify="center">
          <h3>Iniciar sesion</h3>
        </el-row>
        <el-row type="flex" justify="center">
          <el-form ref="signInFormRef" :model="authForm" :rules="rules" label-position="top">
            <el-form-item label="Correo" prop="email">
              <el-input v-model="authForm.email" />
            </el-form-item>
            <el-form-item label="Contraseña" prop="password">
              <el-input v-model="authForm.password" type="password" @keyup.enter="signIn" />
            </el-form-item>
          </el-form>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button v-loading.fullscreen.lock="loading" type="primary" @click="signIn">Iniciar Sesion</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
const authStore= useAuthStore();
export default {
  name: 'SignInView',
  data() {
    return {
      loading: false,
      authForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Por favor ingrese su correo electronico',
            trigger: 'change'
          },
          { type: 'email', message: 'Debe ingresar un correo electronico', trigger: 'blur' },
        ],
        password: [
          {
            required: true,
            message: 'Por favor ingrese su contraseña',
            trigger: 'change'
          },
        ]
      }
    }
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     const query = route.query
    //     if (query) {
    //       this.redirect = query.redirect
    //     }
    //   },
    //   immediate: true
    // }
  },
  methods: {
    async signIn() {
      this.loading = true
      // console.log('Login credentials: ', this.email, ' ', this.password)
      this.$refs['signInFormRef'].validate((valid, fields) => {
        if (valid) {
          authStore.signIn(this.authForm)
            .then(() => {
              this.loading = true
              this.$router.push('/dashboard');
            })
            .catch(
              (error) => {
                this.loading = false
                console.log(error);
              }
            );
        } else {
          this.loading = false
          console.log('error submit!', fields)
        }}
      );
    }
  }
}
</script>

<style>
.sign-in-container {
  display: flex;
  width: 100vw;
  height: 91vh;
  justify-content: center;
  align-items: center;
}

#form-image {
  width: 30vw;
}

@media (max-width: 1024px) {
  #form-image {
    width: 80vw;
  }
}
</style>
