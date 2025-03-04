import { Controller, Post } from "@nestjs/common";


@Controller("alert")
export class AlertController{
    @Post('setAlert')
    setAlert(): String{
        return "Alert set"
    }
}