import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationsService } from './stations.service';
import { Station } from './entities/station.entity';
import { NotFoundException } from '@nestjs/common';

describe('StationsService', () => {
  let service: StationsService;
  let repository: Repository<Station>;

  const mockStation = {
    id: 1,
    name: 'Test Station',
    isActive: true,
    activities: [{ id: 1, name: 'Test Activity' }],
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((station) => Promise.resolve({ ...station, id: 1 })),
    find: jest.fn().mockResolvedValue([mockStation]),
    findOne: jest.fn().mockResolvedValue(mockStation),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationsService,
        {
          provide: getRepositoryToken(Station),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StationsService>(StationsService);
    repository = module.get<Repository<Station>>(getRepositoryToken(Station));
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

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
