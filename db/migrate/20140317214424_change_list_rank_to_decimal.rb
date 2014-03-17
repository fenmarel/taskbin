class ChangeListRankToDecimal < ActiveRecord::Migration
  def up
    change_column :lists, :rank, :float
  end

  def down
    change_column :lists, :rank, :integer
  end
end
