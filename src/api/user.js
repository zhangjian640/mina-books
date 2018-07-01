import { http } from '@/api'

/**
 * 获取当前用户 profile
 * @return {Promise}
 */
export const getUserProfile = () => {
    return http.get('user/login')
}
/**
 * 获取用户关注信息
 * @param {string} scenario
 * @return {Promise}
 */
export const getFollow = (scenario) => {
    return http.get(`user/profile/follow/${scenario}`)
}
