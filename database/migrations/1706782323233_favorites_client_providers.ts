import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'favorites_client_providers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('client_account_id').notNullable().references('id').inTable('accounts')
      table.uuid('provider_account_id').notNullable().references('id').inTable('accounts')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
