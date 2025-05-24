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
exports.StationsController = void 0;
const common_1 = require("@nestjs/common");
const stations_service_1 = require("./stations.service");
const create_station_dto_1 = require("./dto/create-station.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let StationsController = class StationsController {
    constructor(stationsService) {
        this.stationsService = stationsService;
    }
    create(createStationDto) {
        return this.stationsService.create(createStationDto);
    }
    findAll() {
        return this.stationsService.findAll();
    }
    findOne(id) {
        return this.stationsService.findOne(+id);
    }
};
exports.StationsController = StationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_station_dto_1.CreateStationDto]),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "findOne", null);
exports.StationsController = StationsController = __decorate([
    (0, common_1.Controller)('stations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stations_service_1.StationsService])
], StationsController);
//# sourceMappingURL=stations.controller.js.map