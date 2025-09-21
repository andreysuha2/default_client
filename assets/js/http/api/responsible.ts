import { ApiHTTP } from "~/assets/js/http/api";
import type { ResponseData } from "~/assets/js/http/types";
import Auth from "~/assets/js/auth";
import type {
    ResponsibleListRequest,
    ResponsibleListResponse,
    ResponsibleCreateRequest,
    ResponsibleUpdateRequest,
    ResponsibleResponse
} from "~/composable/responsible/types";

export class ResponsibleHttp extends ApiHTTP {
    constructor(auth: Auth | null = null) {
        super({ baseURL: "responsible" }, auth);
    }

    public list(filterQuery: ResponsibleListRequest): Promise<ResponseData<ResponsibleListResponse>> {
        return this.get('/', { data: filterQuery });
    }

    public create(responsible: ResponsibleCreateRequest): Promise<ResponseData<ResponsibleResponse>> {
        return this.post('/', { data: responsible });
    }

    public read(responsibleId: number): Promise<ResponseData<ResponsibleResponse>> {
        return this.get(`/${responsibleId}`);
    }

    public update(responsibleId: number, responsible: ResponsibleUpdateRequest): Promise<ResponseData<ResponsibleResponse>> {
        return this.put(`/${responsibleId}`, { data: responsible });
    }

    public remove(responsibleId: number): Promise<ResponseData<ResponsibleResponse>> {
        return this.delete(`/${responsibleId}`);
    }
}