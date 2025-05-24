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
exports.ActivityUsesController = void 0;
const common_1 = require("@nestjs/common");
const activity_uses_service_1 = require("./activity-uses.service");
const create_activity_use_dto_1 = require("./dto/create-activity-use.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ActivityUsesController = class ActivityUsesController {
    constructor(activityUsesService) {
        this.activityUsesService = activityUsesService;
    }
    create(createActivityUseDto, req) {
        return this.activityUsesService.create(createActivityUseDto, req.user.id);
    }
    findAll() {
        return this.activityUsesService.findAll();
    }
    findOne(id) {
        return this.activityUsesService.findOne(+id);
    }
    findByUser(userId) {
        return this.activityUsesService.findByUser(+userId);
    }
    findByActivity(activityId) {
        return this.activityUsesService.findByActivity(+activityId);
    }
    endActivity(id) {
        return this.activityUsesService.endActivity(+id);
    }
};
exports.ActivityUsesController = ActivityUsesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_use_dto_1.CreateActivityUseDto, Object]),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('activity/:activityId'),
    __param(0, (0, common_1.Param)('activityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "findByActivity", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityUsesController.prototype, "endActivity", null);
exports.ActivityUsesController = ActivityUsesController = __decorate([
    (0, common_1.Controller)('activity-uses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [activity_uses_service_1.ActivityUsesService])
], ActivityUsesController);
//# sourceMappingURL=activity-uses.controller.js.map