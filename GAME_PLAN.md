# Illuminati CLI Game - Comprehensive Design Plan

## 🎯 Game Concept
A text-based command-line interface game where the player rises through the ranks of a secret society, making strategic decisions, managing resources, and uncovering mysteries.

## 🎮 Core Game Mechanics

### 1. **Progression System**
- **Ranks**: Initiate → Apprentice → Keeper → Master → Council Member → Grand Master → Illuminatus
- **XP System**: Gain experience through completed missions, successful decisions, and discovered secrets
- **Unlockables**: New abilities, contacts, missions, and storylines as you progress

### 2. **Resource Management**
- **Influence** (🎭): Political power, social standing
- **Wealth** (💰): Money, assets, investments
- **Knowledge** (📚): Secret information, technologies
- **Power** (⚡): Direct control over people/institutions
- **Secrecy** (🔒): Must maintain to avoid exposure
- **Loyalty** (🤝): Follower trust and commitment

### 3. **Core Gameplay Loop**
```
Accept Mission → Make Choices → Manage Resources → Face Consequences → Unlock Content → Repeat
```

## 🌍 Game World

### **Secret Society Hierarchy**
```
The Illuminati (Inner Circle)
    ↓
The Council (13 members)
    ↓
The Masters (Regional leaders)
    ↓
The Keepers (Cell leaders)
    ↓
The Apprentices (Proven members)
    ↓
The Initiates (New members)
```

### **Factions Within the Society**
1. **The Guardians** - Focus on tradition and secrecy
2. **The Visionaries** - Push for technological advancement
3. **The Strategists** - Emphasize political and economic control
4. **The Mystics** - Pursue occult knowledge and rituals

### **External Organizations**
- Governments and intelligence agencies
- Rival secret societies
- Corporations and banks
- Media organizations
- Religious institutions

## 👤 Player Character

### **Attributes (0-100)**
- **Charisma**: Ability to persuade and lead
- **Intelligence**: Problem-solving and learning
- **Cunning**: Deception and strategy
- **Willpower**: Mental resistance and determination
- **Stealth**: Ability to act undetected

### **Skills (0-10)**
- **Manipulation**: Social engineering
- **Investigation**: Information gathering
- **Combat**: Physical confrontation
- **Technology**: Hacking and gadgets
- **Occult**: Ritual and supernatural knowledge
- **Finance**: Money management
- **Leadership**: Managing followers

### **Backgrounds (Choose at start)**
- **Corporate Executive**: High wealth, business connections
- **Intelligence Officer**: High cunning, investigation skills
- **Academic**: High intelligence, knowledge
- **Criminal**: High stealth, street connections
- **Politician**: High charisma, influence
- **Occultist**: High willpower, occult knowledge

## 📜 Mission Types

### 1. **Recruitment Missions**
- Identify and recruit potential members
- Perform initiation rituals
- Test loyalty of new members

### 2. **Infiltration Missions**
- Place members in key positions
- Steal information or technology
- Sabotage rival operations

### 3. **Influence Missions**
- Manipulate political decisions
- Control media narratives
- Direct corporate actions

### 4. **Resource Missions**
- Acquire funding or assets
- Secure rare materials
- Build infrastructure

### 5. **Knowledge Missions**
- Discover ancient secrets
- Research technologies
- Unlock occult powers

### 6. **Crisis Missions**
- Cover up exposure
- Eliminate threats
- Manage internal conflicts

## 🎲 Decision System

### **Choice Types**
1. **Binary Choices**: Simple yes/no decisions
2. **Multiple Choice**: 3-4 options with different outcomes
3. **Timed Decisions**: Must choose within limited turns
4. **Resource Allocation**: Distribute limited resources
5. **Risk Assessment**: Choose between safe/risky options

### **Consequence Types**
- **Immediate**: Direct results of actions
- **Delayed**: Effects that manifest later
- **Cascading**: Chain reactions
- **Hidden**: Unknown consequences revealed later
- **Moral**: Impact on story and relationships

## 🔍 Special Features

### 1. **Investigation System**
- Gather clues and information
- Connect dots between events
- Uncover conspiracy layers
- Discover secret plots

### 2. **Relationship System**
- Build alliances with NPCs
- Manage rivalries
- Recruit followers
- Handle betrayals

### 3. **Event System**
- Random events each turn
- World events affecting gameplay
- Crisis situations
- Opportunity events

### 4. **Secret Discovery**
- Hidden lore and backstory
- True goals of the Illuminati
- Alternative endings based on discoveries
- Unlockable content through exploration

### 5. **Perk System**
- Gain special abilities
- Unlock unique options
- Passive bonuses
- Active powers

## 🎯 Victory Conditions

### **Multiple Endings**
1. **Grand Master Ending**: Reach the top of the hierarchy
2. **Reformer Ending**: Change the society from within
3. **Destroyer Ending**: Bring down the organization
4. **Independent Ending**: Break away and form your own faction
5. **Enlightened Ending**: Discover the ultimate truth
6. **Exposed Ending**: Fail and get exposed (bad ending)
7. **Killed Ending**: Die in the line of duty (bad ending)

## 🖥️ Technical Architecture

### **Technology Stack**
```
Language: Python 3.9+
Framework: Custom CLI framework
Libraries:
  - rich: Terminal formatting and UI
  - textwrap: Text formatting
  - json: Save/load system
  - random: RNG
  - datetime: Time tracking
```

### **Project Structure**
```
iluminati-cli-game/
├── main.py                 # Entry point
├── config.py              # Configuration
├── requirements.txt       # Dependencies
├── README.md             # Documentation
├── src/
│   ├── __init__.py
│   ├── game/             # Core game logic
│   │   ├── engine.py     # Game engine
│   │   ├── state.py      # Game state
│   │   └── events.py     # Event system
│   ├── player/           # Player systems
│   │   ├── character.py  # Player character
│   │   ├── skills.py     # Skill system
│   │   └── inventory.py  # Resources & items
│   ├── world/            # Game world
│   │   ├── factions.py   # Faction data
│   │   ├── npcs.py       # NPC system
│   │   └── locations.py  # Locations
│   ├── missions/         # Mission system
│   │   ├── mission.py    # Mission base
│   │   ├── missions.py   # Mission definitions
│   │   └── objectives.py # Objectives system
│   ├── ui/               # User interface
│   │   ├── display.py    # Display functions
│   │   ├── menus.py      # Menu system
│   │   └── input.py      # Input handling
│   ├── data/             # Game data
│   │   ├── story.py      # Story data
│   │   ├── events.json   # Event database
│   │   └── missions.json # Mission database
│   └── utils/            # Utilities
│       ├── save.py       # Save/load system
│       ├── rng.py        # Random number generation
│       └── logger.py     # Logging
└── tests/                # Unit tests
```

### **Core Systems**

#### **Game Engine** ([src/game/engine.py](src/game/engine.py))
```python
- Main game loop
- State management
- Event processing
- Turn system
- Difficulty scaling
```

#### **Display System** ([src/ui/display.py](src/ui/display.py))
```python
- ASCII art and symbols
- Colored text
- Layouts (panels, headers, borders)
- Progress bars
- Animated effects
- Terminal size detection
```

#### **Input System** ([src/ui/input.py](src/ui/input.py))
```python
- Command parsing
- Menu selection
- Confirmation prompts
- Text input
- Hotkey system
```

#### **Save System** ([src/utils/save.py](src/utils/save.py))
```python
- Save slots (multiple)
- Auto-save
- Export/import saves
- Save validation
```

## 🎨 UI/UX Design

### **Main Menu**
```
╔════════════════════════════════════════╗
║         🕯️ ILLUMINATI 🕯️              ║
║        A CLI Adventure Game            ║
╠════════════════════════════════════════╣
║                                        ║
║  1. New Game                           ║
║  2. Continue                           ║
║  3. Settings                           ║
║  4. Credits                            ║
║  5. Quit                               ║
║                                        ║
╚════════════════════════════════════════╝
```

### **HUD Layout**
```
╔════════════════════════════════════════════════════════╗
║ Initiate | Turn: 47 | Date: 2024.03.15                ║
╠════════════════════════════════════════════════════════╣
║ 🎭: 45  💰: 120K  📚: 23  ⚡: 12  🔒: 78  🤝: 56      ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Main story and events display here...                 ║
║                                                        ║
║  [Choices and options appear below]                    ║
║                                                        ║
╠════════════════════════════════════════════════════════╣
║ [1] Investigate  [2] Recruit  [3] Manage  [4] Rest    ║
╚════════════════════════════════════════════════════════╝
```

### **Color Scheme**
- **Purple/Blue**: Mystery, Illuminati themes
- **Gold**: Wealth, success
- **Red**: Danger, alerts
- **Green**: Success, positive outcomes
- **Gray**: Neutral information

## 📊 Progression Balancing

### **Difficulty Scaling**
- Missions scale with player level
- Consequences become more severe
- Resources harder to acquire
- Moral choices more complex

### **Resource Curve**
- Early: Limited resources, strategic choices matter
- Mid: More options, but more demands
- Late: Resource management becomes critical

## 🎵 Audio & Atmosphere (Optional)

### **Sound Effects**
- Typing sounds for text
- Alert chimes
- Success/failure sounds
- Ambient background (optional)

### **Visual Effects**
- Typing animation for text
- Fading effects
- Screen shake (critical moments)
- Color transitions

## 📝 Story Structure

### **Act 1: Initiation** (Turns 1-50)
- Join the Illuminati
- Learn basic mechanics
- Complete first missions
- Choose initial specialization

### **Act 2: Rise to Power** (Turns 51-150)
- Build power base
- Make important allies
- Face first major crisis
- Choose primary faction

### **Act 3: Inner Circle** (Turns 151-250)
- High-stakes missions
- Political maneuvering
- Uncover major secrets
- Face critical choices

### **Act 4: Revelation** (Turns 251+)
- Discover ultimate truth
- Make final choices
- Determine ending
- Face consequences

## 🔐 Secrets & Mysteries

### **Layer 1: Surface Level**
- Illuminati controls world events
- Members in powerful positions
- Goal: Global control

### **Layer 2: Deeper Truth**
- Internal power struggles
- Different agendas within
- External threats to the organization

### **Layer 3: Hidden Knowledge**
- Ancient origins revealed
- True purpose of the society
- Supernatural elements (optional)

### **Layer 4: Ultimate Truth**
- Reality of the conspiracy
- Player's true role
- Multiple interpretations

## 🛠️ Development Phases

### **Phase 1: Foundation** (Core systems)
1. Project setup and structure
2. Basic game loop
3. Character creation
4. Resource system
5. Save/load system

### **Phase 2: Content** (Missions and story)
1. Mission framework
2. Event system
3. NPC system
4. Story implementation
5. Multiple endings

### **Phase 3: Polish** (UI and UX)
1. Rich UI implementation
2. Color schemes
3. Input validation
4. Error handling
5. Help system

### **Phase 4: Balance** (Testing and tuning)
1. Playtesting
2. Difficulty balancing
3. Bug fixes
4. Performance optimization
5. User feedback integration

## 🎯 Success Metrics

- **Engagement**: Players want to keep playing
- **Replayability**: Different choices, different outcomes
- **Immersion**: Believable world and story
- **Accessibility**: Easy to learn, hard to master
- **Performance**: Fast load times, responsive

## 📚 Future Expansions (Potential)

1. **Multiplayer**: Compete or cooperate with other players
2. **Editor**: Create custom missions and stories
3. **Factions DLC**: Play as different secret societies
4. **Time Periods**: Historical or future settings
5. **GUI Version**: Visual version of the game
6. **Mobile Port**: Adapted for mobile play

---

## 🚀 Next Steps

1. Review and approve this plan
2. Set up project structure
3. Implement core systems
4. Create initial content
5. Playtest and iterate

**Ready to begin implementation?** Choose a starting point and let's build!
