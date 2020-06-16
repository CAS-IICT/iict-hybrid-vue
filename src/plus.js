/*原生函数调用*/
export default {
    setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function () {
                    return callback(window.WebViewJavascriptBridge)
                },
                false
            )
        }
        setTimeout(() => {
            if (!window.WebViewJavascriptBridge)
                console.error('Not native environment available, fail to init JSBridge')
        }, 3000)
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
            bridge.registerHandler(event, callback)
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
    setStatusBar(color) {
        console.log('call plus setStatusBar')
        return new Promise(resolve => {
            this.call('setStatusBar', { color: color }, function (data) {
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
    scanBle(time = 10000) {
        console.log('call plus scan ble')
        return new Promise(resolve => {
            this.call('scanBle', { time: time }, function (data) {
                resolve(data)
            })
        })
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
    getLoc() {
        console.log('call plus get location')
        return new Promise(resolve => {
            this.call('location', {}, function (data) {
                resolve(data)
            })
        })
    }
}
