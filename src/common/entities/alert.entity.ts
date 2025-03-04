import { Column, Entity } from "typeorm";


@Entity('alerts')
export class Alert {
    id: number;

    @Column({name: 'asset_id'})
    assetId: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'price_limit'})
    priceLimit: number;

    @Column({name: 'last-update-sent', type:'timestamp'})
    lastUpdateSent: Date;

}