#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GameService } from './game/game.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  // Get command line arguments
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'start') {
    const gameService = app.get(GameService);
    await gameService.startGame();
  } else if (command === 'continue') {
    const playerId = parseInt(args[1]);
    const gameService = app.get(GameService);
    await gameService.continueGame(playerId);
  } else {
    console.log('Usage: npm run game:start or npm run game:continue <playerId>');
  }

  await app.close();
}

bootstrap();