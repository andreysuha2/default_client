import type { ServerError } from "~/composable/serverErrorHandler/types";
import type { FormError } from "#ui/types";
import { camelize } from "assets/js/helpers";

export const useServerErrorHandler = (defaultMessage: string = 'Something went wrong. Try again later!') => {
    const toast = useToast(),
        { t } = useI18n(),
        showErrorToast = (title: string, description: string) => {
            setTimeout(() => {
                toast.add({
                    title, description, color: 'maroon', icon: 'i-heroicons-x-circle-16-solid'
                })
            });
        },
        defaultErrorHandler = (data: ServerError) => {
            console.log(data);
        },
        handleAuthorizationErrors = (err: ServerError) => {
            if(err.status !== 401) return handler(err);
            showErrorToast('Помилка авторизації', String(err.data.body.detail));
        },
        handleFormError = (err: ServerError, formName: string, form: any = null) => {
            const { detail } = err.data.body;
            if(typeof detail === 'string' || err.status !== 422) return handler(err);
            const errors = detail.map(({ loc: [, ...path], ...item }): FormError => ({
                name: path.map(i => camelize(i)).join("."),
                message: t(
                    `forms.errors.server.${camelize(item.type)}`,
                    {
                        ...item,
                        path: t(
                            `${formName}.fields.${camelize(path[path.length - 1])}.label`,
                            {},
                            { default: path[path.length - 1]}) },
                    { default: item.msg }
                    )
            }));
            if(form) form.value.setErrors(errors)
            else errors.forEach(item => showErrorToast(
                `${item.name} error`,
                    item.message
            ));
        },
        errors = {
            "401": handleAuthorizationErrors,
            "422": handleFormError,
            "default": defaultErrorHandler,
        },
        handler = (error: ServerError, options: any = null) => {
            const handler = errors[String(error.status)] || defaultErrorHandler;
            return handler(error, options);
        };

    return { errors, handler, defaultErrorHandler, handleFormError };
}