import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lieux'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable();
      table.uuid('counytry_id').references('id').inTable('countries').notNullable();;
      table.uuid('account_id').references('id').inTable('accounts').notNullable();
      table.text('ville').notNullable();
      table.text('quarter');
      table.text('commune');
      table.text('pointer');
      table.text('descrption');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
