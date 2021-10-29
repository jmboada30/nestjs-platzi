import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexToProducts1635495984715 implements MigrationInterface {
    name = 'addIndexToProducts1635495984715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`productId\` \`productId\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` ON \`product\` (\`price\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_8be8a67f3ba961255d218125a2\` ON \`product\` (\`price\`, \`image\`)`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`DROP INDEX \`IDX_8be8a67f3ba961255d218125a2\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
