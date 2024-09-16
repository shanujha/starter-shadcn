const env = "local";

const urls = {
  local: "",
  staging: "",
  production: "",
};

const minIOConfigs = {
  local: {
    endPoint: "localhost",
    port: 9000,
    useSSL: true,
    accessKey: "",
    secretKey: "",
  },
};

export default {
  baseUrl: urls[env],
  minio: minIOConfigs[env],
  paths: {
    
  }
};
