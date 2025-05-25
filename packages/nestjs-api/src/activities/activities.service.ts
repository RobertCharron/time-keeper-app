import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(createActivityDto);
    return this.activitiesRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find({
      relations: ['station'],
    });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({
      where: { id },
      relations: ['station'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async findByStation(stationId: number): Promise<Activity[]> {
    return this.activitiesRepository.find({
      where: { stationId },
      relations: ['station'],
    });
  }
}
