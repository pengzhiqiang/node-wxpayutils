const crypto = require('crypto');

module.exports = {
    //MD5
    MD5: (string) => {
        return crypto.createHash('md5').update(string).digest('hex');
    },

    //生成签名(sign)
    createSign: (obj, key) => {
        let keyArr = [];
        for (let key in obj) {
            keyArr.push(key)
        }
        keyArr.sort();
        let stringA = '';
        for (let index in keyArr) {
            let len = keyArr.length;
            stringA += keyArr[index] + "=" + obj[keyArr[index]] + '&'
        }
        let stringB = stringA + "key=" + key;
        return module.exports.MD5(stringB).toUpperCase();
    },

    //生成随机串(nonce_str)
    createRandomStr: (len) => {
        let strBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 0; i < len; i++) {
            let index = Math.floor(Math.random() * 52);
            let strBaseArr = strBase.split("");
            if (strBaseArr[index]) {
                randomStr += strBaseArr[index]
            } else {
                randomStr += 0
            }
        }
        return randomStr;
    },

    //json转XML
    createXMLStr: (jsonObj) => {
        let items = [];
        let xml = '';
        for (let item in jsonObj) {
            let curVal = jsonObj[item];
            items.push("<" + item + ">" + curVal + "</" + item + ">");
        }
        xml = "<xml>" + items.join("") + "</xml>";
        return xml;
    }

}
