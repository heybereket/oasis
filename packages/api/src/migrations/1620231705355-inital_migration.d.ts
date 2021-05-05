import { MigrationInterface, QueryRunner } from "typeorm";
export declare class initalMigration1620231705355 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
