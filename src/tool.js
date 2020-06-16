// 和后端进行交互的文件
import Mobile from 'mobile-detect'
import plus from './plus.js'
import axios from 'axios'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'

const TEST = process.env.NODE_ENV === 'development' ? true : false
let URL
if (TEST) {
    URL = 'http://192.168.1.114:3000' //测试服
} else {
    URL = 'http://192.168.1.114:3000' //正式服
}

export default {
    async post(ctl, act, data = {}, load = false) {
        if (!ctl || !act) throw new Error('no controller or action')
        let url = `${URL}/${ctl}/${act}`
        let form = new FormData()
        for (let i in data) form.append(i, data[i])

        // form.append('user', JSON.stringify(this.getUserInfo()))
        if (load) this.loading(true)
        try {
            let res = await axios({
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                url: url,
                data: form,
                responseType: 'json',
                changeOrigin: true //允许跨域
            })
            res = res.data
            res.status = parseInt(res.status) || 0
            if (res.status == -1) {
                //提示用户登录失效
                setTimeout(() => {
                    localStorage.removeItem('user')
                    return location.replace(`/?did=${localStorage.getItem('did')}`) //跳转到登录界面
                }, 2000)
            }
            return res
        } catch (e) {
            //alert 或者toast提示
        } finally {
            if (load) this.loading(false) //用户发起请求时可以提示一个loading 可有可无
        }
    },

    // 获取手机系统
    getOS: function () {
        let device = new Mobile(navigator.userAgent)
        return device.os()
    },
    getUserAgent: function () {
        return new Mobile(navigator.userAgent)
    },
    stamp2date: function (ns) {
        return new Date(parseInt(ns) * 1000)
    },
    date2stamp: function (date) {
        return Date.parse(date) / 1000
    },
    // 传入date对象Date类型，格式String类型
    formatDate: function (date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o)
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        return fmt
    },
    // 打开或关闭ios滚动
    scroll: function (flag = true) {
        if (flag == true) document.removeEventListener('touchmove', this.scroll)
        else
            document.addEventListener('touchmove', this.scroll, {
                passive: false
            })
    },
    getParams: function (url) {
        url = location.href
        let theRequest = {}
        let i = url.indexOf('?')
        if (i !== -1) url = url.substr(++i)
        else return null

        if (url.indexOf('&') !== -1) {
            let strs = url.split('&')
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
            }
        } else {
            theRequest[url.split('=')[0]] = unescape(url.split('=')[1])
        }
        return theRequest
    },
    getEnv: function () {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
            return 'wechat'
        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
            return 'alipay'
        } else {
            return 'unknown'
        }
    },
    loadObj: null,
    //等待加载loading模块
    loading(load) {
        if (load) {
            if (this.loadObj) return
            this.loadObj = Loading()
        } else this.loadObj.close()
    },
    // 设置localstorage模块
    setItem(key, data) {
        try {
            if (typeof data == 'string') localStorage.setItem(key, data)
            else if (typeof data == 'object') localStorage.setItem(key, JSON.stringify(data))
            else localStorage.setItem(key, new String(data))
        } catch (e) {
            console.error(e)
            return false
        }
    },
    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (e) {
            return localStorage.getItem(key)
        }
    },
    removeItem(key) {
        localStorage.removeItem(key)
    },
    TEST: TEST, //获取当前是否为测试开发环境
    URL: URL //获取全局接口URL
}
