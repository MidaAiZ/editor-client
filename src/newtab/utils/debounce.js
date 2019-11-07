const debounce = (fun, delay) => {
    return function (agmts) {
        //获取函数的作用域和变量
        let that = this;
        let args = agmts;                   
        clearTimeout(fun.id)// 清除定时器
        fun.id = setTimeout(function () {
            fun.call(that, args )
        }, delay)
    }
} 

export default debounce