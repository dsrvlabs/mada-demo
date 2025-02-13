import type { CreateRequestDto } from "./dto/create-request.dto";

export class RequestService {
  private static instance: RequestService;
  private latestRequest: CreateRequestDto | null = null;

  create(createRequestDto: CreateRequestDto) {
    this.latestRequest = createRequestDto;
    return { apiUrl: `https://payments2024.duckdns.org/api/request/recent` };
  }

  findLatest() {
    return this.latestRequest;
  }
}

// RequestService 인스턴스를 글로벌 객체에 저장
const globalForRequestService = global as typeof global & {
  requestService?: RequestService;
};

export const requestService = globalForRequestService.requestService || new RequestService();
if (!globalForRequestService.requestService) globalForRequestService.requestService = requestService;
