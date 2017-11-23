/**
 * FileName：api
 * Created By No.3 On 2017/7/28 0028 8:37
 * e-mail：woyzb@vip.qq.com
 */
import $http from "axios";
import {Notification} from "element-ui";
import axiosConfig from "./RequestConfig";
import {BASE_URL, FILE_SYSTEM_API, ACCESS_TOKEN, TENANT_ID, USER_ID, USER_TYPE_ID} from "../config/env";
import {isArray} from "../config/mUtils";
import NProgress from "nprogress"; // Progress 进度条

function netError(message) {
  NProgress.done(); // 开启Progress
  Notification({
    title: "网络错误",
    message: "请求服务数据时发生错误" + message ? "，错误信息:" + message : "",
    type: "error",
    duration: 30000
  });
}

$http.interceptors.request.use((config) => {
  NProgress.start(); // 开启Progress
  return config;
}, (error) => {
  netError(error);
  return Promise.reject(error);
});

$http.interceptors.response.use((response) => {
  NProgress.done(); // 开启Progress
  return response;
}, (error) => {
  netError(error);
  return Promise.reject(error);
});

// function handUrl(url) {
//   url = BASE_URL + url;
//   url += ('?access_token=' + ACCESS_TOKEN + '&tenantId=' + TENANT_ID);
//   return url;
// }

function handleData(url, method = "get", params = {}, data = {}) {
  // url = handUrl(url);
  params["access_token"] = ACCESS_TOKEN;
  params["tenantId"] = TENANT_ID;
  params["userTypeId"] = USER_TYPE_ID;
  params["userId"] = USER_ID;
  data["updateUserId"] = USER_ID;
  if (!Array.isArray(data)) {
    data["userId"] = USER_ID;
    data["tenantId"] = TENANT_ID;
    data["updateUserId"] = USER_ID;
  }
  const config = Object.assign({}, axiosConfig.config);
  config.url = url;
  config.method = method.toLowerCase();
  config.params = params;
  config.data = data;
  return config;
}

export default {
  /**
   * @param url
   * @param method
   * @param params query参数
   * @param data body 参数 只限于POST与PUT
   * @returns {Promise}
   */
  fullRequest(url = "", method, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
      params["access_token"] = ACCESS_TOKEN;
      params["tenantId"] = TENANT_ID;
      params["userTypeId"] = USER_TYPE_ID;
      params["userId"] = USER_ID;
      const config = {url: url, params: params, method: method};
      console.log("-=-=-", config);
      $http.request(config).then(res => {
        res.data ? resolve(res.data) : resolve(res);
      }).catch(error => {
        console.log("err0r:", error);
        // layer.msg("网络请求错误，请您检查网络后刷新重试<!--<br />如仍需帮助，请拨打屏幕下方的技术支持电话！-->");
        reject(error);
      });
    });
  },
  doRequest(url = "", method, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
      const config = handleData(url, method, params, data);
      $http.request(config).then(res => {
        let _res = res.data;
        if (isArray(_res)) {
          return resolve(_res);
        }
        if ((typeof _res) === "string") {
          _res = JSON.parse(_res);
        }
        if (!_res.code) {
          _res.data ? resolve(_res.data) : resolve(_res);
        } else {
          let title = "";
          const _method = method.toLowerCase();
          switch (_method) {
            case "get":
              title = "数据获取失败";
              break;
            case "post":
              title = "数据新增失败";
              break;
            case "put":
              title = "数据修改失败";
              break;
            case "delete":
              title = "数据删除失败";
              break;
          }
          Notification({
            title: title || "数据错误",
            dangerouslyUseHTMLString: true,
            message: `<pre>${("".concat(_res.message, "，", _res.detail))}</pre>`,
            type: "error",
            duration: 30000
          });
          throw new Error(("".concat(_res.message, "，", _res.detail)));
        }
      }).catch(error => {
        console.log("err0r:", error);
        // layer.msg("网络请求错误，请您检查网络后刷新重试<!--<br />如仍需帮助，请拨打屏幕下方的技术支持电话！-->");
        reject(error);
      });
    });
  },
  /*  uploadFile(url, formData, params = {}) {
   return new Promise((resolve, reject) => {
   params["access_token"] = ACCESS_TOKEN;
   params["userId"] = USER_ID;
   params["tenantId"] = TENANT_ID;
   console.log("formData:::", formData);
   let config = Object.assign({}, axiosConfig.config);
   config.url = url;
   config.method = "POST";
   config.params = params;
   config.data = formData;
   config.headers = {
   'Content-Type': 'multipart/form-data'
   };

   $http.request(config).then(res => {

   });
   });
   },*/
  exportFile(url, params) {
    params["access_token"] = ACCESS_TOKEN;
    params["userId"] = USER_ID;
    params["userTypeId"] = USER_TYPE_ID;
    params["tenantId"] = TENANT_ID;
    url = BASE_URL + url;
    let dataStr = ""; // 数据拼接字符串
    Object.keys(params).forEach(key => {
      if (params[key]) dataStr += key + "=" + params[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
    window.open(url, "_blank");
  },
  uploadToFileSystem(formData, params) {
    return new Promise((resolve, reject) => {
      const _url = FILE_SYSTEM_API + "/file?access_token=" + ACCESS_TOKEN;
      return new Promise((resolve, reject) => {
        $http.post(_url, formData).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      });
    });
  }
};
