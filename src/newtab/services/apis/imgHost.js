const env = process.env.NODE_ENV;
let imgHost = "https://chrome-extension-server.oss-cn-shanghai.aliyuncs.com/";

if (env === "production") {
  imgHost = "https://static.tabplus.net/";
}

export default imgHost;
