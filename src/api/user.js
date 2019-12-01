import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function loginout () {
  return request({
    url: '/api/loginout',
    method: 'get'
  })
}

export function list (params) {
  return request({
    url: '/api/user/listpage',
    method: 'get',
    params
  })
}

export function add (data) {
  return request.get(
    '/api/user/add',
    { params: data }
  )
}

export function edit (data) {
  return request.get(
    '/api/user/edit',
    { params: data }
  )
}

export function remove (data) {
  return request.get(
    '/api/user/remove',
    { params: data }
  )
}

export function batchremove (data) {
  return request.get(
    '/api/user/batchremove',
    { params: data }
  )
}
