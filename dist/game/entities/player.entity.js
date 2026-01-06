"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerBackground = exports.PlayerRank = void 0;
const typeorm_1 = require("typeorm");
const mission_entity_1 = require("./mission.entity");
var PlayerRank;
(function (PlayerRank) {
    PlayerRank["INITIATE"] = "Initiate";
    PlayerRank["APPRENTICE"] = "Apprentice";
    PlayerRank["KEEPER"] = "Keeper";
    PlayerRank["MASTER"] = "Master";
    PlayerRank["COUNCIL_MEMBER"] = "Council Member";
    PlayerRank["GRAND_MASTER"] = "Grand Master";
    PlayerRank["ILLUMINATUS"] = "Illuminatus";
})(PlayerRank || (exports.PlayerRank = PlayerRank = {}));
var PlayerBackground;
(function (PlayerBackground) {
    PlayerBackground["CORPORATE_EXECUTIVE"] = "Corporate Executive";
    PlayerBackground["INTELLIGENCE_OFFICER"] = "Intelligence Officer";
    PlayerBackground["ACADEMIC"] = "Academic";
    PlayerBackground["CRIMINAL"] = "Criminal";
    PlayerBackground["POLITICIAN"] = "Politician";
    PlayerBackground["OCCULTIST"] = "Occultist";
})(PlayerBackground || (exports.PlayerBackground = PlayerBackground = {}));
let Player = class Player {
};
exports.Player = Player;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: PlayerRank,
        default: PlayerRank.INITIATE,
    }),
    __metadata("design:type", String)
], Player.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: PlayerBackground,
    }),
    __metadata("design:type", String)
], Player.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Player.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "influence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1000 }),
    __metadata("design:type", Number)
], Player.prototype, "wealth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], Player.prototype, "knowledge", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 5 }),
    __metadata("design:type", Number)
], Player.prototype, "power", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 80 }),
    __metadata("design:type", Number)
], Player.prototype, "secrecy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "loyalty", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "charisma", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "intelligence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "cunning", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "willpower", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Player.prototype, "stealth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Player.prototype, "turn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Player.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Player.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mission_entity_1.Mission, mission => mission.player),
    __metadata("design:type", Array)
], Player.prototype, "missions", void 0);
exports.Player = Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
//# sourceMappingURL=player.entity.js.map