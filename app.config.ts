export default defineAppConfig({
    ui: {
        colors: {
            primary: "uniform",
            neutral: 'neutral',
            // custom colors
            uniform: 'uniform',
            gold: 'gold',
            steppe: 'steppe',
            stormsky: 'stormsky',
            squadron: 'squadron',
            maroon: 'maroon',
            steel: 'steel',
            seawave: 'seawave',
            olive: 'olive'
        },
        button: {
            slots: {
                base: "cursor-pointer disabled:cursor-not-allowed"
            }
        },
        select: {
            slots: {
                base: "cursor-pointer disabled:cursor-not-allowed"
            }
        }
    }
});