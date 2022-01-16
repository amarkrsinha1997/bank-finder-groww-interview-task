import { IBank } from "./models";
import { cacheDuration, baseUrl } from "./config";
interface ICacheResponse<T> {
  timestamp: number;
  response: T;
}
class ApiHandler<T> {
  private baseUrl = baseUrl;
  private cacheDuration: number;
  constructor(cacheDuration: number) {
    this.cacheDuration = cacheDuration;
  }
  makeGetCall = async (
    path: string,
    params: Record<string, string>
  ): Promise<T> => {
    const url =
      this.baseUrl +
      path +
      "?" +
      Object.keys(params)
        .map((k) => `${k}=${params[k]}`)
        .join("&");

    const cacheResponse = localStorage.getItem(url);
    if (cacheResponse) {
      const cacheResp = JSON.parse(cacheResponse) as ICacheResponse<T>;
      if (!this.isExpired(cacheResp)) {
        return cacheResp.response;
      }
      localStorage.removeItem(url);
    }

    const response: T = await fetch(url).then((r) => r.json());
    localStorage.setItem(
      url,
      JSON.stringify({
        timestamp: Date.now() + this.cacheDuration,
        response
      } as ICacheResponse<T>)
    );

    return response;
  };
  private isExpired = (cacheResponse: ICacheResponse<T>) => {
    return cacheResponse.timestamp <= Date.now();
  };
}

const apiHandler = new ApiHandler<Array<IBank>>(cacheDuration);

export const bankApi = {
  getBankList: (cityName: string) => {
    return apiHandler.makeGetCall("/banks", { city: cityName.toUpperCase() });
  },
  getBank: async (cityName: string, ifscCode: string) => {
    const banks = await apiHandler.makeGetCall("/banks", {
      city: cityName.toUpperCase()
    });
    return banks.find((bank) => bank.ifsc === ifscCode)!!;
  }
};
