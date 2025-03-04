import { Injectable } from "@nestjs/common";
import { PriceRepository } from "./price.repo";
import { PricePoint, PriceResponseDto } from "src/common/dto/priceResponse.dto";


@Injectable()
export class PriceService{
    constructor(private readonly priceRepo: PriceRepository){}

    async getPrices(): Promise<PriceResponseDto[]> {

        
        const currentTimestamp = new Date()
        let diff = 0.0
        const allEthPrices = await this.priceRepo.getLast24hPrices('ETH');
        const ethHourlyPrice = allEthPrices.filter(t => { 
            if(this.isMoreThanXHoursApart(currentTimestamp, t.timestamp,diff)){
                diff += 1
                return true
            }
            return false
        })
        diff = 0.0
        const allPolPrices = await this.priceRepo.getLast24hPrices('MATIC');
        const polygonHourlyPrice = allPolPrices.filter(t => { 
            if(this.isMoreThanXHoursApart(currentTimestamp, t.timestamp,diff)){
                diff += 1
                return true
            }
            return false
        })

        const ethPrices = {assetId: "ETH", prices: ethHourlyPrice} as PriceResponseDto
        const polPrices = {assetId: "MATIC", prices: polygonHourlyPrice} as PriceResponseDto

        return [ethPrices, polPrices]
    }

    isMoreThanXHoursApart(timestampA: Date, timestampB: Date, x: number): boolean {
        const diffInMs = Math.abs(timestampA.getTime() - timestampB.getTime());
        const diffInHours = diffInMs / (1000.0 * 60 * 60); // Convert milliseconds to hours
        return diffInHours > x;
    }
}