import config from '@/config'

function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')
    return `${t1} ${t2}`
}

export function get (url, data) {
    return request(url, 'GET', data)
}

export function post (url, data) {
    return request(url, 'POST', data)
}

export function request (url, method, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            data,
            method,
            url: config.host + url,
            success (res) {
                if (res.data.code === 0) {
                    resolve(res.data.data)
                } else {
                    showModel('失败', res.data.data.msg)
                    reject(res.data)
                }
            }
        })
    })
}

export function showSuccess (title) {
    wx.showToast({
        title,
        icon: 'success',
        duration: 2000
    })
}

export function showModel (title, content) {
    wx.showModal({
        title,
        content,
        showCancel: false
    })
}

export default {
    formatNumber,
    formatTime,
    get,
    post,
    showSuccess,
    showModel
}
