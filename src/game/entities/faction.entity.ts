import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum FactionType {
  AMERICAN_EMPIRE = 'American Empire',
  RUSSIAN_BEAR = 'Russian Bear',
  CHINESE_DRAGON = 'Chinese Dragon',
  EUROPEAN_UNION = 'European Union',
  BANKING_CARTEL = 'Banking Cartel',
  MILITARY_INDUSTRIAL_COMPLEX = 'Military-Industrial Complex',
  ISRAEL_LOBBY = 'Israel Lobby',
  SAUDI_UAE_AXIS = 'Saudi-UAE Axis',
  TURKISH_DEEP_STATE = 'Turkish Deep State',
  IRANIAN_MULLAHS = 'Iranian Mullahs',
  INDIAN_HINDUTVA = 'Indian Hindutva',
  TECH_TOTALITARIANS = 'Tech Totalitarians',
}

@Entity()
export class Faction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: FactionType,
  })
  type: FactionType;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 50 })
  influence: number;

  @Column({ default: 50 })
  power: number;

  @Column({ default: 50 })
  stability: number;

  @Column({ type: 'json', nullable: true })
  leaders: any;

  @Column({ type: 'json', nullable: true })
  goals: any;

  @Column({ type: 'json', nullable: true })
  conspiracies: any;
}