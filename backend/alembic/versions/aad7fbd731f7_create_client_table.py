"""create_client_table

Revision ID: aad7fbd731f7
Revises: 3aed911a32b5
Create Date: 2023-12-02 10:40:35.882018

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aad7fbd731f7'
down_revision: Union[str, None] = '3aed911a32b5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('client',
                    sa.Column("makh", sa.String(20), nullable=False),
                    sa.Column("address", sa.String()),
                    sa.Column('owner_user', sa.Integer, nullable=False),
                    sa.PrimaryKeyConstraint('makh'))
    op.create_foreign_key('client_fk', source_table="client", referent_table="users",
                          local_cols=['owner_user'], remote_cols=['manguoidung'], ondelete="CASCADE")


def downgrade() -> None:
    op.drop_constraint('client_fk', table_name="client")
    op.drop_table('client')
