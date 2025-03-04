import { Controller, Get, Param } from "@nestjs/common";
import { SwapService } from "./swap.service";
import { SwapResponseDto } from "src/common/dto/swapResponse.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Swap')
@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService){}

    @Get('ethToBtc/:ethAmount')
    @ApiOperation({ summary: 'Get eth to btc swap price' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiParam({name: "ethAmount", required: true, type: Number, description: "Amount of eth to be swapped"})
    async getBtcAmountForEth(@Param('ethAmount') ethAmount: number): Promise<SwapResponseDto> {
        return this.swapService.getBtcAmountForEth(ethAmount)
    }
}