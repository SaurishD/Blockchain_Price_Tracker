import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import Molaris from "moralis";
import { SchedulerRepository } from "./scheduler.repo";
import { Alert } from "src/common/entities/alert.entity";
import { Price } from "src/common/entities/prices.entity";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class SchedulerService{
    constructor(private readonly scheduleRepo: SchedulerRepository, private readonly mailerService: MailerService){}

    @Cron('0 */5 * * * *') // Runs every 5 minutes
    async priceUpdateCron() {
        await Molaris.start({
            apiKey: process.env.MOLARIS_API_KEY

        });

        const getPriceResponse = (await Molaris.EvmApi.token.getMultipleTokenPrices({
            "chain": "0x1", //Polygon chain
            },
            {
                "tokens": [
                    {"tokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}, //WETH price
                    {"tokenAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"}, //MATIC price
                    {"tokenAddress": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"} //WBTC Price

                ]
            }
        )).result;

        const ethPrice = getPriceResponse[0].usdPrice;
        const btcPrice = getPriceResponse[2].usdPrice;
        const maticPrice = getPriceResponse[1].usdPrice;
        const prices = await Promise.all([
            this.scheduleRepo.savePrice('ETH',ethPrice),
            this.scheduleRepo.savePrice('MATIC',maticPrice),
            this.scheduleRepo.savePrice('BTC',btcPrice),
         ])

         //check and send alerts
         for (const pr of prices){
            const prevPrice = await this.scheduleRepo.getSuddenPriceChangeIn1h(pr);
            if(prevPrice){
                await this.sendUpdateToAdmin(prevPrice, pr);
            }

            const alerts = await this.scheduleRepo.getTriggeredAlerts(pr);
            for(const al of alerts){
                await this.sendAlertMailsToUser(al, pr);
            }
         }


    }

    async sendUpdateToAdmin(prevPrice: Price, price: Price) {
        const percentIncrease = ((price.price - prevPrice.price)/prevPrice.price)*100
        this.mailerService.sendMail({
            to: process.env.ADMIN_EMAIL,
            subject: "Price Increase Alert",
            template: "./priceIncreaseAlert.hbs",
            context: {
                cryptoName: prevPrice.asset_id,
                currentPrice: price.price,
                timestamp: price.timestamp.toDateString(),
                percentIncrease: percentIncrease

            }
        })
    }

    async sendAlertMailsToUser(alert: Alert, currPrice: Price) {
        
        this.mailerService.sendMail({
            to: alert.email,
            subject: "Price Hit Alert",
            template: "./priceHitAlert.hbs",
            context: {
                crypotName: alert.assetId,
                setPrice: alert.priceLimit,
                currentPrice: currPrice.price
            }
        })

        this.scheduleRepo.updateAlertTime(alert)
    }
}

