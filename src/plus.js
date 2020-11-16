/*原生函数调用*/
export default {
    setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    },
    call(handler, obj, callback) {
        this.setupWebViewJavascriptBridge(function (bridge) {
            if (!bridge) return console.error('[Error] Cant connect to native API')
            if (!handler || !obj || typeof obj !== 'object') return console.error('[Error] Params not right')
            bridge.callHandler(handler, obj, function (data) {
                if (callback && typeof callback === 'function') return callback(JSON.parse(data))
            })
        })
    },
    register(event, callback) {
        this.setupWebViewJavascriptBridge(function (bridge) {
            if (!bridge) return console.error('[Error] Cant connect to native API')
            if (!event) return console.error('[Error] event not found')
            bridge.registerHandler(event, function (data) {
                if (callback && typeof callback === 'function') return callback(data && JSON.parse(data))
            })
        })
    },
    // 返回上一页
    back() {
        console.log('call plus back')
        return new Promise(resolve => {
            this.call('back', {}, function (data) {
                resolve(data)
            })
        })
    },
    toast(text) {
        console.log('call plus toast')
        return new Promise(resolve => {
            this.call('toast', { text: text }, function (data) {
                resolve(data)
            })
        })
    },
    alert(title, message, btnConfirm = '确定') {
        console.log('call plus alert')
        return new Promise(resolve => {
            this.call('alert', { title: title, message: message, btnConfirm: btnConfirm }, function (data) {
                resolve(data)
            })
        })
    },
    // color为字体颜色，只能传入light白色，dark黑色
    setStatusBar(statusBar = { background: '#000000', color: 'light' }) {
        console.log('call plus setStatusBar')
        return new Promise(resolve => {
            this.call('setStatusBar', statusBar, function (data) {
                resolve(data)
            })
        })
    },
    loading(load = true) {
        console.log('call plus loading')
        return new Promise(resolve => {
            this.call('loading', { load: load }, function (data) {
                resolve(data)
            })
        })
    },
    go(url, loading = false) {
        console.log('call plus go')
        return new Promise(resolve => {
            this.call('go', { url: url, loading: loading }, function (data) {
                resolve(data)
            })
        })
    },
    scan(flag = true, time = 10000) {
        console.log('call plus scan devices')
        return new Promise(resolve => {
            if (flag) {
                this.call('startScan', { time: time }, function (data) {
                    resolve(data)
                })
            } else {
                this.call('stopScan', {}, function (data) {
                    resolve(data)
                })
            }
        })
    },
    signIn(username, password) {
        console.log('call plus signIn')
        return new Promise(resolve => {
            this.call('signIn', { username: username, password: password }, function (data) {
                resolve(data)
            })
        })
    },
    signOut() {
        console.log('call plus signOut')
        return new Promise(resolve => {
            this.call('signOut', {}, function (data) {
                resolve(data)
            })
        })
    },
    getClingUserInfo() {
        console.log('call plus get cling user info')
        return new Promise(resolve => {
            this.call('getClingUserInfo', {}, function (data) {
                resolve(data)
            })
        })
    },
    checkBle() {
        console.log('call plus check ble')
        return new Promise(resolve => {
            this.call('checkBle', {}, function (data) {
                resolve(data)
            })
        })
    },
    openBle() {
        console.log('call plus open ble')
        return new Promise(resolve => {
            this.call('turnOnBle', {}, function (data) {
                resolve(data)
            })
        })
    },
    // message为GATT广播携带的信息，字符串
    setGATT(message = null, flag = true) {
        console.log('call plus set GATT Ble Broadcast server')
        return new Promise(resolve => {
            this.call('setGATT', { message: message, flag: flag }, function (data) {
                resolve(data)
            })
        })
    },
    // 扫描蓝牙，分为lowPower mode和普通模式，普通模式不支持时间长度控制
    // 普通模式，无法获得uuid
    // lowPower模式可以获取GATT服务的广播，常用，且可以获得UUID
    scanBle(time = 10000, lowPower = false, callback = null, callback2 = null, callback3 = null) {
        console.log('call plus scan ble')
        this.call('scanBle', { time: time, lowPower: lowPower }, res => {
            if (res.status == 1) {
                console.log('register ble scan result')
                this.register('OnBleScanResult', res => {
                    res.status = 1
                    callback && callback(res)
                })
                this.register('OnBleFinishScan', res => {
                    res.status = 0
                    callback2 && callback2(res)
                })
                // 扫描失败
                this.register('OnBleScanFailed', res => {
                    callback3 && callback3(res)
                })
            } else callback3 && callback3(res)
        })
    },
    scanWifi() {
        console.log('call plus scan wifi')
        return new Promise(resolve => {
            this.call('scanWifi', {}, function (data) {
                resolve(data)
            })
        })
    },
    connectBle(device = null) {
        if (device) {
            return new Promise(resolve => {
                this.call('connectBle', device, function (data) {
                    resolve(data)
                })
            })
        }
    },
    /*
    getBleMac() {
        console.log('call plus get bluetooth mac address')
        return new Promise(resolve => {
            this.call('getBleMac', {}, function (data) {
                resolve(data)
            })
        })
    },
    */
    // type = 1实时天气，2预测天气
    getWeather(city = '上海', type = 1) {
        console.log('call plus get weather info')
        return new Promise(resolve => {
            this.call('weatherInfo', { type: type, city: city }, function (data) {
                resolve(data)
            })
        })
    },
    getLoc() {
        console.log('call plus get location')
        return new Promise(resolve => {
            this.call('location', {}, function (data) {
                resolve(data)
            })
        })
    },
    cropper(base64 = true, width = 200, height = 200, quality = 100) {
        console.log('call plus cropper')
        return new Promise(resolve => {
            this.call('cropper', { base64: base64, quality: quality, width: width, height: height }, function (data) {
                resolve(data)
            })
        })
    },
    openMapActivity(path = '') {
        console.log('call plus open map activity')
        return new Promise(resolve => {
            this.call('openMapActivity', { path: path }, function (data) {
                resolve(data)
            })
        })
    },
    zoomMap(size = 12) {
        console.log('call plus zoom map')
        return new Promise(resolve => {
            this.call('zoomMap', { size: size }, function (data) {
                resolve(data)
            })
        })
    },
    setMap(obj = { top: 0, left: 0, bottom: 0, right: 0, show: 'visible', width: 1080, height: 1080 }) {
        console.log('call plus set map')
        return new Promise(resolve => {
            this.call('setMap', obj, function (data) {
                resolve(data)
            })
        })
    },
    moveMapCenter() {
        console.log('call plus move to center of map')
        return new Promise(resolve => {
            this.call('moveCenter', {}, function (data) {
                resolve(data)
            })
        })
    },
    // 为地图添加标记
    markMap(obj = { longitude: 0.0, latitude: 0.0, icon: '', title: '', desc: '' }) {
        console.log('call plus add marker to map')
        console.log(obj)
        return new Promise(resolve => {
            this.call('markMap', obj, function (data) {
                resolve(data)
            })
        })
    },
    getMac() {
        console.log('call plus get mac address')
        return new Promise(resolve => {
            this.call('getMac', {}, function (data) {
                resolve(data)
            })
        })
    },
    getWinSize() {
        console.log('call plus get window size')
        return new Promise(resolve => {
            this.call('getWinSize', {}, function (data) {
                resolve(data)
            })
        })
    }
}
