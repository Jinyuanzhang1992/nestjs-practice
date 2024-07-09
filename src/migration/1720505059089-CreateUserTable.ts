import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1720505059089 implements MigrationInterface {
    name = 'CreateUserTable1720505059089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
