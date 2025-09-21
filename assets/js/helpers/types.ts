export type objectForCamelize = Array<any> | { [key: string]: any  };

export interface Paginator {
    page: number,
    perPage: number
}

export interface PaginatorResponse extends Paginator {
    totalPages: number;
    totalItems: number;
}