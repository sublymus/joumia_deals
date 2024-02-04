import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.text('mode').notNullable();
      table.integer('price').notNullable();
      table.text('currency').notNullable();
      table.text('country_id').notNullable().references('id').inTable('countries');
      table.text('frais_entrant').notNullable();
      table.uuid('payment_reference').notNullable().references('id').inTable('payment_references');
      table.uuid('account_id').notNullable().references('id').inTable('accounts');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
