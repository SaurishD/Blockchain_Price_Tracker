


export class PriceResponseDto{
    assetId: string;
    prices: PricePoint[];
}

export class PricePoint{
    timestamp: Date;
    price: number;
}