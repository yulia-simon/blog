import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';


@Injectable()
export class SlugProvider {
  constructor(private readonly config: ConfigService) { }


  slugify(slug: string): string {
    return slugify(slug, {
      replacement: '-',
      lower: true
    });
  }

  replacement(): string {
    return '-';
  }
}
