import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityUse } from './entities/activity-use.entity';
import { CreateActivityUseDto } from './dto/create-activity-use.dto';

@Injectable()
export class ActivityUsesService {
  constructor(
    @InjectRepository(ActivityUse)
    private activityUsesRepository: Repository<ActivityUse>,
  ) {}

  async create(createActivityUseDto: CreateActivityUseDto, userId: number): Promise<ActivityUse> {
    const activityUse = this.activityUsesRepository.create({
      ...createActivityUseDto,
      userId,
    });
    return this.activityUsesRepository.save(activityUse);
  }

  async findAll(): Promise<ActivityUse[]> {
    return this.activityUsesRepository.find({
      relations: ['user', 'activity'],
    });
  }

  async findOne(id: number): Promise<ActivityUse> {
    const activityUse = await this.activityUsesRepository.findOne({
      where: { id },
      relations: ['user', 'activity'],
    });
    if (!activityUse) {
      throw new NotFoundException(`ActivityUse with ID ${id} not found`);
    }
    return activityUse;
  }

  async findByUser(userId: number): Promise<ActivityUse[]> {
    return this.activityUsesRepository.find({
      where: { userId },
      relations: ['user', 'activity'],
    });
  }

  async findByActivity(activityId: number): Promise<ActivityUse[]> {
    return this.activityUsesRepository.find({
      where: { activityId },
      relations: ['user', 'activity'],
    });
  }

  async endActivity(id: number): Promise<ActivityUse> {
    const activityUse = await this.findOne(id);
    activityUse.timeEnd = new Date();
    return this.activityUsesRepository.save(activityUse);
  }
}
