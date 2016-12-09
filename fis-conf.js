//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 把需要合并的文件写在列表里，压缩有自动生成到：pkg/lib.js里

fis.config.set('pack', {
'pkg/lib.js': [
    "/lib/template.js",
    "/lib/meta.js",
    "/lib/jquery.lazyload.min.js",
    "/lib/fastclick.js"
]
});

// 开启simple对零散资源的自动合并
//fis.config.set('settings.postpackager.simple.autoCombine', true);

// 使用pngquant压缩图片，将所有png24的图片转为png8
fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');

//开启图片合并功能,Css精灵图
fis.config.set('roadmap.path', [{
   reg: '**.less',
   useSprite: true
}]);

//设置Css精灵图间距
fis.config.set('settings.spriter.csssprites.margin', 50);

//开启less编译，需要安装less，支持所有fis插件  npm install -g fis-parser-less
fis.config.set('modules.parser.less', 'less');
//less后缀的文件将输出为css后缀
//并且在parser之后的其他处理流程中被当做css文件处理
fis.config.set('roadmap.ext.less', 'css');


//开启less编译，需要安装less，支持所有fis插件  npm install -g fis-parser-jade
fis.config.set('modules.parser.jade', 'jade');
//less后缀的文件将输出为css后缀
//并且在parser之后的其他处理流程中被当做css文件处理
fis.config.set('roadmap.ext.jade', 'html');


// optimizing css压缩，js压缩
// 命令行  fis release -o
// eg:指定输出和替换路径    D:\wamp\www\p_wms\src\Public\Home\themes\classic
// 1.发布命令行，打MD5  fis release -opmDd ../classic
// 2.测试命令行，不带m  fis release -opDd ../classic
// 3.线上静态测试文件夹   fis release -opDd D:\wamp\www\local\test
fis.config.merge({
    roadmap : {
//      所有静态资源文件都使用 ** 作为域名
//      线上绝对路径
        domain : "/Public/Home/classic"        //域名+该目录 = 线上的资源路径（上线时需要改成实际项目路径）
       // domain : "."                      //该目录会编译到map.json里静态文件的根目录
    }
});


// 1.正则表达式：编译的时候不输出/css/function;/modules,/js/firebug,里的所有文件
// 2.字符串：编译的时候.ico文件不添加md5戳
fis.config.merge({
    roadmap : {
        path : [
            {
                reg: /^(\/css\/function|\/css\/unit|\/css\/lib|\/css\/bootstrap|\/modules|\/js\/firebug|\/js\/tpl)\/.*/,    //1
                release: false
            },
            {
                reg: /^(discount|error|panicBuying).html/,	//不输出历史版本样式
                release: false
            },
            {
                reg: /_.*.html|(\/css|\/js)\/_.*/,	//不输_开头的html文件,css,js
                release: false
            },
            {
                reg: /^(\/css\/(style|reset).css|\/css\/style.less)/,	//不输出历史版本样式
                release: false
            },
            {
                //所有的ico文件
                reg : '**.ico',    //2
                //发布的时候即使加了--md5参数也不要生成带md5戳的文件
                useHash : false
            },
            {
                reg : 'logo.png',
                //发布的时候即使加了--md5参数也不要生成带md5戳的文件
                useHash : false
            },
            {
                 reg : 'img/**.**',
                 //图片输出不添加MD5戳，后台没实现功能
                 useHash : false
            },
            {
                 reg : 'lib/**.**',
                 //图片输出不添加MD5戳，后台没实现功能
                 useHash : false
            },
            {
                reg: /log\/*/,	//不输log文件夹
                release: false
            },
            {
                reg : 'map.json',
                useOptimizer : false
            },
            {
                reg : 'js/baseUrl.js',
                release: false,
                useOptimizer : false
            }
        ]
    }
});

