import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1720608642027 implements MigrationInterface {
  name = 'CreateUserTable1720608642027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 添加 roles 列并提供默认值
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roles" text NOT NULL DEFAULT 'user'`,
    );

    // 移除默认值约束
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
  }
}
