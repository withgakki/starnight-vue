<template>
  <u-upload :file-list="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1"></u-upload>
</template>

<script>
  import {
    getUploadSign
  } from '@/api/upload/index'

  export default {
    props: {
      url: {
        type: String,
        default: "",
      }
    },
    data() {
      return {
        fileList1: [],
      }
    },
    methods: {
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
        this.$emit("update:url", "")
      },
      // 新增图片
      async afterRead(event) {
        const file = event.file
        this[`fileList${event.name}`].push({
          ...file,
          status: 'uploading',
          message: '上传中'
        })
        const result = await this.uploadFilePromise(file)
        let item = this[`fileList${event.name}`][0]
        this[`fileList${event.name}`].splice(0, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        this.$emit("update:url", result)
      },
      // 文件上传
      uploadFilePromise(file) {
        return new Promise((resolve, reject) => {
          // blob url -> arrayBuffer
          uni.request({
            url: file.url,
            method: 'GET',
            responseType: 'arraybuffer',
            success: blob => {
              const buf = blob.data
              // 获取签名
              getUploadSign(file.name).then(res => {
                // 发送到 MinIO
                uni.request({
                  url: res.data.url,
                  method: 'PUT',
                  data: buf,
                  header: {
                    'content-type': 'application/octet-stream',
                  },
                  success: () => {
                    setTimeout(() => {
                      resolve(res.data.preview)
                    }, 1000)
                  }
                })
              })
            }
          })
        })
      },
    }
  }
</script>