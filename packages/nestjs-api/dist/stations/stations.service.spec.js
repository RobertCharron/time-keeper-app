"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const stations_service_1 = require("./stations.service");
const station_entity_1 = require("./entities/station.entity");
const common_1 = require("@nestjs/common");
describe('StationsService', () => {
    let service;
    let repository;
    const mockStation = {
        id: 1,
        name: 'Test Station',
        isActive: true,
        activities: [
            { id: 1, name: 'Test Activity' }
        ],
    };
    const mockRepository = {
        create: jest.fn().mockImplementation(dto => dto),
        save: jest.fn().mockImplementation(station => Promise.resolve({ ...station, id: 1 })),
        find: jest.fn().mockResolvedValue([mockStation]),
        findOne: jest.fn().mockResolvedValue(mockStation),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                stations_service_1.StationsService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(station_entity_1.Station),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(stations_service_1.StationsService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(station_entity_1.Station));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new station', async () => {
            const createDto = {
                name: 'New Station',
            };
            const result = await service.create(createDto);
            expect(repository.create).toHaveBeenCalledWith(createDto);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toHaveProperty('id');
        });
    });
    describe('findAll', () => {
        it('should return an array of stations', async () => {
            const result = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith({
                relations: ['activities'],
            });
            expect(result).toEqual([mockStation]);
        });
    });
    describe('findOne', () => {
        it('should return a single station', async () => {
            const result = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
                relations: ['activities'],
            });
            expect(result).toEqual(mockStation);
        });
        it('should throw NotFoundException if station not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
            await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=stations.service.spec.js.map