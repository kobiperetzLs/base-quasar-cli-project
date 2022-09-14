<template>
  <q-page class="backoffice backoffice-login-page">

    <div class="backoffice-title">{{ $t('header') }}</div>

    <div class="q-mx-md">
      <q-card class="login-form q-pb-xl">
        <q-card-section>
          <div class="login-form-title">{{ $t('register.title') }}</div>

          <div v-if="errorMessage" class="error-message text-center text-negative q-mb-md">
            <b v-text="errorMessage"></b>
          </div>

          <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
            <div class="q-mb-sm">
              <base-input :el="email"/>
            </div>
            <div class="q-mb-sm">
              <base-input :el="password"/>
            </div>
            <div class="q-mb-sm">
              <base-input :el="firstName"/>
            </div>
            <div class="q-mb-sm">
              <base-input :el="lastName"/>
            </div>

            <div class="row flex items-center q-mb-md">
              <div class="col">
                <router-link class="forgot-password" :to="{ name: 'Login' }">
                  <span class="text-bold back"><</span>
                </router-link>
              </div>
              <div class="col text-right">
                <base-button :el="buttonData"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import BaseInput from '../../components/form/BaseInput'
import BaseButton from '../../components/form/BaseButton'

import jwt_decode from 'jwt-decode'
import { mapActions } from 'vuex'
import { createUser } from 'src/store/users/users.actions';

const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/

export default {
  name: 'Register',
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      form: {
        email: process.env.VUE_APP_ADMIN_EMAIL || '',
        password: process.env.VUE_APP_ADMIN_PASSWORD || '',
        roles: process.env.VUE_APP_ROLES || ['Admin']
      },
      loading: false,
      errorMessage: null
    }
  },
  computed: {
    email() {
      return {
        type: 'input',
        inputType: 'email',
        form: this.form,
        key: 'email',
        placeholder: 'Email Address',
        tabindex: 0,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        rules: [val => val && val.length > 0 || this.$t('errors.noEmailData')],
        error: this.isSubmit && !(this.form.email && email_pattern.test(this.form.email))

      }
    },
    passwordData() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'password',
        placeholder: 'Password',
        tabindex: 1,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        rules: [val => val && val.length > 0 || this.$t('errors.noPasswordData')]
      }
    },

    firstName() {
      return {
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'first_name',
        placeholder: 'First Name',
        tabindex: 0,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.first_name && this.form.first_name.length > 0)
      }
    },
    lastName() {
      return {
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'last_name',
        placeholder: 'Last Name',
        tabindex: 1,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.last_name && this.form.last_name.length > 0)
      }
    },
    buttonData() {
      return {
        type: 'button',
        buttonType: 'submit',
        label: this.$t('register.buttonDataLabel'),
        color: 'primary',
        disable: this.loading
      }
    },
    roles() {
      return {
        form: this.form,
        key: 'roles',
        options: ['admin', 'customer-care', 'analytics', 'inspection', 'settings', 'orders'], // supportTier2
        tabindex: 3,
        dense: true,
        outlined: true,
        useChips: true,
        multiple: true,
        menuAnchor: 'bottom start'
      }
    },
    password() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'password',
        placeholder: 'Password',
        tabindex: 4,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.password && this.form.password.length > 0) && !this.form.uuid
      }
    }
  },
  methods: {
    ...mapActions('users', ['createUser']),
    ...mapActions('app', ['showLoading', 'hideLoading']),
    async onSubmit() {
      try {
        const isValidate = await this.$refs.form.validate()
        if (isValidate) {
          this.loading = true
          this.showLoading()
          this.errorMessage = null
          console.log(this.form)
          debugger
          const response = await this.createUser(this.form, true)


          if (!response.success) {
            this.$refs.form.reset()
            this.errorMessage = response.message
          } else {

            await this.$router.push({ name: 'Login' })
          }
        }
      } catch (err) {
        console.log('[ERROR]:', err)
      } finally {
        this.loading = false
        this.hideLoading()
      }
    },
    onReset() {
      this.form.password = null
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style scoped lang="scss">
//@import "../css/backoffice";
.back {
  font-size: 20px;
  text-decoration: none;

}
</style>
