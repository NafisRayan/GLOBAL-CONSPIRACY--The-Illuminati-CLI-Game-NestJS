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
exports.Mission = exports.MissionStatus = exports.MissionType = void 0;
const typeorm_1 = require("typeorm");
var MissionType;
(function (MissionType) {
    MissionType["RECRUITMENT"] = "Recruitment";
    MissionType["INFILTRATION"] = "Infiltration";
    MissionType["INFLUENCE"] = "Influence";
    MissionType["RESOURCE"] = "Resource";
    MissionType["KNOWLEDGE"] = "Knowledge";
    MissionType["CRISIS"] = "Crisis";
})(MissionType || (exports.MissionType = MissionType = {}));
var MissionStatus;
(function (MissionStatus) {
    MissionStatus["AVAILABLE"] = "Available";
    MissionStatus["ACTIVE"] = "Active";
    MissionStatus["COMPLETED"] = "Completed";
    MissionStatus["FAILED"] = "Failed";
})(MissionStatus || (exports.MissionStatus = MissionStatus = {}));
let Mission = class Mission {
};
exports.Mission = Mission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Mission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Mission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: MissionType,
    }),
    __metadata("design:type", String)
], Mission.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: MissionStatus,
        default: MissionStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Mission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Mission.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Mission.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Mission.prototype, "rewards", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "choices", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "consequences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Player', 'missions'),
    __metadata("design:type", Object)
], Mission.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mission.prototype, "createdAt", void 0);
exports.Mission = Mission = __decorate([
    (0, typeorm_1.Entity)()
], Mission);
//# sourceMappingURL=mission.entity.js.map