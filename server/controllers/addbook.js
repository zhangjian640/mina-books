const https = require('https')
const { mysql } = require('../qcloud')

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', () => {
                const bookInfo = JSON.parse(urlData)
                if (bookInfo.title) {
                    resolve(bookInfo)
                }
                reject(bookInfo)
            })
        })
    })
}

// 新增图书
// 1.获取豆瓣信息
// 2. 入库
// 9787121139512
// https://api.douban.com/v2/book/isbn/:name
module.exports = async (ctx) => {
    const { isbn, openid } = ctx.request.body
    console.log(isbn, openid)
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookInfo = await getJSON(url)
        const { title, image, alt, publisher, summary, price } = bookInfo
        const rate = bookInfo.rating.average
        const tags = bookInfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookInfo.author.join(',')
        console.log({ isbn, openid, title, image, alt, publisher, summary, price, rate, tags, author })
        try {
            await mysql('books').insert({
                isbn,
                openid,
                title,
                image,
                alt,
                publisher,
                summary,
                price,
                rate,
                tags,
                author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }
        }
    }
}
