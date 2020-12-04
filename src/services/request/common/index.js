/**
 * 公共接口文档
 */
import api from "@/services/axiosApi";

// 获取登录账号信息
export const getLoginInfo = (data) => {
  return api(
    {
      url: "",
      method: "get",
    },
    data || {},
  );
};