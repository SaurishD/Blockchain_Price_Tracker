import { InjectRepository } from "@nestjs/typeorm";
import { Alert } from "src/common/entities/alert.entity";
import { Repository } from "typeorm";



export class AlertRepository {

    constructor(
        @InjectRepository(Alert)
        private readonly alertRepository: Repository<Alert>
      ) {}

    async CreateAlert(alert: Alert) {
        return this.alertRepository.save(alert);
    }
}