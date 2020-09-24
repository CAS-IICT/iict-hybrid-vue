import plus from './plus'
/* 手环专用接口
 * 2020-9-17
 * 黄有为
 * devilyouwei@foxmail.com
 * huangyw@iict.ac.cn
 */
export default {
    scanBand(time = 10000) {
        console.log('call plus scan band')
        return new Promise(resolve => {
            plus.call('scanBand', { time: time }, function (data) {
                resolve(data)
            })
        })
    },
    // 传入蓝牙完整设备对象，直接传入通过scan获取的完整蓝牙信息
    connectBand(bleDevice) {
        console.log('call plus connect band')
        return new Promise(resolve => {
            plus.call('connectBand', bleDevice, function (data) {
                resolve(data)
            })
        })
    },
    // 断开手环连接
    disconnectBand() {
        console.log('call plus disconnect band')
        return new Promise(resolve => {
            plus.call('disConnectBand', {}, function (data) {
                resolve(data)
            })
        })
    },
    checkBand() {
        console.log('call plus check band')
        return new Promise(resolve => {
            plus.call('checkBand', {}, function (data) {
                resolve(data)
            })
        })
    },
    getBandVersion() {
        console.log('call plus get band version')
        return new Promise(resolve => {
            plus.call('bandVersion', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandVersion', res => {
                        resolve(res)
                    })
            })
        })
    },
    getBandBattery() {
        console.log('call plus get band battery')
        return new Promise(resolve => {
            plus.call('bandBattery', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandBattery', res => {
                        resolve(res)
                    })
            })
        })
    },
    getBodyTemperature() {
        console.log('call plus get body temperature')
        return new Promise(resolve => {
            plus.call('bodyTemperature', {}, res => {
                resolve(res)
            })
        })
    },
    // 同步计步
    syncStep() {
        console.log('call plus sync step')
        return new Promise(resolve => {
            plus.call('syncStep', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandStepSync', res => {
                        resolve(res)
                    })
            })
        })
    },
    // 同步时间
    syncTime() {
        console.log('call plus sync band time')
        return new Promise(resolve => {
            plus.call('syncBandTime', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandTimeSync', res => {
                        resolve(res)
                    })
            })
        })
    },
    // 同步睡眠
    syncSleep() {
        console.log('call plus sync sleep')
        return new Promise(resolve => {
            plus.call('syncSleep', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandSleepSync', res => {
                        resolve(res)
                    })
            })
        })
    },

    /* 获取测温状态
     * 不传默认null，用于获取这个状态值
     * 传入true或者false，用于设定这个状态值
     */
    temperatureStatus(flag = null) {
        console.log('call plus band temperature status')
        return new Promise(resolve => {
            plus.call('temperatureStatus', { flag: flag }, res => {
                if (!res.status) resolve(res)
                else console.log(res)
            })
        })
    },
    syncRate() {
        console.log('call plus sync rate')
        return new Promise(resolve => {
            plus.call('syncRate', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandRateSync', res => {
                        resolve(res)
                    })
            })
        })
    },
    syncBloodPressure() {
        console.log('call plus sync blood pressure')
        return new Promise(resolve => {
            plus.call('syncBloodPressure', {}, res => {
                if (!res.status) resolve(res)
                else
                    plus.register('OnBandBloodPressureSync', res => {
                        resolve(res)
                    })
            })
        })
    },
    // 测心率
    testRate(flag = true) {
        console.log('call plus test rate')
        return new Promise(resolve => {
            plus.call('testRate', { flag: flag }, res => {
                resolve(res)
            })
        })
    },
    // 测血压
    testBloodPressure(flag = true) {
        console.log('call plus test blood pressure')
        return new Promise(resolve => {
            plus.call('testBloodPressure', { flag: flag }, res => {
                resolve(res)
            })
        })
    }
}
