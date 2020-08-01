import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTablePubs1593356155521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pubs',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'uf',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'latitude',
            type: 'number',
            isNullable: true,
          },

          {
            name: 'longitude',
            type: 'number',
            isNullable: true,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }

        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pubs');
  }
}
