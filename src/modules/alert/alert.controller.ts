import { Body, Controller, InternalServerErrorException, NotFoundException, Post } from "@nestjs/common";
import { Alert } from "src/common/entities/alert.entity";
import { AlertService } from "./alert.service";
import { CreateAlertDto } from "src/common/dto/createAlert.dto";


@Controller("alert")
export class AlertController{
    constructor(private readonly alertService: AlertService){}
    @Post('setAlert')
    async setAlert(@Body() createAlertRequest: CreateAlertDto): Promise<Alert>{
        try {
            let alert: Alert = new Alert();
            alert.email = createAlertRequest.email
            alert.assetId = createAlertRequest.assetId
            alert.priceLimit = createAlertRequest.priceLimit
            return this.alertService.RegisterAlert(alert)
        }catch(error){
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
              }
        
              // Handle other unexpected errors
              throw new InternalServerErrorException('An unexpected error occurred while fetching the asset price.');
        }
    }
}