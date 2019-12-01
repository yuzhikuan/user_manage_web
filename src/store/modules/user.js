import { login, loginout, list, add, edit, remove, batchremove } from '@/api/user'
import { resetRouter } from '@/router'
import { removeSession } from '@/utils/tools'

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user loginout
  loginout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      loginout().then(() => {
        resetRouter()
        removeSession()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user list
  list ({ commit }, data) {
    return new Promise((resolve, reject) => {
      list(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // add user
  add ({ commit }, user) {
    return new Promise((resolve, reject) => {
      add(user).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // edit user
  edit ({ commit }, user) {
    return new Promise((resolve, reject) => {
      edit(user).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove user
  remove ({ commit }, ids) {
    return new Promise((resolve, reject) => {
      remove(ids).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // batchremove user
  batchremove ({ commit }, ids) {
    return new Promise((resolve, reject) => {
      batchremove(ids).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
