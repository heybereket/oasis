"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalMigration1620231705355 = void 0;
class initalMigration1620231705355 {
    constructor() {
        this.name = 'initalMigration1620231705355';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "repo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "name" character varying NOT NULL, "full_name" character varying NOT NULL, "github_owner" character varying NOT NULL, "issues" integer NOT NULL, "desc" character varying NOT NULL, "language" character varying NOT NULL, "stars" integer NOT NULL, "url" character varying NOT NULL, "date_added" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_6c3318a15f9a297481f341128cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying NOT NULL, "banner" character varying, "username" character varying NOT NULL, "name" character varying, "bio" character varying, "createdAt" character varying NOT NULL, "github" character varying, "twitter" character varying, "url" character varying, "verified" boolean NOT NULL, "badges" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "message" character varying NOT NULL, "likes" integer NOT NULL, "dislikes" integer NOT NULL, "topics" text NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "likes" integer NOT NULL, "dislikes" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "repo" ADD CONSTRAINT "FK_c9e09ec6c1f5a017144f99d2afd" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "repo" DROP CONSTRAINT "FK_c9e09ec6c1f5a017144f99d2afd"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "repo"`);
    }
}
exports.initalMigration1620231705355 = initalMigration1620231705355;
