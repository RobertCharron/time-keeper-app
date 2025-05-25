import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Station } from '../../stations/entities/station.entity';
import { ActivityUse } from '../../activity-uses/entities/activity-use.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Station, (station) => station.activities)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @Column({ name: 'station_id' })
  stationId: number;

  @OneToMany(() => ActivityUse, (activityUse) => activityUse.activity)
  activityUses: ActivityUse[];
}
