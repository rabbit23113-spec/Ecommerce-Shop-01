import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'simple-array', name: 'product_ids' })
  productIds: string[];

  @Column({ name: 'payment_id', default: 'waiting...' })
  paymentId: string;

  @Column({ enum: Status, default: Status.ACTIVE })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
