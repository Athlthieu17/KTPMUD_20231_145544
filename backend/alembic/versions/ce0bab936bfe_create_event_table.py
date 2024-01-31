"""create_event_table

Revision ID: ce0bab936bfe
Revises: aad7fbd731f7
Create Date: 2023-12-02 10:42:26.251383

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ce0bab936bfe'
down_revision: Union[str, None] = '3aed911a32b5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('event',
                    sa.Column("mact", sa.String(20), nullable=False),
                    sa.Column("name", sa.String(20), nullable=False),
                    sa.Column("detail", sa.String(100)),
                    sa.Column("ngaybatdau", sa.DATE(), nullable=False),
                    sa.Column("ngayketthuc", sa.DATE(), nullable=False),
                    sa.Column("owner", sa.Integer, nullable=False),
                    sa.PrimaryKeyConstraint('mact')
                    )
    op.create_foreign_key("event_fk", source_table="event", referent_table="users",
                          local_cols=['owner'], remote_cols=['manguoidung'], ondelete="CASCADE")

def downgrade() -> None:
    op.drop_constraint('event_fk', table_name="event")
    op.drop_table('event')
