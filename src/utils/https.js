import axios from 'axios'
// import qs from 'qs'
import {Toast} from "vant";

axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json';        //配置请求头
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

const consoleFlag = false
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事。
    if (config.method === 'post') {
        consoleFlag && console.log(config.data)
        // config.data = qs.stringify(config.data);
    }
    consoleFlag && console.log(config)
    return config;
}, (error) => {
    consoleFlag && console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    // if (res.data.msg === "请登录" || res.data.code == 5) {
    //     this.$router.push({name: 'Login', path: '/Login'})
    // }
    if (!res.data.success) {
        return Promise.resolve(res.data);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    Toast({
        message: '网络异常',
        icon: 'cross',
        type: 'fail'
    })
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    fetchPost,
    fetchGet,
}