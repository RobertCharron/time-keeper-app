import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ActivityUsesService } from './activity-uses.service';
import { CreateActivityUseDto } from './dto/create-activity-use.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activity-uses')
@UseGuards(JwtAuthGuard)
export class ActivityUsesController {
  constructor(private readonly activityUsesService: ActivityUsesService) {}

  @Post()
  create(@Body() createActivityUseDto: CreateActivityUseDto, @Request() req) {
    return this.activityUsesService.create(createActivityUseDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.activityUsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityUsesService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.activityUsesService.findByUser(+userId);
  }

  @Get('activity/:activityId')
  findByActivity(@Param('activityId') activityId: string) {
    return this.activityUsesService.findByActivity(+activityId);
  }

  @Post(':id/end')
  endActivity(@Param('id') id: string) {
    return this.activityUsesService.endActivity(+id);
  }
}
