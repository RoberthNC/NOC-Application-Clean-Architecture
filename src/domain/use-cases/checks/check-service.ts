import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error(`Error on Check Service ${url}`);
      }
      const optionsLow = {
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      };
      const log = new LogEntity(optionsLow);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const optionsHigh = {
        message: `${url} is not ok. ${error}`,
        level: LogSeverityLevel.high,
        origin: "check-service.ts",
      };
      const log = new LogEntity(optionsHigh);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(optionsHigh.message);
      return false;
    }
  }
}
