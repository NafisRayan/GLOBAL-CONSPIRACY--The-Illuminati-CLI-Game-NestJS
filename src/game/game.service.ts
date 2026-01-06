import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player, PlayerRank, PlayerBackground } from './entities/player.entity';
import { Mission, MissionType, MissionStatus } from './entities/mission.entity';
import { Faction, FactionType } from './entities/faction.entity';
import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(Faction)
    private factionRepository: Repository<Faction>,
  ) {}

  async initializeGame() {
    // Initialize factions
    await this.initializeFactions();

    // Initialize base missions
    await this.initializeMissions();

    console.log(chalk.cyan(figlet.textSync('ILLUMINATI', { horizontalLayout: 'full' })));
    console.log(chalk.yellow('🔥 GLOBAL CONSPIRACY: The Illuminati CLI Game 🔥'));
    console.log(chalk.red('⚠️  DISCLAIMER: This is fiction based on real events and theories'));
    console.log('');
  }

  async createNewPlayer(name: string, background: PlayerBackground): Promise<Player> {
    const player = this.playerRepository.create({
      name,
      background,
      // Set initial stats based on background
      ...this.getInitialStatsForBackground(background),
    });

    return await this.playerRepository.save(player);
  }

  async getPlayerById(id: number): Promise<Player> {
    return await this.playerRepository.findOne({
      where: { id },
      relations: ['missions'],
    });
  }

  async getAvailableMissions(playerId: number): Promise<Mission[]> {
    return await this.missionRepository.find({
      where: { status: MissionStatus.AVAILABLE },
    });
  }

  async startMission(playerId: number, missionId: number): Promise<Mission> {
    const mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });

    if (!mission) {
      throw new Error('Mission not found');
    }

    mission.status = MissionStatus.ACTIVE;
    mission.player = await this.getPlayerById(playerId);

    return await this.missionRepository.save(mission);
  }

  async completeMission(playerId: number, missionId: number, choice: number): Promise<void> {
    const player = await this.getPlayerById(playerId);
    const mission = await this.missionRepository.findOne({
      where: { id: missionId },
    });

    if (!mission || mission.status !== MissionStatus.ACTIVE) {
      throw new Error('Invalid mission');
    }

    // Apply consequences based on choice
    const consequences = mission.consequences[choice];
    if (consequences) {
      this.applyConsequences(player, consequences);
    }

    // Apply rewards
    if (mission.rewards) {
      this.applyRewards(player, mission.rewards);
    }

    mission.status = MissionStatus.COMPLETED;
    await this.missionRepository.save(mission);
    await this.playerRepository.save(player);

    // Check for rank advancement
    await this.checkRankAdvancement(player);
  }

  private getInitialStatsForBackground(background: PlayerBackground) {
    const baseStats = {
      influence: 50,
      wealth: 1000,
      knowledge: 10,
      power: 5,
      secrecy: 80,
      loyalty: 50,
      charisma: 50,
      intelligence: 50,
      cunning: 50,
      willpower: 50,
      stealth: 50,
    };

    switch (background) {
      case PlayerBackground.CORPORATE_EXECUTIVE:
        return { ...baseStats, wealth: 5000, influence: 70 };
      case PlayerBackground.INTELLIGENCE_OFFICER:
        return { ...baseStats, cunning: 70, stealth: 70 };
      case PlayerBackground.ACADEMIC:
        return { ...baseStats, intelligence: 80, knowledge: 30 };
      case PlayerBackground.CRIMINAL:
        return { ...baseStats, stealth: 80, cunning: 70 };
      case PlayerBackground.POLITICIAN:
        return { ...baseStats, charisma: 80, influence: 70 };
      case PlayerBackground.OCCULTIST:
        return { ...baseStats, willpower: 80, knowledge: 25 };
      default:
        return baseStats;
    }
  }

  private applyConsequences(player: Player, consequences: any) {
    if (consequences.influence) player.influence += consequences.influence;
    if (consequences.wealth) player.wealth += consequences.wealth;
    if (consequences.knowledge) player.knowledge += consequences.knowledge;
    if (consequences.power) player.power += consequences.power;
    if (consequences.secrecy) player.secrecy += consequences.secrecy;
    if (consequences.loyalty) player.loyalty += consequences.loyalty;
    if (consequences.experience) player.experience += consequences.experience;

    // Ensure stats don't go below 0 or above 100
    Object.keys(consequences).forEach(key => {
      if (typeof player[key] === 'number') {
        player[key] = Math.max(0, Math.min(100, player[key]));
      }
    });
  }

  private applyRewards(player: Player, rewards: any) {
    this.applyConsequences(player, rewards);
  }

  private async checkRankAdvancement(player: Player) {
    const rankThresholds = {
      [PlayerRank.INITIATE]: 0,
      [PlayerRank.APPRENTICE]: 100,
      [PlayerRank.KEEPER]: 300,
      [PlayerRank.MASTER]: 600,
      [PlayerRank.COUNCIL_MEMBER]: 1000,
      [PlayerRank.GRAND_MASTER]: 1500,
      [PlayerRank.ILLUMINATUS]: 2200,
    };

    const currentRankIndex = Object.values(PlayerRank).indexOf(player.rank);
    const nextRank = Object.values(PlayerRank)[currentRankIndex + 1];

    if (nextRank && player.experience >= rankThresholds[nextRank]) {
      player.rank = nextRank;
      console.log(chalk.green(`🎉 Congratulations! You have advanced to ${nextRank}!`));
    }
  }

  private async initializeFactions() {
    const factions = [
      {
        name: 'American Empire',
        type: FactionType.AMERICAN_EMPIRE,
        description: 'US Deep State controlling NATO, Five Eyes, and the dollar reserve currency',
        influence: 85,
        power: 90,
        stability: 70,
        leaders: ['CIA Director', 'Federal Reserve Chair', 'President'],
        goals: ['Full-spectrum dominance', 'Control global finance'],
        conspiracies: ['9/11 inside job', 'JFK assassination', 'MKUltra mind control'],
      },
      {
        name: 'Russian Bear',
        type: FactionType.RUSSIAN_BEAR,
        description: 'Siloviki state protecting Russian interests',
        influence: 60,
        power: 80,
        stability: 75,
        leaders: ['Vladimir Putin', 'FSB Director'],
        goals: ['Restore Soviet sphere', 'Challenge US hegemony'],
        conspiracies: ['Apartment bombings false flag', 'Litvinenko poisoning'],
      },
      {
        name: 'Chinese Dragon',
        type: FactionType.CHINESE_DRAGON,
        description: 'CCP controlling manufacturing and rare earth minerals',
        influence: 75,
        power: 85,
        stability: 80,
        leaders: ['Xi Jinping', 'PLA Chief'],
        goals: ['Economic supremacy', 'Displace US dollar by 2035'],
        conspiracies: ['Social credit system', 'Uyghur genocide', 'COVID origins cover-up'],
      },
      {
        name: 'European Union',
        type: FactionType.EUROPEAN_UNION,
        description: 'Berlin-Paris axis controlling EU regulations and Euro currency',
        influence: 70,
        power: 65,
        stability: 85,
        leaders: ['German Chancellor', 'European Commission President'],
        goals: ['European superstate', 'Challenge US & China'],
        conspiracies: ['EU bureaucracy unelected', 'Migrant crisis manufactured'],
      },
      {
        name: 'Banking Cartel',
        type: FactionType.BANKING_CARTEL,
        description: 'Central banks, IMF, World Bank controlling global debt',
        influence: 95,
        power: 60,
        stability: 90,
        leaders: ['BIS Chairman', 'IMF Director', 'Federal Reserve Chair'],
        goals: ['Global debt slavery', 'Own all national governments'],
        conspiracies: ['Federal Reserve privately owned', '2008 bailout fraud'],
      },
      {
        name: 'Military-Industrial Complex',
        type: FactionType.MILITARY_INDUSTRIAL_COMPLEX,
        description: 'Defense contractors profiting from perpetual war',
        influence: 80,
        power: 75,
        stability: 85,
        leaders: ['Defense Secretary', 'Lockheed Martin CEO'],
        goals: ['Perpetual war for perpetual profit'],
        conspiracies: ['Eisenhower warning ignored', 'WMD lies for Iraq invasion'],
      },
    ];

    for (const factionData of factions) {
      const existing = await this.factionRepository.findOne({
        where: { type: factionData.type },
      });
      if (!existing) {
        await this.factionRepository.save(factionData);
      }
    }
  }

  private async initializeMissions() {
    const missions = [
      {
        title: 'The Venezuela Coup',
        description: 'Support or oppose the 2002 coup attempt against Hugo Chavez',
        type: MissionType.INFLUENCE,
        difficulty: 2,
        requirements: { influence: 30 },
        rewards: { experience: 50, influence: 10 },
        choices: [
          'Support the coup - Chavez becomes authoritarian but US gains influence',
          'Warn Chavez - You get fired but prevent dictatorship',
          'Play both sides - Gain wealth but lose trust',
        ],
        consequences: [
          { influence: 15, secrecy: -10, experience: 50 },
          { influence: -20, secrecy: 10, experience: 30 },
          { wealth: 2000, loyalty: -15, experience: 40 },
        ],
      },
      {
        title: 'The Iraq WMD Lie',
        description: 'Fabricate evidence or expose the truth about weapons of mass destruction',
        type: MissionType.KNOWLEDGE,
        difficulty: 3,
        requirements: { knowledge: 20 },
        rewards: { experience: 75, knowledge: 15 },
        choices: [
          'Fabricate evidence - War happens, you get promoted',
          'Leak to press - You\'re vilified as unpatriotic',
          'Blackmail war proponents - Gain leverage over elites',
        ],
        consequences: [
          { influence: 20, secrecy: -15, experience: 75 },
          { influence: -25, secrecy: 20, experience: 50 },
          { power: 10, wealth: 5000, experience: 60 },
        ],
      },
      {
        title: 'The Afghanistan Opium Trade',
        description: 'Protect or eradicate the opium trade funding black operations',
        type: MissionType.RESOURCE,
        difficulty: 2,
        requirements: { power: 15 },
        rewards: { experience: 40, wealth: 1000 },
        choices: [
          'Protect the trade - Fund operations but destroy communities',
          'Eradicate opium - Lose warlords\' support',
          'Tax the trade - Become wealthy but contribute to addiction',
        ],
        consequences: [
          { wealth: 3000, secrecy: -5, experience: 40 },
          { influence: -10, loyalty: 10, experience: 25 },
          { wealth: 5000, loyalty: -10, experience: 35 },
        ],
      },
      {
        title: 'The Ukraine Provocation',
        description: 'Push for NATO expansion knowing it will provoke Russia',
        type: MissionType.INFLUENCE,
        difficulty: 4,
        requirements: { influence: 40 },
        rewards: { experience: 100, influence: 20 },
        choices: [
          'Push NATO expansion - Weaken Russia and Germany',
          'Warn about consequences - You\'re called a Russian agent',
          'Profit from the war - Military stocks soar',
        ],
        consequences: [
          { influence: 25, power: 15, experience: 100 },
          { influence: -30, secrecy: 15, experience: 60 },
          { wealth: 10000, loyalty: -20, experience: 80 },
        ],
      },
      {
        title: 'The Great Reset',
        description: 'Implement or resist the global governance agenda using COVID',
        type: MissionType.KNOWLEDGE,
        difficulty: 3,
        requirements: { knowledge: 25 },
        rewards: { experience: 80, knowledge: 20 },
        choices: [
          'Implement the agenda - Digital currency and surveillance',
          'Leak the plans - You\'re banned from social media',
          'Profit from the transition - Buy foreclosed properties',
        ],
        consequences: [
          { power: 20, influence: 15, experience: 80 },
          { influence: -20, secrecy: 25, experience: 55 },
          { wealth: 15000, loyalty: -15, experience: 70 },
        ],
      },
    ];

    for (const missionData of missions) {
      const existing = await this.missionRepository.findOne({
        where: { title: missionData.title },
      });
      if (!existing) {
        await this.missionRepository.save(missionData);
      }
    }
  }

  async startGame() {
    await this.initializeGame();

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your character name:',
        validate: (input) => input.length > 0,
      },
      {
        type: 'list',
        name: 'background',
        message: 'Choose your background:',
        choices: Object.values(PlayerBackground),
      },
    ]);

    const player = await this.createNewPlayer(
      answers.name,
      answers.background as PlayerBackground,
    );

    console.log(`\nWelcome, ${player.name}! You are now an ${player.rank} in the Illuminati.\n`);

    await this.mainGameLoop(player.id);
  }

  async continueGame(playerId: number) {
    const player = await this.getPlayerById(playerId);
    if (!player) {
      console.log('Player not found!');
      return;
    }

    await this.mainGameLoop(playerId);
  }

  displayPlayerStats(player: Player) {
    console.log(chalk.blue('╔════════════════════════════════════════════════════════╗'));
    console.log(chalk.blue(`║ ${player.name} - ${player.rank} (Turn: ${player.turn})`));
    console.log(chalk.blue('╠════════════════════════════════════════════════════════╣'));
    console.log(chalk.blue(`║ 🎭 Influence: ${player.influence}  💰 Wealth: ${player.wealth.toLocaleString()}`));
    console.log(chalk.blue(`║ 📚 Knowledge: ${player.knowledge}  ⚡ Power: ${player.power}`));
    console.log(chalk.blue(`║ 🔒 Secrecy: ${player.secrecy}  🤝 Loyalty: ${player.loyalty}`));
    console.log(chalk.blue('╚════════════════════════════════════════════════════════╝'));
  }

  private async mainGameLoop(playerId: number) {
    let running = true;

    while (running) {
      const player = await this.getPlayerById(playerId);
      this.displayPlayerStats(player);

      const missions = await this.getAvailableMissions(playerId);

      const choices = [
        'View Available Missions',
        'Check Current Missions',
        'Manage Resources',
        'View World State',
        'Save and Quit',
      ];

      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices,
        },
      ]);

      switch (answer.action) {
        case 'View Available Missions':
          await this.handleMissions(playerId, missions);
          break;
        case 'Check Current Missions':
          // Handle current missions
          console.log('Current missions functionality not implemented yet');
          break;
        case 'Manage Resources':
          // Handle resource management
          console.log('Resource management not implemented yet');
          break;
        case 'View World State':
          // Handle world state
          console.log('World state view not implemented yet');
          break;
        case 'Save and Quit':
          running = false;
          console.log('Game saved. Goodbye!');
          break;
      }
    }
  }

  private async handleMissions(playerId: number, missions: any[]) {
    if (missions.length === 0) {
      console.log('No missions available at this time.');
      return;
    }

    const missionChoices = missions.map(m => ({
      name: `${m.title} (${m.type}) - Difficulty: ${m.difficulty}`,
      value: m.id,
    }));
    missionChoices.push({ name: 'Back to main menu', value: 'back' });

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'missionId',
        message: 'Choose a mission:',
        choices: missionChoices,
      },
    ]);

    if (answer.missionId === 'back') return;

    const mission = missions.find(m => m.id === answer.missionId);
    console.log(`\n${mission.title}`);
    console.log(`${mission.description}\n`);

    if (mission.choices && mission.choices.length > 0) {
      const choiceAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What do you choose?',
          choices: mission.choices.map((choice, index) => ({
            name: choice,
            value: index,
          })),
        },
      ]);

      await this.startMission(playerId, mission.id);
      await this.completeMission(playerId, mission.id, choiceAnswer.choice);

      console.log('Mission completed!\n');
    }
  }
}