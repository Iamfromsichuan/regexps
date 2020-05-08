let hd = "sadasd 2010 -"
// console.log(hd.match(/\w+/));

let email = "$&^^^asdasd2323231321@qq.com";
// \w是匹配非特殊字符，即a-z、A-Z、0-9、_、汉字
// \W 匹配特殊字符，即非字母、非数字、非汉字、非_
// console.log(email.match(/\w+@\w+\.\w+/));
// console.log(email.match(/\W/g));

// let un = prompt("请输入用户名1");
// console.log(/^[a-z]\w{5, 8}/.test(un));

// 【.】 代表除换行外的任意字符
// hd = "http://www.baidu.com";
// console.log(/https?:\/\/\w+\.\w+\.\w+/.test(hd));


// s 相当于是单行匹配模式 
// 意思忽略换行符
// hd = `
//     te
//     ls

// `
// console.log(hd.match(/.+/s));

// \s 是空格
// \S 匹配非空白
// hd = '010 - 99999999';
// console.log(hd.match(/\d+\s-\s\d{4,10}/));

// . 不能匹配换行符 \d 只匹配数字 \w 不匹配特殊符号
// * 匹配全部

// 模式修正符 g全局 i忽略 m多行匹配也就是一行一行的处理
// s 是忽略换行符，把多行看作一行处理
// hd = "dsadaUa"
// console.log(hd.match(/u/gi));

// * 任意次 0 或 n
// + 最少一次
// hd = `
//     #1 js, 200元 #
//     #2 java, 300元 #
//     #3 php, 100元 # 鸡儿
//     #4 node, 50元 #
// `
// const res = {};
// hd.match(/^\s*#\d+\s.+#$/gm).map(x => {
//     let s = x.replace(/^\s*#\d+\s*/, "")
//         .replace(/#$/, "");
//     s = s.split(', ');
//     res[s[0]] = s[1];
// })
// console.log(res);

// Unicode属性匹配
// L：字母； 
// M：标记符号（一般不会单独出现）； 
// Z：分隔符（比如空格、换行等）； 
// S：符号（比如数学符号、货币符号等）； 
// N：数字（比如阿拉伯数字、罗马数字等）； 
// C：其他字符 
// P: 标点字符
hd = "ahdsdkasjd1120.。。com"
console.log(hd.match(/\p{P}/gu));

// eslint-disable-next-line no-console
console.log(12332);