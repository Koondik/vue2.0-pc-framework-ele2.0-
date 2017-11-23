## 顶岗实习管理-目录结构
```
├── build                      // 构建相关  
├── config                     // 配置相关
├── dist                       // 打包文件
├── node_modules               // 项目依赖
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 运行环境配置
│   ├── filters                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   │   ├── adviser            // 指导员相关页面
│   │   ├── error_page         // 错误页面
│   │   ├── student            // 学生相关界面
│   │   ├── teacher            // 班主任相关页面
│   │   ├── admin              // 管理员相关页面
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   └── xlsx                   // 导入所需Excel模板
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 命名规则
1. 组件类建议统一使用大驼峰格式，如：Sidebar
2. 页面文件建议统一使用下划线格式，如：xxx_page

## 部分文件命名缩写

1. itsp ***(internships  实习)***
2. tea ***(teacher 教师)***
3. stu ***(student 学生)***
4. jou ***(journal 周记/日记)***
