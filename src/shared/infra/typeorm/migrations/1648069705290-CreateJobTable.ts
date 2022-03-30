import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJobTable1648069705290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "jobs",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },

          {
            name: "description",
            type: "varchar",
          },

          {
            name: "salary_value",
            type: "varchar",
          },

          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },

          {
            name: "whatssap",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },

          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("jobs");
  }
}
