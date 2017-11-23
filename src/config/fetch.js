import {baseUrl, access_token, tenantId} from "./env";

function handMustData(url, data) {
  let dataStr = ""; // 数据拼接字符串
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] !== 0) dataStr += key + "=" + data[key] + "&";
  });
  if (dataStr !== "") {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
    url = url + "?" + dataStr;
  }
  return url;
}

const baseRequestConfig = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  mode: "cors",
  cache: "force-cache"
};

export default async(type = "GET", url = "", data = {}, method = "fetch") => {
  type = type.toUpperCase();
  url = baseUrl + url;

  data["access_token"] = access_token;
  data["tenantId"] = tenantId;

  if (type.toUpperCase() === "GET") {
    url = handMustData(url, data);
  }
  if (window.fetch && method === "fetch") {
    const requestConfig = baseRequestConfig;
    requestConfig.method = type;

    if (type.toUpperCase() === "POST") {
      Object.defineProperty(requestConfig, "query", {
        value: JSON.stringify(data)
      });
      Object.defineProperty(requestConfig, "body", {
        value: JSON.stringify(data)
      });
    }
    let response, responseJson;
    try {
      response = await fetch(url, requestConfig);
      responseJson = await response.json();
    } catch (error) {
      throw new Error(error);
    }
    return responseJson;
  } else {
    throw new Error("浏览器不支持fetch，请引入相关的polyfill库以支持！");
  }
};
