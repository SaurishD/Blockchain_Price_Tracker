import { Module } from "@nestjs/common";
import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";
import { PriceRepository } from "./price.repo";

@Module({
    controllers : [PriceController],
    providers: [PriceService, PriceRepository]
})
export class PriceModule {}