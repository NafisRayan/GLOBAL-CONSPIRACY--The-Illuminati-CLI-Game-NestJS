# Illuminati CLI Game

A text-based command-line interface game where you rise through the ranks of a secret society, making strategic decisions that affect global geopolitics.

## Installation

```bash
npm install
npm run build
```

## How to Play

### Start a New Game
```bash
npm run game:start
```

### Continue an Existing Game
```bash
npm run game:continue <playerId>
```

## Game Concept

You play as a member of the Illuminati, a secret society that manipulates world events. Your goal is to rise through the ranks by completing missions, managing resources, and making choices that reveal layers of conspiracy.

### Resources
- **🎭 Influence**: Political power and social standing
- **💰 Wealth**: Money and financial assets
- **📚 Knowledge**: Secret information and research
- **⚡ Power**: Direct control over people and institutions
- **🔒 Secrecy**: How well-hidden your operations are
- **🤝 Loyalty**: Trust from your followers

### Ranks
- Initiate → Apprentice → Keeper → Master → Council Member → Grand Master → Illuminatus

## Features

- **Multiple Factions**: 12 major global powers (US, Russia, China, etc.)
- **Real Conspiracy Theories**: Based on documented historical events
- **Moral Choices**: Decisions with real consequences
- **Persistent Save**: SQLite database for game state
- **Interactive CLI**: Beautiful terminal interface with colors

## Disclaimer

This game explores conspiracy theories as narrative fiction. All controversial content is presented as gameplay mechanics, not claims of fact. Players are encouraged to research events independently.

## Development

Built with:
- TypeScript
- NestJS
- TypeORM
- SQLite
- Inquirer.js
- Chalk

## License

MIT