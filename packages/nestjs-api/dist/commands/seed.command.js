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
exports.SeedCommand = void 0;
const nestjs_command_1 = require("nestjs-command");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const initial_seeder_1 = require("../database/seeders/initial.seeder");
let SeedCommand = class SeedCommand {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async seed() {
        try {
            const seeder = new initial_seeder_1.InitialSeeder(this.dataSource);
            await seeder.run();
            console.log('Database seeded successfully');
        }
        catch (error) {
            console.error('Error seeding database:', error);
            process.exit(1);
        }
    }
};
exports.SeedCommand = SeedCommand;
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:initial',
        describe: 'Seed the database with initial data',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedCommand.prototype, "seed", null);
exports.SeedCommand = SeedCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SeedCommand);
//# sourceMappingURL=seed.command.js.map