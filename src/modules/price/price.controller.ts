import { Controller, Get } from "@nestjs/common";


@Controller('price') 
export class PriceController{
    @Get('getPrice')
    getHellow(): string{
        return "Hellow world 2";
    }
}