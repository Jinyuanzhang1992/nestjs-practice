import { Module } from '@nestjs/common';
import { ValidatePipe } from './pipes/validate.pipe';

@Module({
  providers: [ValidatePipe],
  exports: [ValidatePipe],
})
export class CommonModule {}
