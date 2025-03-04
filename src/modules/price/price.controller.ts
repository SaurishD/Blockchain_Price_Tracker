import { Controller, Get } from "@nestjs/common";
import { PriceResponseDto } from "src/common/dto/priceResponse.dto";
import { PriceService } from "./price.service";


@Controller('price') 
export class PriceController{
    constructor(private readonly priceService: PriceService){}

    @Get('getPrices')
    async getPrices(): Promise<PriceResponseDto[]>{
        return this.priceService.getPrices()
    }
}