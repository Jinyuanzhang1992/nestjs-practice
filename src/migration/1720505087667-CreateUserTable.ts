import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1720505087667 implements MigrationInterface {
    name = 'CreateUserTable1720505087667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
