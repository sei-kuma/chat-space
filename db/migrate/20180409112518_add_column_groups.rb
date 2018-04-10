class AddColumnGroups < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :name, :string, null: false
    add_index :groups, :name
  end
end
