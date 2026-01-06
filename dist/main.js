#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const game_service_1 = require("./game/game.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: false,
    });
    const args = process.argv.slice(2);
    const command = args[0];
    if (command === 'start') {
        const gameService = app.get(game_service_1.GameService);
        await gameService.startGame();
    }
    else if (command === 'continue') {
        const playerId = parseInt(args[1]);
        const gameService = app.get(game_service_1.GameService);
        await gameService.continueGame(playerId);
    }
    else {
        console.log('Usage: npm run game:start or npm run game:continue <playerId>');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=main.js.map