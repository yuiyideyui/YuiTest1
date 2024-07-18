import * as qiniu from 'qiniu-js'
// import request from '../utils/request'
// 七牛云
// function getQiniuConfig() {
//     return request({
//         url: `/sys/sysCtr/qiniuConfig`,
//         method: 'post',
//     })
// }
export function start (value)  {
    return new Promise(async (resolve,reject) => {
      console.log('value', value)
      if (!value) {
        resolve('')
      }
    //   const QiniuConfigres = await getQiniuConfig()
    //   if(!QiniuConfigres.data.uploadToken){
    //     console.error('七牛token获取错误')
    //     reject('token获取错误')
    //   }
      const qiniuUploadInfo = {
        file: value, //文件对象
        key: `touch_screen/image/` + value.name, //文件资源名称
        token: 'DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:6JLdZszK6njZCE5oFyKAGWLz5zo=:eyJzY29wZSI6InRvdWNoc2NyZWVuIiwiZGVhZGxpbmUiOjE2OTgxMTk3OTF9' //从后端获取的uplodaToken
      }
      const putExtra = {
        fname: value.name, // 文件原文件名
        params: {}, // 用来放置自定义变量
        // mimeType: '' // 用来限制上传文件类型，为 null 时表示不对文件类型限制；eg: ["image/png", 	  "image/jpeg"]
      }
      const config = {
        useCdnDomain: true, //cdn加速
        region: qiniu.region.z2 //区域
      }
      const observable = qiniu.upload(qiniuUploadInfo.file, qiniuUploadInfo.key, qiniuUploadInfo.token, putExtra, config)
      //上传开始
      observable.subscribe({
        next(res) {
          // console.log('next', res)
        },
        error(err) {
          console.log('err', err)
        },
        complete(res) {
          //来到这里就是上传成功了。。
          console.log('complete', res)
          // myimgs.push(qiniu.imageMogr2({}, value.name, 'rybxdz99i.hn-bkt.clouddn.com'))
          // console.log('myimgs', myimgs)
          resolve(`https://qiniu-nav-mnp.v-support.cn/touch_screen/image/${value.name}`)
        }
      })
    })
  }
