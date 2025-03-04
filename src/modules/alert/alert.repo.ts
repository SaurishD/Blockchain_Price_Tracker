import { Alert } from "src/common/entities/alert.entity";
import { Repository } from "typeorm";



export class AlertRepository extends Repository<Alert> {
    async CreateAlert(alert: Alert) {
        return this.create(alert);
    }
}