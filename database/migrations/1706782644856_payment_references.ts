import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payment_references'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.text('mode').notNullable();
      table.uuid('sum').notNullable();
      table.text('payement_refences').notNullable();
      table.text('method_payment').notNullable();
      table.uuid('transaction_id').notNullable().references('id').inTable('payment_references');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
