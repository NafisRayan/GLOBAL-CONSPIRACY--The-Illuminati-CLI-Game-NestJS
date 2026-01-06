import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mission } from './mission.entity';

export enum PlayerRank {
  INITIATE = 'Initiate',
  APPRENTICE = 'Apprentice',
  KEEPER = 'Keeper',
  MASTER = 'Master',
  COUNCIL_MEMBER = 'Council Member',
  GRAND_MASTER = 'Grand Master',
  ILLUMINATUS = 'Illuminatus',
}

export enum PlayerBackground {
  CORPORATE_EXECUTIVE = 'Corporate Executive',
  INTELLIGENCE_OFFICER = 'Intelligence Officer',
  ACADEMIC = 'Academic',
  CRIMINAL = 'Criminal',
  POLITICIAN = 'Politician',
  OCCULTIST = 'Occultist',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: PlayerRank,
    default: PlayerRank.INITIATE,
  })
  rank: PlayerRank;

  @Column({
    type: 'simple-enum',
    enum: PlayerBackground,
  })
  background: PlayerBackground;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 50 })
  influence: number;

  @Column({ default: 1000 })
  wealth: number;

  @Column({ default: 10 })
  knowledge: number;

  @Column({ default: 5 })
  power: number;

  @Column({ default: 80 })
  secrecy: number;

  @Column({ default: 50 })
  loyalty: number;

  @Column({ default: 50 })
  charisma: number;

  @Column({ default: 50 })
  intelligence: number;

  @Column({ default: 50 })
  cunning: number;

  @Column({ default: 50 })
  willpower: number;

  @Column({ default: 50 })
  stealth: number;

  @Column({ default: 0 })
  turn: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Mission, mission => mission.player)
  missions: Mission[];
}