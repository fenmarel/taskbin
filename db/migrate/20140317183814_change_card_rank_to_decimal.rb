class ChangeCardRankToDecimal < ActiveRecord::Migration
  def up
    change_column :cards, :rank, :float
  end

  def down
    change_column :cards, :rank, :integer
  end
end
