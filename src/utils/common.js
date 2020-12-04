// 时间格式初始化
export const dateFormat = (fmt, date) => {
  if (!date) {
    return "";
  } else {
    if (typeof date === "string") {
      date = date.replace(/-/, "/");
    }
    date = new Date(date);
  }
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
};

/**
 * 根据身份证号码获取出生日期
 */
export const getBirthByIdCard = idCard => {
  var birthday = "";
  if (idCard) {
    if (idCard.length == 15) {
      birthday = "19" + idCard.slice(6, 12);
    } else if (idCard.length == 18) {
      birthday = idCard.slice(6, 14);
    }
    // 通过正则表达式来指定输出格式为:1990-01-01
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  }
  return birthday;
};

/**
 * 根据身份证号码获取性别
 * 1: 男性
 * 2：女性
 */
export const getSexByIdCard = idCard => {
  var sexStr = "";
  if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
    sexStr = "1";
  } else {
    sexStr = "2";
  }
  return sexStr;
};

/**
 * 根据身份证号码获取年龄
 */
export const getAgeByIdCard = identityCard => {
  var len = (identityCard + "").length;
  if (len == 0) {
    return 0;
  } else {
    if (len != 15 && len != 18) {
      //身份证号码只能为15位或18位其它不合法
      return 0;
    }
  }
  var strBirthday = "";
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};