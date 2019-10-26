import host from "./_host.js";

const upload = {
  getToken: {
    p: `${host}upload_token`,
    m: "GET"
  }
};

export default upload;