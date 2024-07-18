// const sdk = require('qiniu');
// // import sdk from 'qiniu-js'
// const testfn = function(){
//     // console.log('qiniu.auth',sdk.rs)
//     let mac = new sdk.auth.digest.Mac('DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q', 'IkXEA4TEV9QppacZ9x6UKgXOwgLMRNdi90QO3MbX');
    
//     let putPolicy = new sdk.rs.PutPolicy(this.options);
//     let uploadToken = putPolicy.uploadToken(mac);
//     return uploadToken;
// }
// console.log('testfn',testfn())


// 前端模拟后台Node.js SDK

const qiniu = require('qiniu')
// import qiniu from 'qiniu'
// 创建上传凭证
// function gettoken (){
    
//     const accessKey = 'DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q'

//     const secretKey = 'IkXEA4TEV9QppacZ9x6UKgXOwgLMRNdi90QO3MbX'

//     const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

//     const options = {

//     scope: 'yuitest/test/',

//     expires: 7200

//     }

//     const putPolicy = new qiniu.rs.PutPolicy(options)
//     console.log('putPolicy.uploadToken(mac)',putPolicy.uploadToken(mac))
//     let key = putPolicy.uploadToken(mac)
// }
// gettoken()

function geturl(){
    const accessKey = 'DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q'
    const secretKey = 'IkXEA4TEV9QppacZ9x6UKgXOwgLMRNdi90QO3MbX'
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    // config.useHttpsDomain = true;
    //需要设置区域
    config.zone = qiniu.zone.Zone_z2;
    var operManager = new qiniu.fop.OperationManager(mac, config);
    //处理指令集合
    // 5376 x 2688
    const width = 5376/64
    const height = 2688/32
    let fopsarr = []
    for(let i = 0; i<64; i++){
        for(let j = 0; j<32; j++){
            let crop = `imageMogr2/crop/!${width}x${height}a${i*width}a${j*height}|saveas/${qiniu.util.urlsafeBase64Encode('yuiyide' + `:省中医crop4/省中医row${j}-clo${i}.png`)}`
            fopsarr.push(crop)
        }
    }
    
    const fops = fopsarr
    // const fops = [`imageMogr2/crop/!300x300a0a0|saveas/${saveJpgEntry}`];
    var pipeline = '';
    var srcBucket = 'yuiyide';
    var srcKey = '省中医.png';

    var options = {
    // 'notifyURL': 'http://api.example.com/pfop/callback',
    // 'force': false,
    };

    //持久化数据处理返回的是任务的persistentId，可以根据这个id查询处理状态
    operManager.pfop(srcBucket, srcKey, fops, pipeline, options, function(err, respBody, respInfo) {
    if (err) {
        throw err;
    }

    if (respInfo.statusCode == 200) {
        console.log(respBody.persistentId);
    } else {
        console.log(respInfo)
        console.log(respInfo.statusCode);
        console.log(respBody);
    }
    });


}

geturl()


// export default myfn
// export const uploadToken = putPolicy.uploadToken(mac)
