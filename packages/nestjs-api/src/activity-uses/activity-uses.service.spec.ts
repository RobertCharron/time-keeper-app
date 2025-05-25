import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityUsesService } from './activity-uses.service';
import { ActivityUse } from './entities/activity-use.entity';
import { NotFoundException } from '@nestjs/common';

describe('ActivityUsesService', () => {
  let service: ActivityUsesService;
  let repository: Repository<ActivityUse>;

  const mockActivityUse = {
    id: 1,
    timeStart: new Date(),
    timeEnd: null,
    timePaused: 0,
    totalDuration: 0,
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityUsesService,
        {
          provide: getRepositoryToken(ActivityUse),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ActivityUsesService>(ActivityUsesService);
    repository = module.get<Repository<ActivityUse>>(getRepositoryToken(ActivityUse));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new activity use with default values for timePaused and totalDuration', async () => {
      const createDto = {
        timeStart: new Date(),
        activityId: 1,
      };
      const userId = 1;

      const result = await service.create(createDto, userId);

      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        userId,
        timePaused: 0,
        totalDuration: 0,
      });
      expect(repository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });

    it('should create a new activity use with provided timePaused and totalDuration values', async () => {
      const createDto = {
        timeStart: new Date(),
        activityId: 1,
        timePaused: 5000,
        totalDuration: 10000,
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

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
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
    it('should set timeEnd, timePaused, and totalDuration for an activity use', async () => {
      const timePaused = 5000;
      const totalDuration = 10000;
      const result = await service.endActivity(1, timePaused, totalDuration);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith({
        ...mockActivityUse,
        timeEnd: expect.any(Date),
        timePaused,
        totalDuration,
      });
      expect(result.timeEnd).toBeDefined();
      expect(result.timePaused).toBe(timePaused);
      expect(result.totalDuration).toBe(totalDuration);
    });

    it('should throw NotFoundException if activity use not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.endActivity(999, 0, 0)).rejects.toThrow(NotFoundException);
    });
  });
});
