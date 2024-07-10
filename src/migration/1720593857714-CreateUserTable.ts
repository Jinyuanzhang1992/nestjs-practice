import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1720593857714 implements MigrationInterface {
  name = 'CreateUserTable1720593857714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 添加临时列用于生成唯一用户名
    await queryRunner.query(
      `ALTER TABLE "user" ADD "temp_username" character varying DEFAULT 'default_username'`,
    );

    // 创建一个临时表来生成唯一的用户名
    await queryRunner.query(
      `
      CREATE TEMPORARY TABLE temp_usernames AS
      SELECT u_id, 'default_username_' || ROW_NUMBER() OVER (ORDER BY u_id) AS new_username
      FROM "user"
      `,
    );

    // 更新 user 表的 temp_username 列
    await queryRunner.query(
      `
      UPDATE "user"
      SET "temp_username" = t.new_username
      FROM temp_usernames t
      WHERE "user".u_id = t.u_id
      `,
    );

    // 添加 username 列并使用 temp_username 列的值填充
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL DEFAULT 'default_username'`,
    );
    await queryRunner.query(`UPDATE "user" SET "username" = "temp_username"`);

    // 移除 temp_username 列
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "temp_username"`);

    // 移除默认值约束
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }
}
