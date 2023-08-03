import request from '@/config/request.js';

export const getUploadSign = (fileKey) => request.get('/file/sign', {fileKey})
