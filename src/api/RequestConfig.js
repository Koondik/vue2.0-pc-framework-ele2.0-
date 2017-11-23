/**
 * FileName：RequestConfig
 * Created By No.3 On 2017/07/18 10:51
 * e-mail：woyzb@vip.qq.com
 */
// import Qs from 'qs';
import {BASE_URL, ACCESS_TOKEN, TENANT_ID} from "../config/env";

export default {
  config: {
    url: "/",
    method: "get",
    baseURL: BASE_URL,
    transformRequest: [function(data) {
      const serializeData = JSON.stringify(data); /* JSON.stringify(data);*/
      return serializeData;
    }],
    transformResponse: [function(data) {
      // let objData = JSON.parse(data);
      return data;
    }],
    headers: {"Content-Type": "application/json"},
    // body类数据，只能在post、put的时候调用
    data: {},
    // 地址栏的参数 query
    params: {access_token: ACCESS_TOKEN, tenantId: TENANT_ID},
    timeout: 1000 * 50, // 默认超时时间是30s
    responseType: "json"
  }
};
