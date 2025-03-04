import { Injectable } from "@nestjs/common";
import { Price } from "src/common/entities/prices.entity";
import { Repository } from "typeorm";

@Injectable()
export class SwapRepository extends Repository<Price>{

    async getLatestPrice(assetId: string): Promise<number|undefined> {
        const price = await this.findOne({
            where: {asset_id: assetId},
            order: {timestamp: "DESC"}
        });
        return price?.price
    }
    
}