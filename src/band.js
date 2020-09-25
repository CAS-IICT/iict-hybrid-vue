import plus from './plus'
/* 手环专用接口
 * 2020-9-17
 * 黄有为
 * devilyouwei@foxmail.com
 * huangyw@iict.ac.cn
 */
export default {
    // 初始化手环解锁加锁事件
    init() {
        if (!this.INIT) {
            console.log('INIT BAND JS API')
            plus.register('BandLock', () => {
                this.lock()
            })
            plus.register('BandUnlock', () => {
                this.unlock()
            })
            this.INIT = 1
        }
    },
    /*
     * 扫描手环
     * time: 扫描持续时间
     * callback: 扫到结果回调
     * callback2: 扫描结束后回调
     */
    scanBand(time = 10000, callback, callback2) {
        console.log('call plus scan band')
        plus.call('scanBand', { time: time }, res => {
            if (!res.status) callback(res)
            else {
                plus.register('OnBandScanResult', res => {
                    callback(res)
                })
                plus.register('OnBandScanFinish', res => {
                    callback2(res)
                })
            }
        })
    },
    /* 传入蓝牙完整设备对象，直接传入通过scan获取的完整蓝牙信息
     * bleDevice: 蓝牙设备对象
     * callback: 连上设备
     * callback2: 断开设备
     */
    connectBand(bleDevice, callback, callback2) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus connect band')
        plus.call('connectBand', bleDevice, res => {
            if (!res.status) callback(res)
            else {
                plus.register('OnBandConnected', res => {
                    callback(res)
                })
                plus.register('OnBandDisconnected', res => {
                    callback2(res)
                })
            }
        })
    },
    // 断开手环连接
    disconnectBand(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus disconnect band')
        plus.call('disConnectBand', {}, () => {
            plus.register('OnBandDisconnected', res => {
                callback(res)
            })
        })
    },
    // 检查连接状态
    checkBand(callback) {
        console.log('call plus check band')
        plus.call('checkBand', {}, res => {
            callback(res)
        })
    },
    getBandVersion(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus get band version')
        plus.call('bandVersion', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandVersion', res => {
                    callback(res)
                })
        })
    },
    getBandBattery(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus get band battery')
        plus.call('bandBattery', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandBattery', res => {
                    callback(res)
                })
        })
    },
    getBodyTemperature(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus get body temperature')
        plus.call('bodyTemperature', {}, res => {
            if (!res.status) callback(res)
            else {
                // 监听体温回调
                plus.register('BandTestTemperature', res => {
                    callback(res)
                })
                plus.register('BandSampleTemperature', res => {
                    callback(res)
                })
            }
        })
    },
    // 同步计步
    syncStep(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus sync step')
        plus.call('syncStep', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandStepSync', res => {
                    callback(res)
                })
        })
    },
    // 同步时间
    syncTime(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus sync band time')
        plus.call('syncBandTime', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandTimeSync', res => {
                    callback(res)
                })
        })
    },
    // 同步睡眠
    syncSleep(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus sync sleep')
        plus.call('syncSleep', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandSleepSync', res => {
                    callback(res)
                })
        })
    },

    /* 获取测温状态
     * 不传默认null，用于获取这个状态值
     * 传入true或者false，用于设定这个状态值
     */
    temperatureStatus(flag = null) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus band temperature status')
        return new Promise(resolve => {
            plus.call('temperatureStatus', { flag: flag }, res => {
                if (!res.status) resolve(res)
                else console.log(res)
            })
        })
    },
    syncRate(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus sync rate')
        plus.call('syncRate', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandRateSync', res => {
                    callback(res)
                })
        })
    },
    syncBloodPressure(callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus sync blood pressure')
        plus.call('syncBloodPressure', {}, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandBloodPressureSync', res => {
                    callback(res)
                })
        })
    },
    // 测心率
    testRate(flag = true, callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus test rate')
        plus.call('testRate', { flag: flag }, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandRateChange', res => {
                    callback(res)
                })
        })
    },
    // 测血压
    testBloodPressure(flag = true, callback) {
        if (this.lock()) return console.log('LOCK')
        console.log('call plus test blood pressure')
        plus.call('testBloodPressure', { flag: flag }, res => {
            if (!res.status) callback(res)
            else
                plus.register('OnBandBloodPressureChange', res => {
                    callback(res)
                })
        })
    },
    // 互斥锁机制，手环的功能不可以并发执行
    INIT: 0,
    LOCK: 0,
    lock() {
        return this.LOCK++
    },
    unlock() {
        console.log('UNLOCK')
        this.LOCK = 0
    }
}
