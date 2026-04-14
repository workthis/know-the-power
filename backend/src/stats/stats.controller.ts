import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Patch('metrics')
  updateMetrics(@Body() createStatDto: CreateStatDto) {
    return this.statsService.updateMetrics(createStatDto);
  }

  @Get('weekly')
  getWeekly() {
    return this.statsService.getWeeklyStats();
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.statsService.findByDate(date);
  }

  //crud upd
  @Get()
  findAll() {
    return this.statsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}