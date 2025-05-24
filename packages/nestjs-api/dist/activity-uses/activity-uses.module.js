"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityUsesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_uses_service_1 = require("./activity-uses.service");
const activity_uses_controller_1 = require("./activity-uses.controller");
const activity_use_entity_1 = require("./entities/activity-use.entity");
let ActivityUsesModule = class ActivityUsesModule {
};
exports.ActivityUsesModule = ActivityUsesModule;
exports.ActivityUsesModule = ActivityUsesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([activity_use_entity_1.ActivityUse])],
        controllers: [activity_uses_controller_1.ActivityUsesController],
        providers: [activity_uses_service_1.ActivityUsesService],
        exports: [activity_uses_service_1.ActivityUsesService],
    })
], ActivityUsesModule);
//# sourceMappingURL=activity-uses.module.js.map