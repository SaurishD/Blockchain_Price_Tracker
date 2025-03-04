import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'price' })
export class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'asset_id', type: 'varchar', length: 20 })
    asset_id: string; //eg BTC, ETH

    @Column({ name: 'price', type: 'decimal', precision: 18, scale: 8 })
    price: number;


    @CreateDateColumn({ name: 'timestamp', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    timestamp: Date;
}