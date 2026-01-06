import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player, PlayerRank, PlayerBackground } from './entities/player.entity';
import { Mission, MissionType, MissionStatus } from './entities/mission.entity';
import { Faction, FactionType } from './entities/faction.entity';
import * as chalk from 'chalk';
import * as figlet from 'figlet';
import inquirer from 'inquirer';

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

  private applyConsequences(player: Player, consequences: Partial<Record<keyof Player, number>>) {
    if (consequences.influence !== undefined) player.influence += consequences.influence;
    if (consequences.wealth !== undefined) player.wealth += consequences.wealth;
    if (consequences.knowledge !== undefined) player.knowledge += consequences.knowledge;
    if (consequences.power !== undefined) player.power += consequences.power;
    if (consequences.secrecy !== undefined) player.secrecy += consequences.secrecy;
    if (consequences.loyalty !== undefined) player.loyalty += consequences.loyalty;
    if (consequences.experience !== undefined) player.experience += consequences.experience;

    // Ensure stats don't go below 0 or above 100
    const numericKeys: (keyof Player)[] = ['influence', 'wealth', 'knowledge', 'power', 'secrecy', 'loyalty', 'charisma', 'intelligence', 'cunning', 'willpower', 'stealth'];
    numericKeys.forEach(key => {
      if (consequences[key] !== undefined && typeof (player as any)[key] === 'number') {
        (player as any)[key] = Math.max(0, Math.min(100, (player as any)[key]));
      }
    });
  }

  private applyRewards(player: Player, rewards: Partial<Record<keyof Player, number>>) {
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
        title: 'Venezuela Saga: The 2002 Coup',
        description: 'PART 1: Chavez is kidnapped by business-military alliance. US recognizes coup government immediately.',
        type: MissionType.INFLUENCE,
        difficulty: 3,
        requirements: { influence: 35 },
        rewards: { experience: 60, influence: 15 },
        choices: [
          'Support the coup - Bribe generals, fund opposition media',
          'Warn Chavez - Prevent dictatorship but get fired',
          'Play both sides - Neither trusts you, but you gain wealth',
        ],
        consequences: [
          { influence: 20, secrecy: -10, experience: 60 },
          { influence: -25, secrecy: 15, experience: 40 },
          { wealth: 3000, loyalty: -20, experience: 50 },
        ],
      },
      {
        title: 'Venezuela Saga: Economic Warfare',
        description: 'PART 2: Oil prices crash, US imposes sanctions. Opposition protests erupt.',
        type: MissionType.RESOURCE,
        difficulty: 4,
        requirements: { influence: 40, wealth: 5000 },
        rewards: { experience: 85, wealth: 5000 },
        choices: [
          'Impose crippling sanctions - Economy collapses, Maduro stays',
          'Fund Guaidó protests - He never controls territory',
          'Negotiate oil deals - Sanctions relief in exchange for concessions',
        ],
        consequences: [
          { influence: 25, power: 10, experience: 85 },
          { influence: 15, secrecy: -5, experience: 70 },
          { wealth: 10000, influence: 10, experience: 75 },
        ],
      },
      {
        title: 'Venezuela Saga: The Abduction Attempt',
        description: 'PART 3: July 2024 - Maduro\'s plane disappears. US special forces attempt abduction.',
        type: MissionType.INFLUENCE,
        difficulty: 5,
        requirements: { influence: 50, power: 20 },
        rewards: { experience: 120, power: 15 },
        choices: [
          'Execute the abduction - Venezuela becomes US client state',
          'Leak the operation - Maduro becomes full dictator',
          'Create false narrative - "Maduro defected willingly"',
          'Blackmail Maduro - He opens oil to US companies',
        ],
        consequences: [
          { influence: 30, power: 20, secrecy: -20, experience: 120 },
          { influence: -40, secrecy: 25, experience: 80 },
          { influence: 15, secrecy: -10, experience: 90 },
          { wealth: 25000, influence: 20, experience: 100 },
        ],
      },
      {
        title: 'Venezuela Saga: The Aftermath',
        description: 'PART 4: Consequences of your choices unfold. Chaos or control?',
        type: MissionType.KNOWLEDGE,
        difficulty: 4,
        requirements: { knowledge: 35 },
        rewards: { experience: 100, knowledge: 20 },
        choices: [
          'Support US occupation - Extract resources, build bases',
          'Aid Madurista resistance - Prolong insurgency',
          'Negotiate with Russia/China - Balance of power',
        ],
        consequences: [
          { power: 25, wealth: 15000, experience: 100 },
          { influence: -15, loyalty: 15, experience: 85 },
          { influence: 20, knowledge: 20, experience: 95 },
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
      
      // Check for game endings
      const ending = this.checkForEnding(player);
      if (ending) {
        await this.displayEnding(ending, player);
        running = false;
        break;
      }

      this.displayPlayerStats(player);

      const missions = await this.getAvailableMissions(playerId);

      const choices = [
        'View Available Missions',
        'Check Current Missions',
        'Manage Resources',
        'View World State',
        'Help & Tutorial',
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
          await this.checkCurrentMissions(playerId);
          break;
        case 'Manage Resources':
          await this.manageResources(playerId);
          break;
        case 'View World State':
          await this.viewWorldState();
          break;
        case 'Help & Tutorial':
          await this.showHelp();
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
    
    // Display mission with better formatting
    console.clear();
    console.log(chalk.red('╔' + '═'.repeat(60) + '╗'));
    console.log(chalk.red('║') + chalk.yellow(figlet.textSync('MISSION', { horizontalLayout: 'fitted', width: 58 })) + chalk.red('║'));
    console.log(chalk.red('╚' + '═'.repeat(60) + '╝'));
    console.log('');
    
    console.log(chalk.cyan(`🎯 ${mission.title}`));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(mission.description));
    console.log('');
    console.log(chalk.green(`Type: ${mission.type} | Difficulty: ${mission.difficulty}`));
    console.log(chalk.blue(`Requirements: ${JSON.stringify(mission.requirements)}`));
    console.log(chalk.yellow(`Rewards: ${JSON.stringify(mission.rewards)}`));
    console.log('');

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

  private checkForEnding(player: Player): string | null {
    // Check for "The Reveal" ending - High secrecy, low influence
    if (player.secrecy >= 80 && player.influence <= 20) {
      return 'reveal';
    }

    // Check for "The Reform" ending - High influence, moderate power
    if (player.influence >= 70 && player.power >= 50 && player.loyalty >= 60) {
      return 'reform';
    }

    // Check for "The Join" ending - High power, wealth, but low loyalty
    if (player.power >= 80 && player.wealth >= 50000 && player.loyalty <= 30) {
      return 'join';
    }

    // Check for bad endings
    if (player.secrecy <= 10) {
      return 'exposed';
    }

    if (player.influence <= 5) {
      return 'failed';
    }

    return null;
  }

  private async displayEnding(ending: string, player: Player) {
    console.clear();
    console.log(chalk.red(figlet.textSync('GAME OVER', { horizontalLayout: 'full' })));
    console.log('');

    switch (ending) {
      case 'reveal':
        console.log(chalk.yellow('🎭 THE REVEAL 🎭'));
        console.log('');
        console.log('You have exposed the entire conspiracy to the world.');
        console.log('Documents leaked, secrets revealed, the Network\'s plans laid bare.');
        console.log('');
        console.log(chalk.red('But the system protects itself. You are assassinated within 48 hours.'));
        console.log('');
        console.log(chalk.cyan('Legacy: 50 years later, historians confirm you were right.'));
        console.log(chalk.cyan('Lesson: The system protects itself at all costs.'));
        break;

      case 'reform':
        console.log(chalk.blue('⚖️ THE REFORM ⚖️'));
        console.log('');
        console.log('You work within the system to implement reforms.');
        console.log('Emergency powers used to dismantle the deep state.');
        console.log('Arrests made, audits conducted, foreign wars ended.');
        console.log('');
        console.log(chalk.red('But the economy collapses. The media calls you dictator.'));
        console.log(chalk.red('CIA stages a color revolution against you.'));
        console.log('');
        console.log(chalk.cyan('Lesson: The system won\'t allow itself to be reformed.'));
        break;

      case 'join':
        console.log(chalk.yellow('👑 THE JOIN 👑'));
        console.log('');
        console.log('You become part of the conspiracy.');
        console.log('Blackmail, alliances, climbing the ranks to the Inner Circle.');
        console.log('Immense wealth and power, but at the cost of your humanity.');
        console.log('');
        console.log(chalk.red('Final Choice: Sacrifice your soul for power?'));
        console.log('');
        console.log(chalk.cyan('Lesson: Power corrupts; absolute power corrupts absolutely.'));
        break;

      case 'exposed':
        console.log(chalk.red('🚨 EXPOSED 🚨'));
        console.log('');
        console.log('Your secrecy has been compromised.');
        console.log('The media frenzy begins. Investigations launched.');
        console.log('You are hunted by your former allies.');
        console.log('');
        console.log(chalk.red('Bad Ending: The game ends here.'));
        break;

      case 'failed':
        console.log(chalk.red('💀 FAILED 💀'));
        console.log('');
        console.log('You have lost all influence and power.');
        console.log('No one listens to you anymore.');
        console.log('The conspiracy continues without you.');
        console.log('');
        console.log(chalk.red('Bad Ending: The game ends here.'));
        break;
    }

    console.log('');
    console.log(chalk.green(`Final Stats - ${player.name}:`));
    console.log(`🎭 Influence: ${player.influence}  💰 Wealth: ${player.wealth.toLocaleString()}`);
    console.log(`📚 Knowledge: ${player.knowledge}  ⚡ Power: ${player.power}`);
    console.log(`🔒 Secrecy: ${player.secrecy}  🤝 Loyalty: ${player.loyalty}`);
    console.log(`🏆 Experience: ${player.experience}  📊 Rank: ${player.rank}`);

    console.log('');
    console.log(chalk.yellow('Thank you for playing "Puppet Masters"!'));
    console.log(chalk.cyan('The ultimate question: Can one person change anything?'));
  }

  private async viewWorldState() {
    console.clear();
    console.log(chalk.cyan(figlet.textSync('WORLD STATE', { horizontalLayout: 'full' })));
    console.log('');

    const factions = await this.factionRepository.find();

    console.log(chalk.yellow('🌍 GLOBAL FACTION STATUS 🌍'));
    console.log('');

    for (const faction of factions) {
      const influenceBar = '█'.repeat(Math.floor(faction.influence / 10)) + '░'.repeat(10 - Math.floor(faction.influence / 10));
      const powerBar = '█'.repeat(Math.floor(faction.power / 10)) + '░'.repeat(10 - Math.floor(faction.power / 10));
      const stabilityBar = '█'.repeat(Math.floor(faction.stability / 10)) + '░'.repeat(10 - Math.floor(faction.stability / 10));

      console.log(chalk.blue(`🏛️ ${faction.name}`));
      console.log(chalk.gray(`   ${faction.description}`));
      console.log(chalk.green(`   🎭 Influence: ${influenceBar} ${faction.influence}/100`));
      console.log(chalk.red(`   ⚡ Power: ${powerBar} ${faction.power}/100`));
      console.log(chalk.yellow(`   🛡️ Stability: ${stabilityBar} ${faction.stability}/100`));
      console.log('');
    }

    console.log(chalk.magenta('🎯 CURRENT GLOBAL EVENTS:'));
    console.log('• US-China trade war intensifying');
    console.log('• Middle East conflicts escalating');
    console.log('• European energy crisis deepening');
    console.log('• Global debt reaching unsustainable levels');
    console.log('');

    await inquirer.prompt([{
      type: 'input',
      name: 'continue',
      message: 'Press Enter to return to main menu...',
    }]);
  }

  private async manageResources(playerId: number) {
    const player = await this.getPlayerById(playerId);

    console.clear();
    console.log(chalk.cyan(figlet.textSync('RESOURCES', { horizontalLayout: 'full' })));
    console.log('');

    console.log(chalk.yellow('📊 DETAILED RESOURCE BREAKDOWN 📊'));
    console.log('');

    // Display detailed stats
    console.log(chalk.blue('🎭 INFLUENCE - Political power and social standing'));
    console.log(`   Current: ${player.influence}/100`);
    console.log(`   Description: Your ability to sway governments and media`);
    console.log('');

    console.log(chalk.green('💰 WEALTH - Money and financial assets'));
    console.log(`   Current: $${player.wealth.toLocaleString()}`);
    console.log(`   Description: Funding for operations and bribes`);
    console.log('');

    console.log(chalk.magenta('📚 KNOWLEDGE - Secret information and research'));
    console.log(`   Current: ${player.knowledge}/100`);
    console.log(`   Description: Access to classified documents and technologies`);
    console.log('');

    console.log(chalk.red('⚡ POWER - Direct control and military strength'));
    console.log(`   Current: ${player.power}/100`);
    console.log(`   Description: Private armies, intelligence networks, enforcement`);
    console.log('');

    console.log(chalk.gray('🔒 SECRECY - How hidden your operations are'));
    console.log(`   Current: ${player.secrecy}/100`);
    console.log(`   Description: Risk of exposure and assassination`);
    console.log('');

    console.log(chalk.cyan('🤝 LOYALTY - Trust from followers and allies'));
    console.log(`   Current: ${player.loyalty}/100`);
    console.log(`   Description: Reliability of your network`);
    console.log('');

    console.log(chalk.yellow('🏆 PROGRESS'));
    console.log(`   Experience: ${player.experience}`);
    console.log(`   Rank: ${player.rank}`);
    console.log(`   Turn: ${player.turn}`);
    console.log(`   Background: ${player.background}`);
    console.log('');

    // Resource allocation (future feature)
    console.log(chalk.red('💡 TIP: Complete missions to increase your resources!'));
    console.log('');

    await inquirer.prompt([{
      type: 'input',
      name: 'continue',
      message: 'Press Enter to return to main menu...',
    }]);
  }

  private async checkCurrentMissions(playerId: number) {
    const player = await this.getPlayerById(playerId);

    console.clear();
    console.log(chalk.cyan(figlet.textSync('CURRENT MISSIONS', { horizontalLayout: 'full' })));
    console.log('');

    if (!player.missions || player.missions.length === 0) {
      console.log(chalk.yellow('📋 No active missions.'));
      console.log('');
      console.log(chalk.cyan('Complete available missions to unlock new challenges!'));
    } else {
      console.log(chalk.yellow('🎯 ACTIVE MISSIONS 🎯'));
      console.log('');

      for (const mission of player.missions) {
        if (mission.status === MissionStatus.ACTIVE) {
          console.log(chalk.blue(`📜 ${mission.title}`));
          console.log(chalk.gray(`   ${mission.description}`));
          console.log(chalk.green(`   Type: ${mission.type} | Difficulty: ${mission.difficulty}`));
          console.log(chalk.yellow(`   Status: ${mission.status}`));
          console.log('');
        }
      }

      console.log(chalk.yellow('✅ COMPLETED MISSIONS ✅'));
      console.log('');

      for (const mission of player.missions) {
        if (mission.status === MissionStatus.COMPLETED) {
          console.log(chalk.green(`✓ ${mission.title}`));
          console.log(chalk.gray(`   Completed successfully`));
          console.log('');
        }
      }
    }

    console.log('');
    await inquirer.prompt([{
      type: 'input',
      name: 'continue',
      message: 'Press Enter to return to main menu...',
    }]);
  }

  private async showHelp() {
    console.clear();
    console.log(chalk.cyan(figlet.textSync('HELP', { horizontalLayout: 'full' })));
    console.log('');

    console.log(chalk.yellow('📚 GAME TUTORIAL 📚'));
    console.log('');

    console.log(chalk.blue('🎯 OBJECTIVE:'));
    console.log('Rise through the ranks of the Illuminati by completing missions,');
    console.log('managing resources, and uncovering global conspiracies.');
    console.log('');

    console.log(chalk.green('🎭 RESOURCES:'));
    console.log('• 🎭 Influence: Political power and social standing');
    console.log('• 💰 Wealth: Money for operations and bribes');
    console.log('• 📚 Knowledge: Secret information and research');
    console.log('• ⚡ Power: Direct control and military strength');
    console.log('• 🔒 Secrecy: How hidden your operations are');
    console.log('• 🤝 Loyalty: Trust from followers and allies');
    console.log('');

    console.log(chalk.red('📜 MISSIONS:'));
    console.log('• Choose from available missions based on your current resources');
    console.log('• Each mission has multiple choices with different consequences');
    console.log('• Success grants rewards and advances your conspiracy knowledge');
    console.log('');

    console.log(chalk.magenta('🌍 WORLD STATE:'));
    console.log('• View current status of global factions');
    console.log('• Monitor influence, power, and stability of world powers');
    console.log('• Stay aware of global events and conflicts');
    console.log('');

    console.log(chalk.cyan('🏆 PROGRESSION:'));
    console.log('• Gain experience from completed missions');
    console.log('• Advance through ranks: Initiate → Apprentice → Keeper → Master → Council Member → Grand Master → Illuminatus');
    console.log('• Unlock new missions and abilities as you progress');
    console.log('');

    console.log(chalk.yellow('💀 ENDINGS:'));
    console.log('• The Reveal: Expose everything (dangerous)');
    console.log('• The Reform: Change the system from within');
    console.log('• The Join: Become part of the conspiracy');
    console.log('• Bad endings: Get exposed or fail completely');
    console.log('');

    console.log(chalk.red('⚠️ WARNING:'));
    console.log('This game explores conspiracy theories as fiction.');
    console.log('Research real events independently to form your own conclusions.');
    console.log('');

    await inquirer.prompt([{
      type: 'input',
      name: 'continue',
      message: 'Press Enter to return to main menu...',
    }]);
  }
}