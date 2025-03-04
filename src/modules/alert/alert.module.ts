import { Module } from "@nestjs/common";
import { AlertController } from "./alert.controller";
import { AlertService } from "./alert.service";
import { AlertRepository } from "./alert.repo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Alert } from "src/common/entities/alert.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Alert])],
    controllers: [AlertController],
    providers: [AlertService, AlertRepository]
})
export class AlertModule {
    
}