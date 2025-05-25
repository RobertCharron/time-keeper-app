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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityUsesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_use_entity_1 = require("./entities/activity-use.entity");
let ActivityUsesService = class ActivityUsesService {
    constructor(activityUsesRepository) {
        this.activityUsesRepository = activityUsesRepository;
    }
    async create(createActivityUseDto, userId) {
        const activityUse = this.activityUsesRepository.create({
            ...createActivityUseDto,
            userId,
            timePaused: createActivityUseDto.timePaused || 0,
            totalDuration: createActivityUseDto.totalDuration || 0,
        });
        return this.activityUsesRepository.save(activityUse);
    }
    async findAll() {
        return this.activityUsesRepository.find({
            relations: ['user', 'activity'],
        });
    }
    async findOne(id) {
        const activityUse = await this.activityUsesRepository.findOne({
            where: { id },
            relations: ['user', 'activity'],
        });
        if (!activityUse) {
            throw new common_1.NotFoundException(`ActivityUse with ID ${id} not found`);
        }
        return activityUse;
    }
    async findByUser(userId) {
        return this.activityUsesRepository.find({
            where: { userId },
            relations: ['user', 'activity'],
        });
    }
    async findByActivity(activityId) {
        return this.activityUsesRepository.find({
            where: { activityId },
            relations: ['user', 'activity'],
        });
    }
    async endActivity(id, timePaused, totalDuration) {
        const activityUse = await this.findOne(id);
        activityUse.timeEnd = new Date();
        activityUse.timePaused = timePaused;
        activityUse.totalDuration = totalDuration;
        return this.activityUsesRepository.save(activityUse);
    }
};
exports.ActivityUsesService = ActivityUsesService;
exports.ActivityUsesService = ActivityUsesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_use_entity_1.ActivityUse)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityUsesService);
//# sourceMappingURL=activity-uses.service.js.map