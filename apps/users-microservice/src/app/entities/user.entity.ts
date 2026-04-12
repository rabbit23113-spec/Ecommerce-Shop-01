import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-json',
    default: {
      country: 'You should add your country',
      city: 'You should add your city',
    },
  })
  address: {
    country: string;
    city: string;
  };

  @Column({ type: 'simple-array', name: 'order_ids', default: [] })
  orderIds: string[];

  @Column({ type: 'enum', default: UserRole.USER, enum: UserRole })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
