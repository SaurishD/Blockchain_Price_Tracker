import { Injectable, NotFoundException } from "@nestjs/common";
import { SwapResponseDto } from "src/common/dto/swapResponse.dto";
import { Price } from "src/common/entities/prices.entity";
import { Repository } from "typeorm";
import { SwapRepository } from "./swap.repo";

const FEES_PERCENT = 0.03
@Injectable()
export class SwapService{
    constructor(private readonly swapRepository: SwapRepository){}

    async getBtcAmountForEth(ethAmount: number) : Promise<SwapResponseDto>{
        const fees = ethAmount * FEES_PERCENT/100.0;
        const [btcPrice, ethPrice] = await Promise.all([
            this.swapRepository.getLatestPrice('BTC'),
            this.swapRepository.getLatestPrice('ETH')
        ])
        if (!btcPrice || !ethPrice) {
            throw NotFoundException;
        }
        const totalBtcAmount = (ethAmount-fees)*ethPrice/btcPrice
 
        let response: SwapResponseDto = new SwapResponseDto();
        response.fees = fees
        response.amountOfBtc = totalBtcAmount

        return response;

    }
    
}