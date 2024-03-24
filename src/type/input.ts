import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString } from 'class-validator';

/**
 * ソート順を指定するためのクラス
 */
export class SortOrderInput {
  @IsString()
  @ApiProperty({
    description: 'ソートキー',
    example: 'createdAt',
    required: false,
  })
  key: string;

  @IsIn(['asc', 'desc'])
  @ApiProperty({ description: 'asc | desc', example: 'desc', required: false })
  direction: 'asc' | 'desc';
}

/**
 *ページングを指定するためのクラス
 * ref: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
 */
export class PagenationInput {
  @IsInt()
  @ApiProperty({
    description: 'ここで指定した数値+1番目から取得を開始',
    example: 0,
    required: false,
  })
  skip: number;

  @IsInt()
  @ApiProperty({ description: '取得数', example: 5, required: false })
  take: number;
}

export class IdInput {
  id: number;
}

export class IdOwnerIdInput extends IdInput {
  ownerId: number;
}
