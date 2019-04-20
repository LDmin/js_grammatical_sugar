// 使用：import 'js_grammatical_sug'
// 扩展数组和字符串，提供切片仿Python写法，返回新数组或字符串
// 参考https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/0013868196352269f28f1f00aee485ea27e3c4e47f12bc7000

function slice(args) { // 使用function而不是用箭头函数，this才能获取实例

    // 判断类型
    let type;
    if (typeof this === 'string') {
      type = 'string';
    } else if (typeof this === 'object') {
      type = 'array';
    }
  
    let returnValue;
  
    // 校验模板标签，错误则返回原数组或字符串
    if (args.raw.length !== 1) {
      console.error(`s函数中标签模板只允许纯字符串!!! 比如 ['0','1', '2'].s\`1:2\``);
      return this;
    }
  
    const str = args.raw[0];
    // 若传入空字符串或:，则返回新数组或字符串
    if (str === '' || str === ':') {
      if (type === 'string') {
        return this;
      } else if (type === 'array') {
        return [...this];
      }
    }
  
    const strArr = str.split(':');
    if (strArr.length < 2) {
      console.error('无法识别该模板字符串！！！');
      return this;
    }
    const num1 = Number(strArr[0] || 0);
    const num2 = strArr[1] ? Number(strArr[1]) : this.length;
    const num3 = strArr[2] && Number(strArr[2]);
  
    if (num3) {
      if (type === 'string') {
        let newStr = '';
        for (let i = 0; i < this.length; i++) {
          if (i >= num1 && i < num2 && i % num3 === 0) {
            if (type === 'string') {
              newStr += this.charAt(i);
            } else {
              newArr.push(this[i]);
            }
          }
        }
        returnValue = newStr;
      } else if (type === 'array') {
        const newArr = [];
        for (let i = 0; i < this.length; i++) {
          if (i >= num1 && i < num2 && i % num3 === 0) {
            newArr.push(this[i]);
          }
        }
        returnValue = newArr;
      }
    } else {
      returnValue = this.slice(num1, num2);
    }
  
    return returnValue;
  }
  
  Array.prototype.s = slice;
  String.prototype.s = slice;