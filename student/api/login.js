import request from '@/config/request.js';

// 用户登录(账号+密码)
export const login = (params) => request.post('/user/login', params, { custom: { auth: false } })

// 用户退出
export const logout = () => request.delete('/user/logout')

// 注册
export const register = (params) => request.post('/user/register/student', params)
