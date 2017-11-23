/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */
import { setStore, getStore } from "./mUtils";
import { userInfo } from "../mock/user_info";
let fileSystemHost = null;
let cloudHost = null;
let studentHost = null;
let projectHost = null;
let cloud = null;
let cloudLoginRoot = null;
let access_token = null;
let userId = null;
let userTypeId = null;
let userType = null;
let userName = null;
let tenantId = 1;
let routerMode = null;

if (process.env.NODE_ENV === "development") {
  routerMode = "hash";
  fileSystemHost = "//192.168.0.189:8090";
  cloudHost = "//192.168.0.189:8090";
  studentHost = "//192.168.0.189:8090";
  projectHost = "//192.168.0.113:8010";
  cloudLoginRoot = "//192.168.0.189:85";
  setCloudUser();
} else {
  routerMode = "hash";
  fileSystemHost = "//d.szlcsoft.com:8902";
  cloudHost = "//d.szlcsoft.com:8902";
  studentHost = "//d.szlcsoft.com:8902";
  cloudLoginRoot = "//d.szlcsoft.com:92";
  projectHost = "//d.szlcsoft.com:92";
  getCloudUser();
}

const projectHomePage = projectHost + "/stumobile";
// 获取token
const tokenApi = cloudHost + "/oauth-server-app";
const cloudHomepage = cloudHost + "/oauth-server-app/login";
const userWebRoot = cloudHost + "/eureka-zuul";
const baseUrl = cloudHost + "/edu-train-api";
const userApi = "/api-user/edu-user-api";
const studentApi = studentHost + "/edu-student-api";
const fileSystemApi = fileSystemHost + "/edu-dfs-api";

const client_id = "lcsoft";
const client_secret = "123456";
const isCommonFun = cloud.isCommonFun;
const schoolInfo = cloud.schoolInfo || {};

function getCloudUser() {
  cloud = getStore("cloud");
  if (cloud) {
    access_token = cloud.token;
    userId = cloud.detail.id;
    userTypeId = cloud.detail.userTypeId;
    userName = cloud.detail.userName;
    tenantId = cloud.detail.tenantId;
    switch (parseInt(userTypeId)) {
      case 10:
        userType = "admin";
        break;
      case 13:
        userType = "teacher";
        break;
      case 14:
        userType = "student";
    }
  }
}

function setCloudUser(cloud) {
  setStore("cloud", cloud || userInfo);
  getCloudUser();
}

export {
  baseUrl as BASE_URL,
  routerMode as ROUTER_MODE,
  access_token as ACCESS_TOKEN,
  tenantId as TENANT_ID,
  userId as USER_ID,
  userName as USER_NAME,
  userTypeId as USER_TYPE_ID,
  userType as USER_TYPE,
  userWebRoot as USER_WEB_ROOT,
  userApi as USER_API,
  studentApi as STUDENT_API,
  fileSystemApi as FILE_SYSTEM_API,
  cloudHomepage as CLOUD_HOME_PAGE,
  projectHomePage as PROJECT_HOME_PAGE,
  client_id as CLIENT_ID,
  tokenApi as TOKEN_API,
  client_secret as CLIENT_SECRET,
  cloudLoginRoot as CLOUD_LOGIN_ROOT,
  isCommonFun as IS_FULL_SCREEN,
  schoolInfo as SCHOOL_INFO,
  setCloudUser,
  getCloudUser
};
