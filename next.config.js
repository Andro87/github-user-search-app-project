/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
};

module.exports = nextConfig;
module.exports = {
    reactStrictMode: true
};
const config = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|ts)x?$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

module.exports = {
    ...config,
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    }
};
