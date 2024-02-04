import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'file'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.text('extension').notNullable();
      table.text('mine').notNullable();
      table.text('url').notNullable();
      table.text('label').notNullable();
      table.integer('size').notNullable();
      table.text('table_name').notNullable();
      table.uuid('table_id').notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
