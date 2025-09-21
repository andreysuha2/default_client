import { ApiHTTP } from "~/assets/js/http/api";
import type { ResponseData } from "~/assets/js/http/types";
import Auth from "~/assets/js/auth";
import type {
    NetworkResponse,
    NetworkCreateRequest,
    NetworkUpdateRequest,
    NetworkListRequest,
    NetworkListResponse,
    IPAddressResponse,
    IPAddressCreateRequest,
    IPAddressUpdateRequest,
    IPAddressListRequest,
    IPAddressListResponse,
    IPAddressGroupHttp
} from "~/composable/networks/types";

export class NetworksHttp extends ApiHTTP {
    constructor(auth: Auth | null = null) {
        super({ baseURL: "networks" }, auth);
    }

    public list(filterQuery: NetworkListRequest): Promise<ResponseData<NetworkListResponse>> {
        return this.get('/', { data: filterQuery });
    }

    public create(network: NetworkCreateRequest): Promise<ResponseData<NetworkResponse>> {
        return this.post('/', { data: network });
    }

    public read(networkId: number): Promise<ResponseData<NetworkResponse>> {
        return this.get(`/${networkId}`);
    }

    public update(networkId: number, network: NetworkUpdateRequest): Promise<ResponseData<NetworkResponse>> {
        return this.put(`/${networkId}`, { data: network });
    }

    public remove(networkId: number): Promise<ResponseData<NetworkResponse>> {
        return this.delete(`/${networkId}`);
    }

    public ipAddresses(networkId: number): IPAddressGroupHttp {
        return this.group<IPAddressGroupHttp>(`/${networkId}/ip-addresses`, query => ({
            list: (filterQuery: IPAddressListRequest): Promise<ResponseData<IPAddressListResponse>> => {
                return query.get('/', { data: filterQuery });
            },
            create: (ipAddress: IPAddressCreateRequest): Promise<ResponseData<IPAddressResponse>> => {
                return query.post("/", { data: ipAddress });
            },
            read: (ipAddressId: number): Promise<ResponseData<IPAddressResponse>> => {
                return query.get(`/${ipAddressId}`);
            },
            update: (ipAddressId: number, ipAddress: IPAddressUpdateRequest): Promise<ResponseData<IPAddressResponse>> => {
                return query.put(`/${ipAddressId}`, { data: ipAddress });
            },
            remove: (ipAddressId: number): Promise<ResponseData<IPAddressResponse>> => {
                return query.delete(`/${ipAddressId}`);
            }
        }));
    }
}