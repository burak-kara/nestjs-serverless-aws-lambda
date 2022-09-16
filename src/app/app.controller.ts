import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Redirect',
    description: 'Redirect to the health check endpoint',
  })
  @Redirect('health-check', 301)
  redirect() {}

  @Get('health-check')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Check if the service is up and running',
  })
  @HttpCode(HttpStatus.OK)
  healthCheck(): string {
    return 'Up & running';
  }
}
