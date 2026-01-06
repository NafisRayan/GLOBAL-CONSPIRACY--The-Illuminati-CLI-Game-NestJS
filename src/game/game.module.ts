import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { Player } from './entities/player.entity';
import { Mission } from './entities/mission.entity';
import { Faction } from './entities/faction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Mission, Faction])],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}