auto.waitFor()

toast('执行脚本')

var tagPrice = 4000
var flag = 0
var wait = 2000

function openPriceList() {
    try {
        let priceList = []


        const list = id('tv_goods_status').untilFind()

        list.map((item, index) => {

            if (item.text() == '寄售') {
                if (item.parent().child(4).text().slice(1) <= tagPrice) {
                    priceList.push({
                        i: index,
                        v: item.parent().child(5).text().slice(1)
                    })
                }
            }
        })

        if (priceList.length) {
            console.log(list[priceList[0].i])

            list[priceList[0].i].parent().click()


            jumpDetail()
        }
        else {
            init()
        }
    } catch (e) {
        init()
    }
}

function init() {
    swipe(90, 882, 90, 1761, 300)
    sleep(500)
    openPriceList()
}

function jumpDetail() {
    id('tv_operate_btn_2').waitFor()

    console.log(id('tv_operate_btn_2').findOne().text())

    if (id('tv_operate_btn_2').findOne().text() != '立即购买') {

        id('iv_back_icon').findOne().click()

        sleep(1000)

        init()

        return
    }

    id('tv_operate_btn_2').findOne().click()

    sleep(200)

    console.log(id('rpv_art_banner').exists())

    if (id('rpv_art_banner').exists()) {
        id('iv_back_icon').findOne().click()

        sleep(1000)

        init()

        return
    }

    order()
}

function order() {

    console.log('order')

    console.log(className('androidx.recyclerview.widget.RecyclerView').depth('12').findOne().child(0))

    className('androidx.recyclerview.widget.RecyclerView').depth('12').findOne().child(0).click()

    sleep(200)

    id('btn_oprate').findOne().click()

    sleep(200)

    id('tv_pay').findOne().click()

    sleep(1000)

    console.log(id('btn_oprate').exists())

    if (id('btn_oprate').exists()) {

        id('ll_left').findOne().click()

        sleep(1000)

        id('iv_back_icon').findOne().click()

        sleep(400)

        init()
    }
}

openPriceList()
// order()

console.log('结束')
