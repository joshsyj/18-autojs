auto.waitFor()

toast('执行脚本')

var tagPrice = 7000
var flag = 0
var wait = 2000
var loop=0

function openPriceList(first) {
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
            if(first){
                init()
            }
            // init()
            return false
        }
    } catch (e) {
        init()
    }
}

function init() {
    let lock = false
    swipe(90, 882, 90, 1761, 300)
    // sleep(500)
    sleep(1500)
    lock = openPriceList()
    if(!loop){
        init()
        return
    }

    if(lock) return
    console.log(lock)
    swipe(90, 2033, 90, 200, 500)
    lock = openPriceList()
    if(lock) return
    console.log(lock)
    swipe(90, 2033, 90, 200, 500)
    lock = openPriceList()
    if(lock) return
    console.log(lock)
    console.log('asd')
    swipe(90, 500, 90, 5000, 500)
    // swipe(90, 500, 90, 2533, 500)

    
    init()
    // openPriceList()
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

openPriceList(true)
// order()

console.log('结束')
