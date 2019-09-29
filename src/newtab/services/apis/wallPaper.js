const BingPrefix = "http://bing.ioliu.cn/v1/" 
// /v1{d,w,h,p,size,callback} 返回今日的壁纸完整数据(可选参数{d,w,h,p,size,callback})：

// 若指定参数{w,h} ，则直接返回图片

// 参数名	类型	是否必要	备注
// d	Int	否	自今日起第d天前的数据
// w	Int	否	图片宽度
// h	Int	否	图片高度
// p	Int	否	Page 页码:第x页
// size	Int	否	Size 条数:每页条数
// callback	String	否	JSONP的回调函数名

export default {
    Bing: {
        default: {
            p: `${BingPrefix}?`,
        },
        random: {
            p: `${BingPrefix}rand`,
        },
    },
}