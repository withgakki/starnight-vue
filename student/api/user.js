import request from '@/config/request.js';

// 获取用户信息
export const getInfo = () => request.get('/user/profile')

// 修改用户信息
export const updateInfo = (params) => request.put('/user/profile', params)

// 上传头像
export const updateAvatar = (url) => request.upload('/user/profile/avatar', 'avatarfile', url)

// 修改密码
export const updatePwd = (params) => request.put('/user/profile/updatePwd', params)
