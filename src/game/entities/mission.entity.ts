import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from './player.entity';

export enum MissionType {
  RECRUITMENT = 'Recruitment',
  INFILTRATION = 'Infiltration',
  INFLUENCE = 'Influence',
  RESOURCE = 'Resource',
  KNOWLEDGE = 'Knowledge',
  CRISIS = 'Crisis',
}

export enum MissionStatus {
  AVAILABLE = 'Available',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'simple-enum',
    enum: MissionType,
  })
  type: MissionType;

  @Column({
    type: 'simple-enum',
    enum: MissionStatus,
    default: MissionStatus.AVAILABLE,
  })
  status: MissionStatus;

  @Column({ default: 1 })
  difficulty: number;

  @Column({ type: 'json', nullable: true })
  requirements: any;

  @Column({ type: 'json', nullable: true })
  rewards: any;

  @Column({ type: 'json', nullable: true })
  choices: any;

  @Column({ type: 'json', nullable: true })
  consequences: any;

  @ManyToOne(() => Player, player => player.missions)
  player: Player;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}