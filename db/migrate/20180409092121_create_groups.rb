class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    unless table_exists? :groups
    create_table :groups do |t|

      t.timestamps
    end
  end
end
