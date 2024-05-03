import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBlogImage1714726864413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'url',
                    type: 'varchar',
                },
                {
                    name: 'blogId',
                    type: 'uuid',
                },
                {
                    name: 'create_date_time',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'last_changed_date_time',
                    type: 'timestamp with time zone',
                    default: 'now()',
                    onUpdate: 'now()',
                },
                {
                    name: 'last_changed_by',
                    type: 'varchar',
                    length: '300',
                    isNullable: true,
                },
                {
                    name: 'internal_comment',
                    type: 'varchar',
                    length: '300',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['blogId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'blogs',
                    onDelete: 'CASCADE',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
