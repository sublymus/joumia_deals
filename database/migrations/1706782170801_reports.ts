import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()

      table.text('message').notNullable();
      table.uuid('product_id').notNullable().references('id').inTable('products');
      table.uuid('client_account_id').references('id').inTable('accounts').notNullable();
      table.uuid('provider_account_id').references('id').inTable('accounts').notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
