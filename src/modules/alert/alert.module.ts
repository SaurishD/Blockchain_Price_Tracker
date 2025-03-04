import { Module } from "@nestjs/common";
import { AlertController } from "./alert.controller";
import { AlertService } from "./alert.service";
import { AlertRepository } from "./alert.repo";


@Module({
    controllers: [AlertController],
    providers: [AlertService, AlertRepository]
})
export class AlertModule {
    
}