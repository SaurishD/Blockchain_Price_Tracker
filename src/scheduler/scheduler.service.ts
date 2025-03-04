import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import Molaris from "moralis";

@Injectable()
export class SchedulerService{
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
        console.log(ethPrice,btcPrice,maticPrice)


    }
}

