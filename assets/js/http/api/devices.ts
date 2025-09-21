import { ApiHTTP } from "~/assets/js/http/api";
import type { ResponseData } from "~/assets/js/http/types";
import Auth from "~/assets/js/auth";
import type {
    DeviceResponse,
    DeviceCreateRequest,
    DeviceUpdateRequest,
    DeviceListRequest,
    DeviceListResponse
} from "~/composable/devices/types";

export class DevicesHttp extends ApiHTTP {
    constructor(auth: Auth | null = null) {
        super({ baseURL: "devices" }, auth);
    }

    public list(filterQuery: DeviceListRequest): Promise<ResponseData<DeviceListResponse>> {
        return this.get('/', { data: filterQuery });
    }

    public create(devices: DeviceCreateRequest): Promise<ResponseData<DeviceResponse>> {
        return this.post('/', { data: devices });
    }

    public read(deviceId: number): Promise<ResponseData<DeviceResponse>> {
        return this.get(`/${deviceId}`);
    }

    public update(deviceId: number, device: DeviceUpdateRequest): Promise<ResponseData<DeviceResponse>> {
        return this.put(`/${deviceId}`, { data: device });
    }

    public remove(devicesId: number): Promise<ResponseData<DeviceResponse>> {
        return this.delete(`/${devicesId}`);
    }
}