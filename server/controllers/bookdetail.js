const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first() // 获取的是数组，first 是取一个元素
    const info = JSON.parse(detail.user_info)

    await mysql('books')
        .where('id', id)
        .increment('count', 1)

    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            image: info.avatarUrl
        }
    })
}
