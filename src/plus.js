/*原生函数调用*/
export default {
    setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            console.log('WebViewJavascriptBridge is Ready!')
            return callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function() {
                    console.log('WebViewJavascriptBridge is Ready!')
                    return callback(window.WebViewJavascriptBridge)
                },
                false
            )
        }
    },
    call(handler, obj, callback) {
        this.setupWebViewJavascriptBridge(function(bridge) {
            console.log(bridge)
            if (!bridge) return console.error('[Error] Cant connect to native API')
            if (!handler || !obj || typeof obj !== 'object')
                return console.error('[Error] Params not right')
            bridge.callHandler(handler, obj, function(data) {
                if (callback && typeof callback === 'function') return callback(data)
            })
        })
    },
    register(event, callback) {
        this.setupWebViewJavascriptBridge(function(bridge) {
            if (!bridge) return console.error('[Error] Cant connect to native API')
            if (!event) return console.error('[Error] event not found')
            bridge.registerHandler(event, callback)
        })
    },
    // 返回上一页
    back() {
        console.log('call plus back')
        this.call('back', {}, function() {
            console.log('back success')
        })
    },
    toast(text) {
        console.log('call plus toast')
        this.call('toast', { text: text }, function() {
            console.log('toast success')
        })
    },
    alert(title, message, btnConfirm = '确定') {
        console.log('call plus alert')
        this.call('alert', { title: title, message: message, btnConfirm: btnConfirm }, function() {
            console.log('alert success')
        })
    },
    loading(load=true){
        console.log('call plus loading')
        this.call('loading', { load: load }, function() {
            console.log('loading success')
        })
    }
}
