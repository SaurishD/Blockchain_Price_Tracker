import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAlertDto {
    @ApiProperty({
      description: 'User email to receive the alert',
      example: 'user@example.com',
    })
    @IsString()
    email: string;
  
    @ApiProperty({
      description: 'Price limit that triggers the alert',
      example: 50000.75,
    })
    @IsNumber()
    priceLimit: number;
  
    @ApiProperty({
      description: 'Asset ID for which the alert is set',
      example: 'BTC-USD',
    })
    @IsString()
    assetId: string;
  }