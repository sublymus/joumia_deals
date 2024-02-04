import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.text('name').notNullable();
      table.boolean('change_group_info').notNullable();//photo description name
      table.boolean('delete_messages').notNullable();
      table.boolean('ban_users').notNullable();
      table.boolean('invite_user_via_link').notNullable();
      table.boolean('pin_message').notNullable();
      table.boolean('remain_anonymous').notNullable();
      table.boolean('add_new_admins').notNullable();
      table.boolean('send_message').notNullable();
      table.boolean('send_file').notNullable();
      table.boolean('add_member').notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
