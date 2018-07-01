// join 连表查询 第二个参数以什么连接

const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openid} = ctx.request.query
    const size = 10
    const mysqlSelect = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .orderBy('books.id', 'desc')
    let books
    if (openid) {
        books = await mysqlSelect.where('books.openid', openid)
    } else {
        // 获取全部图书，并分页
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
