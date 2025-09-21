export type ServerErrorValidationDetail = {
    ctx: { [key: string]: string },
    input: string,
    loc: ["body", ...string[]],
    msg: string,
    type: string
}

export type ServerErrorData = {
    status: number,
    headers: { [key: string]: string },
    body: { detail: string | ServerErrorValidationDetail[] },
}

export type ServerError = {
    status: number,
    data: ServerErrorData
}