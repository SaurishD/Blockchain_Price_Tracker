import { IsNumber, IsString } from "class-validator";

export class CreateAlertDto{
    @IsString()
    email: string;

    @IsNumber()
    priceLimit: number;

    @IsString()
    assetId: string;
}