import { Injectable } from "@nestjs/common";
import { PricePoint } from "src/common/dto/priceResponse.dto";
import { Price } from "src/common/entities/prices.entity";
import { MoreThanOrEqual, Repository } from "typeorm";


@Injectable()
export class PriceRepository extends Repository<Price>{

    async getLast24hPrices(assetId: string): Promise<PricePoint[]> {
        const currentTimestamp = new Date(); // Get the current timestamp
        const twentyFourHoursAgo = new Date(currentTimestamp.getTime() - 24 * 60 * 60 * 1000);
        const prices = await this.find({
            where: {
                asset_id: assetId,
                timestamp: MoreThanOrEqual(twentyFourHoursAgo),
            },
            order: {timestamp: "ASC"}
        })
        return prices.map(p => ({ price: p.price, timestamp: p.timestamp } as PricePoint))
    }
    
}