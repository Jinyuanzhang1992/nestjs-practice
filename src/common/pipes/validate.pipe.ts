import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('开始验证');
    if (!value) {
      throw new BadRequestException('Validation failed: No body submitted');
    }

    if (value instanceof Object && this.isEmpty(value)) {
      throw new BadRequestException('Validation failed: No body submitted');
    }

    return value;
  }

  private isEmpty(value: any) {
    return Object.keys(value).length < 1;
  }
}
