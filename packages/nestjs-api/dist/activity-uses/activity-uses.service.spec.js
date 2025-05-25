"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const activity_uses_service_1 = require("./activity-uses.service");
const activity_use_entity_1 = require("./entities/activity-use.entity");
const common_1 = require("@nestjs/common");
describe('ActivityUsesService', () => {
    let service;
    let repository;
    const mockActivityUse = {
        id: 1,
        timeStart: new Date(),
        timeEnd: null,
        isActive: true,
        userId: 1,
        activityId: 1,
        user: { id: 1, name: 'Test User' },
        activity: { id: 1, name: 'Test Activity' },
    };
    const mockRepository = {
        create: jest.fn().mockImplementation((dto) => dto),
        save: jest.fn().mockImplementation((activityUse) => Promise.resolve({ ...activityUse, id: 1 })),
        find: jest.fn().mockResolvedValue([mockActivityUse]),
        findOne: jest.fn().mockResolvedValue(mockActivityUse),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                activity_uses_service_1.ActivityUsesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(activity_use_entity_1.ActivityUse),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(activity_uses_service_1.ActivityUsesService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(activity_use_entity_1.ActivityUse));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new activity use', async () => {
            const createDto = {
                timeStart: new Date(),
                activityId: 1,
            };
            const userId = 1;
            const result = await service.create(createDto, userId);
            expect(repository.create).toHaveBeenCalledWith({
                ...createDto,
                userId,
            });
            expect(repository.save).toHaveBeenCalled();
            expect(result).toHaveProperty('id');
        });
    });
    describe('findAll', () => {
        it('should return an array of activity uses', async () => {
            const result = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith({
                relations: ['user', 'activity'],
            });
            expect(result).toEqual([mockActivityUse]);
        });
    });
    describe('findOne', () => {
        it('should return a single activity use', async () => {
            const result = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
                relations: ['user', 'activity'],
            });
            expect(result).toEqual(mockActivityUse);
        });
        it('should throw NotFoundException if activity use not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
            await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('findByUser', () => {
        it('should return activity uses for a specific user', async () => {
            const result = await service.findByUser(1);
            expect(repository.find).toHaveBeenCalledWith({
                where: { userId: 1 },
                relations: ['user', 'activity'],
            });
            expect(result).toEqual([mockActivityUse]);
        });
    });
    describe('findByActivity', () => {
        it('should return activity uses for a specific activity', async () => {
            const result = await service.findByActivity(1);
            expect(repository.find).toHaveBeenCalledWith({
                where: { activityId: 1 },
                relations: ['user', 'activity'],
            });
            expect(result).toEqual([mockActivityUse]);
        });
    });
    describe('endActivity', () => {
        it('should set timeEnd for an activity use', async () => {
            const result = await service.endActivity(1);
            expect(repository.findOne).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalledWith({
                ...mockActivityUse,
                timeEnd: expect.any(Date),
            });
            expect(result.timeEnd).toBeDefined();
        });
        it('should throw NotFoundException if activity use not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
            await expect(service.endActivity(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=activity-uses.service.spec.js.map