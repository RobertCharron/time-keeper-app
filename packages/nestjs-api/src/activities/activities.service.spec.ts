import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';
import { NotFoundException } from '@nestjs/common';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let repository: Repository<Activity>;

  const mockActivity = {
    id: 1,
    name: 'Test Activity',
    isActive: true,
    stationId: 1,
    station: { id: 1, name: 'Test Station' },
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(activity => Promise.resolve({ ...activity, id: 1 })),
    find: jest.fn().mockResolvedValue([mockActivity]),
    findOne: jest.fn().mockResolvedValue(mockActivity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
    repository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new activity', async () => {
      const createDto = {
        name: 'New Activity',
        stationId: 1,
      };

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['station'],
      });
      expect(result).toEqual([mockActivity]);
    });
  });

  describe('findOne', () => {
    it('should return a single activity', async () => {
      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['station'],
      });
      expect(result).toEqual(mockActivity);
    });

    it('should throw NotFoundException if activity not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByStation', () => {
    it('should return activities for a specific station', async () => {
      const result = await service.findByStation(1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { stationId: 1 },
        relations: ['station'],
      });
      expect(result).toEqual([mockActivity]);
    });
  });
}); 