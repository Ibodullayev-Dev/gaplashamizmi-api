import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnreadMessagesService } from './unread_messages.service';
import { CreateUnreadMessageDto } from './dto/create-unread_message.dto';
import { UpdateUnreadMessageDto } from './dto/update-unread_message.dto';

@Controller('unread-messages')
export class UnreadMessagesController {
  constructor(private readonly unreadMessagesService: UnreadMessagesService) {}

  @Post()
  create(@Body() createUnreadMessageDto: CreateUnreadMessageDto) {
    return this.unreadMessagesService.create(createUnreadMessageDto);
  }

  @Get()
  findAll() {
    return this.unreadMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unreadMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnreadMessageDto: UpdateUnreadMessageDto) {
    return this.unreadMessagesService.update(+id, updateUnreadMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unreadMessagesService.remove(+id);
  }
}
