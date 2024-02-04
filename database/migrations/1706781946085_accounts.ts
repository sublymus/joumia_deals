import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up () { 
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable();
      table.string('name',50).notNullable();
      table.text('location').notNullable();
      table.text('email').notNullable().unique();
      table.text('avatar_url').notNullable();
      table.text('access_id').notNullable();
      table.text('phone').notNullable();
      table.uuid('acl_id').references('id').inTable('acls')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
} 
