import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.text('title').notNullable();
      table.integer('price').notNullable();
      table.text('description').notNullable();
      table.smallint('status').notNullable();
      table.timestamp('express_time', { useTz: true })
      table.timestamp('last_appearance', { useTz: true })
      table.json('caracteristique');
      table.uuid('moderator_id').references('id').inTable('moderators');
      table.uuid('category_id').notNullable().references('id').inTable('categories');
      table.uuid('account_id').notNullable().references('id').inTable('accounts');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
