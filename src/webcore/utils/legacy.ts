export const extractInstanceUri = (uri: string) => {
    if (!uri.startsWith("https://")) {
        if (uri && (uri.indexOf("tat.comapi") > 0)) {
            const parts = uri.split("api");
            if (parts[1].length >= 33) {
                const uid = parts[1].substr(0, 32);
                const appid = parts[1].substr(32);
                uri = "https://" + parts[0] + "/api/" + uid.substr(0, 8) + "-" + uid.substr(8, 4) + "-" + uid.substr(12, 4) + "-" +
                      uid.substr(16, 4) + "-" + uid.substr(20, 12) + "/apps/" + appid;
            }
        } else {
            if (uri.length >= 69) {
                let host = uri.substr(0, uri.length - 64);
                if (!host.endsWith(".com")) { host += ".api.smartthings.com"; }
                uri = uri.substr(0, 8) === "https://" ? uri : "https://" + host + "/api/token/" +
                      uri.substr(-64, 8) + "-" + uri.substr(-56, 4) + "-" + uri.substr(-52, 4) +
                      "-" + uri.substr(-48, 4) + "-" + uri.substr(-44, 12) +  "/smartapps/installations/" +
                      uri.substr(-32, 8) + "-" + uri.substr(-24, 4) + "-" + uri.substr(-20, 4) + "-" +
                      uri.substr(-16, 4) + "-" + uri.substr(-12) + "/";
            }
        }
    }
    return uri;
};
