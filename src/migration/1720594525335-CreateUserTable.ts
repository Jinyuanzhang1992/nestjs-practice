import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1720594525335 implements MigrationInterface {
    name = 'CreateUserTable1720594525335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
