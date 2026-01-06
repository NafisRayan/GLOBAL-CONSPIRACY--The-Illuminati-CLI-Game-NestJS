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
exports.Faction = exports.FactionType = void 0;
const typeorm_1 = require("typeorm");
var FactionType;
(function (FactionType) {
    FactionType["AMERICAN_EMPIRE"] = "American Empire";
    FactionType["RUSSIAN_BEAR"] = "Russian Bear";
    FactionType["CHINESE_DRAGON"] = "Chinese Dragon";
    FactionType["EUROPEAN_UNION"] = "European Union";
    FactionType["BANKING_CARTEL"] = "Banking Cartel";
    FactionType["MILITARY_INDUSTRIAL_COMPLEX"] = "Military-Industrial Complex";
    FactionType["ISRAEL_LOBBY"] = "Israel Lobby";
    FactionType["SAUDI_UAE_AXIS"] = "Saudi-UAE Axis";
    FactionType["TURKISH_DEEP_STATE"] = "Turkish Deep State";
    FactionType["IRANIAN_MULLAHS"] = "Iranian Mullahs";
    FactionType["INDIAN_HINDUTVA"] = "Indian Hindutva";
    FactionType["TECH_TOTALITARIANS"] = "Tech Totalitarians";
})(FactionType || (exports.FactionType = FactionType = {}));
let Faction = class Faction {
};
exports.Faction = Faction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Faction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Faction.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: FactionType,
    }),
    __metadata("design:type", String)
], Faction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Faction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Faction.prototype, "influence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Faction.prototype, "power", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Faction.prototype, "stability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Faction.prototype, "leaders", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Faction.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Faction.prototype, "conspiracies", void 0);
exports.Faction = Faction = __decorate([
    (0, typeorm_1.Entity)()
], Faction);
//# sourceMappingURL=faction.entity.js.map