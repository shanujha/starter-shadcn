const env = "local";

const urls = {
    local: "",
    staging: "",
    production: "",
};

export default {
    baseUrl: urls[env],
    paths: {
    }
}