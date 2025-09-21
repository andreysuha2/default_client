import { useApp } from "~/composable/app";

export default defineNuxtPlugin({
    name: "bootstrap",
    async setup() {
        const app = useApp();
        await app.bootstrap();
    }
})