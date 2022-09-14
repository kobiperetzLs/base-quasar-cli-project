import HTTP from '../../services/HTTP'

export async function login({ commit }, user) {
  try {
    const userData = await HTTP.post('/users/login', { email: user.email, password: user.password })
    commit('setToken', userData.data.accessToken)
    return userData.data
  } catch (err) {
    return err.response.data
  }
}

// export async function forgotPassword({ commit }, form) {
//   try {
//     return await HTTP.post('/forgot-password', { email: form.email })
//   } catch (err) {
//     throw err
//   }
// }





export async function changePassword({ commit }, params) {
  try {
    debugger
    return await HTTP.post('/users/change-password', params)
  } catch (err) {
    throw err
  }
}
