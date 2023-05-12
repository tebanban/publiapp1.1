"""empty message

Revision ID: 1779734e4179
Revises: e9fb59a10c85
Create Date: 2023-05-12 15:42:15.380965

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1779734e4179'
down_revision = 'e9fb59a10c85'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('valla', sa.Column('way', sa.String(length=150), nullable=True))
    op.drop_column('valla', 'view')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('valla', sa.Column('view', sa.VARCHAR(length=150), autoincrement=False, nullable=True))
    op.drop_column('valla', 'way')
    # ### end Alembic commands ###
