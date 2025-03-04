import { Alert } from "src/common/entities/alert.entity";
import { Price } from "src/common/entities/prices.entity"
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm"


export class SchedulerRepository{

    constructor(private priceRepository: Repository<Price>, private alertRepository: Repository<Alert>) {}

    async savePrice(assetId: string, price: number): Promise<Price>{
        return this.priceRepository.create({asset_id: assetId, price: price});
    }

    async getSuddenPriceChangeIn1h(pr: Price): Promise<Price | null>{
        const timeBefore1h = new Date(pr.timestamp.getTime() - 60 * 60 * 1000);

        return this.priceRepository.findOne({
            where: {
                asset_id: pr.asset_id,
                price: LessThanOrEqual(pr.price * 97.09),
                timestamp: MoreThanOrEqual(timeBefore1h)
            }
        })
    }

    async getTriggeredAlerts(price: Price): Promise<Alert[]> {
        const timeBefore1h = new Date(price.timestamp.getTime() - 60 * 60 * 1000);
        return this.alertRepository.find({
            where: {
                assetId: price.asset_id,
                priceLimit: LessThanOrEqual(price.price),
                lastUpdateSent: LessThanOrEqual(timeBefore1h)
            }
        })
    }
}