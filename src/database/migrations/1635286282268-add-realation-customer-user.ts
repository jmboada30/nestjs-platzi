import {MigrationInterface, QueryRunner} from "typeorm";

export class addRealationCustomerUser1635286282268 implements MigrationInterface {
    name = 'addRealationCustomerUser1635286282268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` (\`customerId\`)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6c687a8fa35b0ae35ce766b56c\` ON \`user\` (\`customerId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6c687a8fa35b0ae35ce766b56ce\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6c687a8fa35b0ae35ce766b56ce\``);
        await queryRunner.query(`DROP INDEX \`REL_6c687a8fa35b0ae35ce766b56c\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
    }

}
