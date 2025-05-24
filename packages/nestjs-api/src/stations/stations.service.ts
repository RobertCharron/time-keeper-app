import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationsRepository: Repository<Station>,
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const station = this.stationsRepository.create(createStationDto);
    return this.stationsRepository.save(station);
  }

  async findAll(): Promise<Station[]> {
    return this.stationsRepository.find({
      relations: ['activities'],
    });
  }

  async findOne(id: number): Promise<Station> {
    const station = await this.stationsRepository.findOne({
      where: { id },
      relations: ['activities'],
    });
    if (!station) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }
    return station;
  }
} 