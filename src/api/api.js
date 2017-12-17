/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'


let base = ''
let base_user_dir = '/dagger'
// let base_user_dir = 'http://localhost:8100'

export const requestDoLogin = params => { return axios.post(`${base_user_dir}/login/doin`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoLogout = params => { return axios.post(`${base_user_dir}/login/doout`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const reqSaveUserProfile = params => { return axios.post(`${base}/user/profile`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const reqCurrentPrivilege = params => { return axios.post(`${base_user_dir}/login/currentPrivilege`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const reqGetBookListPage = params => { return axios.get(`${base}/book/list`, { params: params }) }

export const reqDeleteBook = params => { return axios.get(`${base}/book/delete`, { params: params }) }

export const reqEditBook = params => { return axios.get(`${base}/book/edit`, { params: params }) }

export const reqBatchDeleteBook = params => { return axios.get(`${base}/book/batchdelete`, { params: params }) }

export const reqAddBook = params => { return axios.get(`${base}/book/add`, { params: params }) }

export const requestDoRegisterUser = params => { return axios.post(`${base_user_dir}/register/doregister`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoUpdateUser = params => { return axios.post(`${base_user_dir}/usermanage/doupdate`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoChangePwd = params => { return axios.post(`${base_user_dir}/usermanage/dochangepwd`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoQueryUsers = params => { return axios.post(`${base_user_dir}/usermanage/doquery`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoQueryRoles = params => { return axios.post(`${base_user_dir}/rolemanage/doqueryroles`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoAddRoles = params => { return axios.post(`${base_user_dir}/rolemanage/doaddrole`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoQueryUserRoles = params => { return axios.post(`${base_user_dir}/rolemanage/doqueryrolebyuser`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoBindUserRoles = params => { return axios.post(`${base_user_dir}/rolemanage/dobind`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoQueryPrivileges = params => { return axios.post(`${base_user_dir}/privilegemanage/queryprivileges`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoAddPrivileges = params => { return axios.post(`${base_user_dir}/privilegemanage/doaddprivilege`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoQueryRolePrivileges = params => { return axios.post(`${base_user_dir}/privilegemanage/queryprivilegebyrole`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

export const requestDoBindRolePrivileges = params => { return axios.post(`${base_user_dir}/privilegemanage/dobind`, params ,{
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                  }).then(res => res.data) }

//公共查询
export const requestDoQuerySecLevelPrivileges = params => { return axios.get(`${base_user_dir}/pub/sel/seclevelprivileges`, params).then(res => res.data) }

