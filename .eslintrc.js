module.exports = {
  root: true,
  parser: 'babel-eslint',//解析器，我们使用babel-eslint
  parserOptions: {
    sourceType: 'module'//类型为module，因为代码使用了使用了ECMAScript模块
  },
  env: {
    browser: true,//预定义的全局变量，这里是浏览器环境
    node: true,//预定义的全局变量，这里是Node环境
    es6: true,//预定义的全局变量，这里是es6环境
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  // "off"或者0，不启用这个规则
  // "warn"或者1，出现问题会有警告
  // "error"或者2，出现问题会报错
  'rules': {
    'accessor-pairs': 2,
    'arrow-spacing': [2, {'before': true, 'after': true}],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {'allowSingleLine': true}],
    'camelcase': [0, {'properties': 'always'}],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {'before': false, 'after': true}],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': [2, 'allow-null'],
    'generator-star-spacing': [2, {'before': true, 'after': true}],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {'SwitchCase': 1}],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],
    'keyword-spacing': [2, {'before': true, 'after': true}],
    'new-cap': [2, {'newIsCap': true, 'capIsNew': false}],
    'new-parens': 2,
    'no-array-constructor': 2,  //不允许使用数组构造器
    'no-caller': 2,//不允许使用arguments.callee和arguments.caller属性
    'no-console': 'off', //不允许出现console语句
    'no-class-assign': 2,
    'no-cond-assign': 2, //条件语句的条件中不允许出现赋值运算符
    'no-const-assign': 2,
    'no-control-regex': 2,//正则表达式中不允许出现控制字符
    'no-delete-var': 2,//不允许try catch语句接受的err变量与外部变量重名"no-delete-var": 2, //不允许使用delete操作符
    'no-dupe-args': 2,//函数定义的时候不允许出现重复的参数
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,//对象中不允许出现重复的键
    'no-duplicate-case': 2,//switch语句中不允许出现重复的case标签
    'no-empty-character-class': 2, //正则表达式中不允许出现空的字符组
    'no-empty-pattern': 2,
    'no-eval': 2, //不允许使用eval()
    'no-ex-assign': 2, //在try catch语句中不允许重新分配异常变量
    'no-extend-native': 2, //不允许扩展原生对象
    'no-extra-bind': 2,//不允许不必要的函数绑定
    'no-extra-boolean-cast': 2,//不允许出现不必要的布尔值转换
    'no-extra-parens': [2, 'functions'], //不允许出现不必要的圆括号
    'no-fallthrough': 2, //不允许switch按顺序全部执行所有case
    'no-floating-decimal': 2,//不允许浮点数缺失数字
    'no-func-assign': 2,//不允许重新分配函数声明
    'no-implied-eval': 2, //不允许使用隐式eval()
    'no-inner-declarations': [2, 'functions'], //不允许在嵌套代码块里声明函数
    'no-invalid-regexp': 2,//不允许在RegExp构造函数里出现无效的正则表达式
    'no-irregular-whitespace': 2,//不允许出现不规则的空格
    'no-iterator': 2,//不允许使用__iterator__属性
    'no-label-var': 2, //不允许标签和变量同名
    'no-labels': [2, {'allowLoop': false, 'allowSwitch': false}], //不允许标签语句
    'no-lone-blocks': 2, //不允许不必要的嵌套代码块
    'no-mixed-spaces-and-tabs': 2,  //不允许混用tab和空格
    'no-multi-spaces': 2,//不允许出现多余的空格
    'no-multi-str': 2,//不允许用\来让字符串换行
    'no-multiple-empty-lines': [2, {'max': 1}], //空行最多不能超过1行
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,//不允许在in表达式语句中对最左边的运算数使用取反操作
    'no-new-object': 2,//禁止使用new Object()
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,//不允许使用new String，Number和Boolean对象
    'no-obj-calls': 2,//不允许把全局对象属性当做函数来调用
    'no-octal': 2, //不允许使用八进制字面值
    'no-octal-escape': 2,//不允许使用八进制转义序列
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,//不允许变量重复声明
    'no-regex-spaces': 2, //正则表达式中不允许出现多个连续空格
    'no-return-assign': [2, 'except-parens'], //不允许在return语句中使用分配语句
    'no-self-assign': 2,
    'no-self-compare': 2, //不允许自己和自己比较
    'no-sequences': 2,//不允许使用逗号表达式
    'no-shadow-restricted-names': 2, //js关键字和保留字不能作为函数名或者变量名
    'no-spaced-func': 0,
    'no-sparse-arrays': 2, //数组中不允许出现空位置
    'no-this-before-super': 2,
    'no-throw-literal': 2, //不允许抛出字面量错误 throw "error"
    'no-trailing-spaces': 2, //一行最后不允许有空格
    'no-undef': 2, //不允许未声明的变量
    'no-undef-init': 2, //不允许初始化变量时给变量赋值undefined
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {'defaultAssignment': false}],
    'no-unreachable': 2,//在return，throw，continue，break语句后不允许出现不可能到达的语句
    'no-unsafe-finally': 2,
    'no-unused-vars': [1, {'vars': 'all', 'args': 'none'}], //不允许有声明后未使用的变量或者参数
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,//不允许使用with语句
    'one-var': [2, {'initialized': 'never'}], //强制变量声明放在一起
    'operator-linebreak': [2, 'after', {'overrides': {'?': 'before', ':': 'before'}}],
    'padded-blocks': [2, 'never'],//块内行首行尾是否空行
    'quotes': [2, 'double', {'avoidEscape': true, 'allowTemplateLiterals': true}],//引号风格
    'semi': [2, 'always'], //强制语句分号结尾
    'semi-spacing': [2, {'before': false, 'after': true}],//分后前后空格
    'space-before-blocks': [2, 'always'],//块前的空格
    'space-before-function-paren': [0, 'always'],//函数定义时括号前的空格
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2, //操作符周围的空格
    'space-unary-ops': [2, {'words': true, 'nonwords': false}],//一元运算符前后不要加空格
    'spaced-commentspaced-comment': [0, 'always', {'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']}],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,//要求检查NaN的时候使用isNaN()
    'valid-typeof': 2,//在使用typeof表达式比较的时候强制使用有效的字符串
    'wrap-iife': [2, 'any'],//立即执行表达式的括号风格
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'], //不允许在if条件中使用yoda条件
    'prefer-const': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,//不允许出现debugger语句
    'object-curly-spacing': [0, 'always', {objectsInObjects: true}],
    'array-bracket-spacing': [2, 'never']
  }
};
