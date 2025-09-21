// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    experimental: {
        scanPageMeta: true
    },
    modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],
    css: ['~/assets/scss/lib.css'],
    plugins: ["~/plugins/bootstrap", "~/plugins/directives/phoneMask", "~/plugins/yup"],
    i18n: {
        defaultLocale: "uk",
        strategy: "prefix",
        locales: [
            { code: "uk", name: "Українська", file: "uk.json" },
            { code: "en", name: "English", file: "en.json" }
        ]
    },
    ui: { theme: {
        colors: [ "uniform", "gold", "steppe", "stormsky", "squadron", "maroon", "steel", "seawave", "olive",
        "primary", "secondary", "info", "success", "warning", "error"] } },
    compatibilityDate: '2024-07-31'
});