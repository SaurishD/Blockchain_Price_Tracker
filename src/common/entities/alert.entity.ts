import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('alerts')
export class Alert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'asset_id'})
    assetId: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'price_limit'})
    priceLimit: number;

    @Column({name: 'last-update-sent', type:'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    lastUpdateSent: Date;

}