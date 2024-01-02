"""create_phiphat_table

Revision ID: 4692803039df
Revises: f4c390e9c080
Create Date: 2023-12-02 10:48:16.553898

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4692803039df'
down_revision: Union[str, None] = 'f4c390e9c080'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("phiphat",
                    sa.Column("maphiphat", sa.String(20), nullable=False),
                    sa.Column("phiphat", sa.Integer()),
                    sa.Column("lydo", sa.String(), nullable=False),
                    sa.Column("owner_detail", sa.String(20), nullable=False),
                    sa.PrimaryKeyConstraint("maphiphat"))
    op.create_foreign_key('phiphat_fk', source_table="phiphat", referent_table="detail_event",
                          local_cols=['owner_detail'], remote_cols=['mactct'], ondelete="CASCADE")

def downgrade() -> None:
    op.drop_constraint("phiphat_fk","phiphat")
    op.drop_table("phiphat")

