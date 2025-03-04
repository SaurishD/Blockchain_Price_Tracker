import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Price } from "src/common/entities/prices.entity";
import { Repository } from "typeorm";

@Injectable()
export class SwapRepository{

    constructor(
        @InjectRepository(Price)
        private readonly priceRepository: Repository<Price>
      ) {}

    async getLatestPrice(assetId: string): Promise<number|undefined> {
        const price = await this.priceRepository.findOne({
            where: {asset_id: assetId},
            order: {timestamp: "DESC"}
        });
        return price?.price
    }
    
}