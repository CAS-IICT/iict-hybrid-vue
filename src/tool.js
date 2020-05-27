import Mobile from 'mobile-detect'
import plus from './plus.js'

const TEST = process.env.NODE_ENV === 'development' ? true : false
let API_URL
if (TEST) {
    API_URL = 'https://api.kouhong.le-miao.com/index.php/api' //测试服
} else {
    API_URL = 'https://api.lipstick.lemiao.xyz/index.php/api' //正式服
}

export default {
    // 给出登陆信息
    getUserInfo: function() {
        return new Promise(resolve => {
            plus.call('getUserInfo', {}, function(res) {
                resolve(res)
            })
        })
    },
    // 获取手机系统
    getOS: function() {
        let device = new Mobile(navigator.userAgent)
        return device.os()
    },
    getUserAgent: function() {
        return new Mobile(navigator.userAgent)
    },
    stamp2date: function(ns) {
        return new Date(parseInt(ns) * 1000)
    },
    date2stamp: function(date) {
        return Date.parse(date) / 1000
    },
    // 传入date对象Date类型，格式String类型
    formatDate: function(date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o)
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                )
        return fmt
    },
    // 打开或关闭ios滚动
    scroll: function(flag = true) {
        if (flag == true) document.removeEventListener('touchmove', this.scroll)
        else document.addEventListener('touchmove', this.scroll, { passive: false })
    },
    getParams: function(url) {
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
    getEnv: function() {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
            return 'wechat'
        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
            return 'alipay'
        } else {
            return 'unknown'
        }
    },
    // 公共支付接口
    pay: async function(id = 0, type = 1) {
        return new Promise(resolve => {
            plus.call('callPay', { id: id, type: type }, function(res) {
                resolve(res.status)
            })
        })
    },
    showBack: function(key = false) {
        plus.call('showBack', { show: key }, function() {})
    },
    go: function(url) {
        plus.call('pushNewPage', { address: url }, function() {})
    },
    TEST: TEST,
    API_URL: API_URL
}
