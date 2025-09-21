import { setLocale } from "yup";

export default defineNuxtPlugin({
    name: "yup",
    async setup() {
        const { t } = useNuxtApp().$i18n;
        setLocale({
            mixed: {
                default: ({ path }) => t('forms.errors.mixed.default', { path: path.toLowerCase() }),
                required: ({ path }) => t('forms.errors.mixed.required', { path: path.toLowerCase() }),
                oneOf: ({ path, values }) => t('forms.errors.mixed.oneOf', { path: path.toLowerCase(), values: values.join(', ') }),
                notOneOf: ({ path, values }) => t('forms.errors.mixed.notOneOf', { path: path.toLowerCase(), values: values.join(', ') }),
            },
            string: {
                length: ({ path, length }) => t('forms.errors.string.length', { path: path.toLowerCase(), length }),
                min: ({ path, min }) => t('forms.errors.string.min', { path: path.toLowerCase(), min }),
                max: ({ path, max }) => t('forms.errors.string.max', { path: path.toLowerCase(), max }),
                matches: ({ path, regex }) => t('forms.errors.string.matches', { path: path.toLowerCase(), regex }),
                email: ({ path }) => t('forms.errors.string.email', { path: path.toLowerCase() }),
                url: ({ path }) => t('forms.errors.string.url', { path: path.toLowerCase() }),
                trim: ({ path }) => t('forms.errors.string.trim', { path: path.toLowerCase() }),
                lowercase: ({ path }) => t('forms.errors.string.lowercase', { path: path.toLowerCase() }),
                uppercase: ({ path }) => t('forms.errors.string.uppercase', { path: path.toLowerCase() }),
            },
            number: {
                min: ({ path, min }) => t('forms.errors.number.min', { path: path.toLowerCase(), min }),
                max: ({ path, max }) => t('forms.errors.number.max', { path: path.toLowerCase(), max }),
                lessThan: ({ path, less }) => t('forms.errors.number.lessThan', { path: path.toLowerCase(), less }),
                moreThan: ({ path, more }) => t('forms.errors.number.moreThan', { path: path.toLowerCase(), more }),
                positive: ({ path }) => t('forms.errors.number.positive', { path: path.toLowerCase() }),
                negative: ({ path }) => t('forms.errors.number.negative', { path: path.toLowerCase() }),
                integer: ({ path }) => t('forms.errors.number.integer', { path: path.toLowerCase() }),
            },
            date: {
                min: ({ path, min }) => t('forms.errors.date.min', { path: path.toLowerCase(), min }),
                max: ({ path, max }) => t('forms.errors.date.max', { path: path.toLowerCase(), max }),
            },
            array: {
                min: ({ path, min }) => t('forms.errors.array.min', { path: path.toLowerCase(), min }),
                max: ({ path, max }) => t('forms.errors.array.max', { path: path.toLowerCase(), max }),
            },
        });
    }
})