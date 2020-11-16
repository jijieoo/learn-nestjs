import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExpectionsFilter extends BaseExceptionFilter {
    catch(expection: unknown, host: ArgumentsHost) {
        super.catch(expection, host);
    }
}