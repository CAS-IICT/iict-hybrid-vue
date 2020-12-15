// 和后端进行交互的文件
import Mobile from 'mobile-detect'
import plus from './plus.js'
import axios from 'axios'
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
const VERSION = '1.0'

const TEST = process.env.NODE_ENV === 'development' ? true : false
let URL

//测试服
if (TEST) URL = 'http://node.virus.iict.cn'
//正式服
else URL = 'https://node.virus.iict.ac.cn'

export default {
    async upload(bytes, filename, type = 'image/jpeg', load = true) {
        let array = []
        for (let i = 0; i < bytes.length; i++) {
            array.push(bytes.charCodeAt(i))
        }
        let blob = new Blob([new Uint8Array(array)], { type: type })
        let form = new FormData()
        form.append('file', blob, filename)
        if (this.getItem('id')) form.append('id', this.getItem('id'))
        if (this.getItem('token')) form.append('token', this.getItem('token'))
        if (load) this.loading(true)
        try {
            let res = await axios({
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                url: URL + '/Upload/img',
                data: form,
                responseType: 'json',
                changeOrigin: true //允许跨域
            })
            res = res.data
            res.status = parseInt(res.status) || 0
            if (res.status == -1) {
                plus.toast(res.msg)
                this.logout()
            }
            return res
        } catch (e) {
            console.error(e)
            return {
                status: 0,
                msg: 'error net work'
            }
        } finally {
            if (load) this.loading(false) //用户发起请求时可以提示一个loading 可有可无
        }
    },
    async post(ctl, act, data = {}, load = false) {
        if (!ctl || !act) throw new Error('no controller or action')
        let url = `${URL}/${ctl}/${act}`
        let form = new FormData()
        for (let i in data) form.append(i, data[i])
        if (this.getItem('id')) form.append('id', this.getItem('id'))
        if (this.getItem('token')) form.append('token', this.getItem('token'))
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
                plus.toast(res.msg)
                this.logout()
            }
            return res
        } catch (e) {
            console.error(e)
            // plus.toast('网络请求错误')
            return {
                status: 0,
                msg: 'error net work'
            }
        } finally {
            if (load) this.loading(false) //用户发起请求时可以提示一个loading 可有可无
        }
    },
    logout() {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('uuid')
        localStorage.removeItem('bandInfo')
        localStorage.removeItem('myavatar')
        localStorage.removeItem('location')
        //提示用户登录失效
        setTimeout(() => {
            return location.replace(`/login`) //跳转到登录界面
        }, 1000)
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
    async getUserInfo() {
        let res = await this.post('User', 'getUserInfo')
        let data = null
        // return res
        if (res.status) {
            // 上传头像信息到localstorage
            this.setItem('myavatar', res.data.avatar)
            data = res.data
        } else plus.toast(res.msg)
        return data
    },
    // 获取后端动态的配置
    async getConfig() {
        let res = await this.post('Config', 'getMarkConfig') // 用户usi与安全等级对照配置
        // 将icons信息存储到localstorage
        this.setItem('icons', res.data)
        res = await this.post('Config', 'getBlockConfig') // ASI与安全等级对照配置
        this.setItem('blocks', res.data)
    },
    rssi2distance(rssi) {
        let A = 65
        let n = 2
        return Math.pow(10, (Math.abs(rssi) - A) / (10 * n)).toFixed(1)
    },
    uuid() {
        // 先获取本地固定uuid
        if (localStorage.getItem('uuid')) return localStorage.getItem('uuid')
        // 随机生成uuid
        let s = []
        const hexDigits = '0123456789abcdef'
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-'

        const uuid = s.join('')
        return uuid
    },
    getWinSize() {
        const h = screen.availHeight //获取屏幕高度
        const w = screen.availWidth
        return { h: h, w: w }
    },
    // 更新地址并且上传地址信息，返回地址信息
    async updateLocation() {
        let loc = await plus.getLoc()
        if (!loc.status) return null
        let wea = await plus.getWeather()
        if (!wea.status) return null
        let data = {
            longitude: loc.data.longitude,
            latitude: loc.data.latitude,
            altitude: loc.data.altitude,
            provider: loc.data.provider,
            time: loc.data.time,
            address: loc.data.address,
            province: loc.data.province,
            city: loc.data.city,
            area: loc.data.area,
            street: loc.data.street,
            speed: loc.data.speed,
            humidity: wea.data.humidity,
            airTemperature: wea.data.temp
        }
        this.post('GPS', 'updateLocation', data)
        return data
    },
    TEST: TEST, //获取当前是否为测试开发环境
    URL: URL, //获取全局接口URL
    VERSION: VERSION
}
