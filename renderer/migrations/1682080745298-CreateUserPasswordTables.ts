import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserPasswordTables1635432237186
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "passcd word",
            type: "varchar",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "passwords",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "titleId",
            type: "varchar",
          },
          {
            name: "encryptedPassword",
            type: "varchar",
          },
          {
            name: "userId",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("passwords");
    await queryRunner.dropTable("users");
  }
}
