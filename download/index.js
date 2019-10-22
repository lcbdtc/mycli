const fs = require('fs')

module.exports = function (name) {
    //node读取文件夹,不能整个读取，只能读取到文件夹里面的内容信息
    var demopath = './project'
    var targetpath = './' + name;
    //   fs.readdir(demopath, function (err, files) {
    //     fs.mkdir(targetpath, function () {
    //       files.forEach((item, index) => {
    //         var stat = fs.statSync(demopath + '/' + item)
    //         if (stat.isDirectory()) {
    //           fs.readdir(demopath + '/' + item, function () {

    //           })
    //         }
    //       })
    //     })
    //   })


    //数据驱动思维
    var arr = [];
    fs.mkdir(targetpath, function () {
        pusharr(demopath)
        console.log(arr)
        arr.forEach((item, index) => {
            console.log(item);
            (function (item) {
                if (item[0] == 'file') {
                    fs.readFile(item[1], (err, data) => {
                        fs.writeFile(targetpath + '/' + item[1].replace("./project", "."), data, function () { })
                    })
                } else {
                    fs.mkdir(targetpath + '/' + item[1].replace('./project', '.'), function () { })
                }
            })(item)
        })
    })

    fs.mkdir(targetpath, function () {
        pusharr(demopath)
        console.log(arr)
        arr.forEach((item, index) => {
            (function (item) {
                if (item[0] == 'file') {
                    fs.readFile(item[1], (err, data) => {
                        fs.writeFile(targetpath + '/' + item[1].replace('./project', '.'), data,function(){})
                    })
                }else{
                    fs.mkdir(targetpath+'/'+item[1].replace('.project','.'),function(){})
                }
            })(item)
        })
    })


    function pusharr(path) {
        var files = fs.readdirSync(path)
        files.forEach((item, index) => {
            var nowpath = path + '/' + item;
            var stat = fs.statSync(nowpath)
            if (stat.isDirectory()) {
                arr.push(['dir', nowpath])
                pusharr(nowpath)
            } else {
                arr.push(['file', nowpath])
            }
        })
    }
}