import { Module } from "@nestjs/common";
import { SwapController } from "./swap.controller";
import { SwapService } from "./swap.service";
import { SwapRepository } from "./swap.repo";


@Module({
    controllers: [SwapController],
    providers: [SwapService, SwapRepository]
})
export class SwapModule {
    
}