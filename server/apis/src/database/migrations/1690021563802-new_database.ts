import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDatabase1690021563802 implements MigrationInterface {
    name = 'NewDatabase1690021563802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`Comment\` text NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`post_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`Username\` varchar(30) NOT NULL, \`Password\` varchar(255) NOT NULL, \`hashRt\` varchar(255) NULL, \`Role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_8542bfce8271ad2e1f2a7d2e45\` (\`Username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` varchar(36) NOT NULL, \`Title\` varchar(50) NOT NULL, \`Post\` text NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_b16dce8724a9dce563e76861ff\` (\`Title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`Category\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_acae14756c06cd57c3c58bf285\` (\`Category\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_posts\` (\`categories\` varchar(36) NOT NULL, \`posts\` varchar(36) NOT NULL, INDEX \`IDX_82f9a35257fccfd1e7484ba707\` (\`categories\`), INDEX \`IDX_10a6caeb55335127a03768f07b\` (\`posts\`), PRIMARY KEY (\`categories\`, \`posts\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`fk_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`fk_post_id\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` ADD CONSTRAINT \`FK_82f9a35257fccfd1e7484ba707f\` FOREIGN KEY (\`categories\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` ADD CONSTRAINT \`FK_10a6caeb55335127a03768f07b8\` FOREIGN KEY (\`posts\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories_posts\` DROP FOREIGN KEY \`FK_10a6caeb55335127a03768f07b8\``);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` DROP FOREIGN KEY \`FK_82f9a35257fccfd1e7484ba707f\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`fk_post_id\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`fk_user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_10a6caeb55335127a03768f07b\` ON \`categories_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_82f9a35257fccfd1e7484ba707\` ON \`categories_posts\``);
        await queryRunner.query(`DROP TABLE \`categories_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_acae14756c06cd57c3c58bf285\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_b16dce8724a9dce563e76861ff\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_8542bfce8271ad2e1f2a7d2e45\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
