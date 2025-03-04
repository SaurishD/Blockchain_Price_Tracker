import { Controller, Get, Param } from "@nestjs/common";
import { SwapService } from "./swap.service";
import { SwapResponseDto } from "src/common/dto/swapResponse.dto";


@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService){}

    @Get('ethToBtc')
    async getBtcAmountForEth(@Param() ethAmount: number): Promise<SwapResponseDto> {
        return this.swapService.getBtcAmountForEth(ethAmount)
    }
}