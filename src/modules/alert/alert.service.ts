import { Injectable } from "@nestjs/common";
import { AlertRepository } from "./alert.repo";
import { Alert } from "src/common/entities/alert.entity";


@Injectable()
export class AlertService {

    constructor(private readonly alertRepo: AlertRepository){}

    async RegisterAlert(alert: Alert): Promise<Alert> {
        return this.alertRepo.CreateAlert(alert)
    }

}
