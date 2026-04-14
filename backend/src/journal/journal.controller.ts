import { Controller, Get, Param } from '@nestjs/common';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get(':date')
  getJournal(@Param('date') date: string) {
    return this.journalService.getDailyJournal(date);
  }
}