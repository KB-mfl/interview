/**
 * utils 工具集
 */

// 时间格式化
const dateFormat = (date, format) => {
  format = format || "yyyy-MM-dd hh:mm:ss";
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};

// 至今 days 天的毫秒数
export const getMs = (days) =>
  new Date().setTime(new Date().getTime() - days * 24 * 60 * 60 * 1000);

// url 参数
export const getQueryString = (name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  const q = window.location.pathname.substr(1).match(reg_rewrite);
  if (r != null) {
    return unescape(r[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
};

/**
 * @params {text} 复制的文案
 */
const copyText = (text = "", { pre } = {}) => {
  const elementType = pre ? "PRE" : "DIV";
  const element = document.createElement(elementType);
  element.textContent = text;
  document.body.appendChild(element);
  // 复制
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }

  document.execCommand("copy");
  element.remove();
};

// 深层 copy
const clone = (original, target) => {
  target = target || {}; // 如果target为undefined或没传参，设置空对象
  for (let [key, value] of Object.entries(original)) {
    if (original.hasOwnProperty(key)) {
      // 只拷贝对象内部，不考虑原型链
      if (typeof value === "object" && value) {
        // 引用值
        target[key] = value instanceof Array ? [] : {};
        clone(value, target[key]); // 递归克隆
      } else {
        // 基本值
        target[key] = value;
      }
    }
  }
  return target;
};

/**
 * cookies，使用方法类似 jQuery 的 $.cookie() 改为 cookie()
 */
const pluses = /\+/g;

const encode = (s) => {
  return encodeURIComponent(s);
};

const decode = (s) => {
  return decodeURIComponent(s);
};

const stringifyCookieValue = (value) => {
  return encode(cookies.json ? JSON.stringify(value) : String(value));
};

const parseCookieValue = (s) => {
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }

  try {
    // Replace server-side written pluses with spaces.
    // If we can't decode the cookie, ignore it, it's unusable.
    // If we can't parse the cookie, ignore it, it's unusable.
    s = decodeURIComponent(s.replace(pluses, " "));
    return cookies.json ? JSON.parse(s) : s;
  } catch (e) {
    throw new Error(e);
  }
};

const read = (s, converter) => {
  var value = parseCookieValue(s);
  return typeof converter === "function" ? converter(value) : value;
};

export const cookies = (key, value, options) => {
  // Write

  if (value !== undefined && !(typeof value === "function")) {
    options = Object.assign({}, options);

    if (typeof options.expires === "number") {
      var days = options.expires,
        t = (options.expires = new Date());
      t.setTime(+t + days * 864e5);
    }

    return (document.cookie = [
      encode(key),
      "=",
      stringifyCookieValue(value),
      options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
      options.path ? "; path=" + options.path : "",
      options.domain ? "; domain=" + options.domain : "",
      options.secure ? "; secure" : "",
    ].join(""));
  }

  // Read

  var result = key ? undefined : {};

  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all. Also prevents odd result when
  // calling $.cookie().
  var cookies = document.cookie ? document.cookie.split("; ") : [];

  for (var i = 0, l = cookies.length; i < l; i++) {
    var parts = cookies[i].split("=");
    var name = decode(parts.shift());
    var cookie = parts.join("=");

    if (key && key === name) {
      // If second argument (value) is a function it's a converter...
      result = read(cookie, value);
      break;
    }

    // Prevent storing a cookie that we couldn't decode.
    if (!key && (cookie = read(cookie)) !== undefined) {
      result[name] = cookie;
    }
  }

  return result;
};

//类型判断
const _ = (function () {
  "use strict";
  var _ = {};
  var types =
    "Array Object String Date RegExp Function Boolean Number Null Undefined".split(
      " "
    );

  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }

  for (var i = types.length; i--; ) {
    _["is" + types[i]] = (function (self) {
      return function (elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }

  return _;
})();

// 递归实现深拷贝
const deepCopy = (obj, deep = true) => {
  if (obj === null || (typeof obj !== "object" && !_.isFunction(obj))) {
    return obj;
  }

  if (_.isFunction(obj)) {
    return new Function("return " + obj.toString())();
  } else {
    var name,
      target = _.isArray(obj) ? [] : {},
      value;

    for (name in obj) {
      value = obj[name];
      if (value === obj) {
        continue;
      }

      if (deep && (_.isArray(value) || _.isObject(value))) {
        target[name] = deepCopy(value, deep);
      } else {
        target[name] = value;
      }
    }
    return target;
  }
};

const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const exportHandle = (url, axios, params) => {
  return axios
    .post(url, params, { postType: "form" })
    .then((res) => {
      if (res.code !== 0) return;
      let link = document.createElement("a");
      link.href = encodeURI(res.data);
      link.target = "_blank";
      link.click();
    })
    .catch(() => {});
};

// 千分位格式化
const toThousands = (num) => {
  var num = (num || 0).toString(),
    result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) result = num + result;
  return result;
};

// 接口请求异常处理 使用案例：this.utils.errMsg.bind(this, e)(msg)
const errMsg = function (err, msg) {
  if (typeof err === "string") this.$message.error(err);
  else this.$message.error(msg || "抱歉，请求失败");
};

// 坐标轴格式处理
// fixed: 保留小数位数
const numberFormat = (val, fixed) => {
  const length = Math.abs(val).toString().split(".")[0].length;
  if (length > 8) {
    return (val / 100000000).toFixed(fixed) + "亿";
  } else if (length > 4) {
    return (val / 10000).toFixed(fixed) + "万";
  } else {
    return !isNaN(Number(val)) ? parseFloat(Number(val).toFixed(12)) : val;
  }
};

// 获取元素的相对于窗口的高度
const getElmActualTop = (element) => {
  if (!element) return;
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  return actualTop;
};

// 展开整行
// row 行数据；arr 数组；param 唯一参数
const rowExpand = (row, arr, param) => {
  let array = [];
  Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  array = arr;

  if (array.indexOf(row[param]) < 0) {
    array.push(row[param]);
  } else {
    array.remove(row[param]);
  }
};
// 通用文枢下载
const commonDownload = (url, misId = "") => {
  if (window.secDBDownload) {
    window.secDBDownload.downloadFile(url, misId);
  } else {
    window.open(url, "_blank");
  }
};

export default {
  clone,
  dateFormat,
  copyText,
  cookies,
  getMs,
  deepCopy,
  guid,
  exportHandle,
  toThousands,
  errMsg,
  numberFormat,
  getQueryString,
  getElmActualTop,
  rowExpand,
  commonDownload,
};
