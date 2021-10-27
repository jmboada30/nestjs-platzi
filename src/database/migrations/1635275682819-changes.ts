import {MigrationInterface, QueryRunner} from "typeorm";

export class changes1635275682819 implements MigrationInterface {
    name = 'changes1635275682819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
    }

}
