"""empty message

Revision ID: 79c1e62a5d39
Revises: 3662c8d9acab
Create Date: 2023-05-23 23:20:18.708184

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '79c1e62a5d39'
down_revision = '3662c8d9acab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('name', sa.String(length=200), nullable=False))
    op.alter_column('client', 'contact',
               existing_type=mysql.VARCHAR(length=150),
               type_=sa.String(length=200),
               nullable=True)
    op.drop_index('company', table_name='client')
    op.create_unique_constraint(None, 'client', ['contact'])
    op.drop_column('client', 'company')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('company', mysql.VARCHAR(length=150), nullable=True))
    op.drop_constraint(None, 'client', type_='unique')
    op.create_index('company', 'client', ['company'], unique=False)
    op.alter_column('client', 'contact',
               existing_type=sa.String(length=200),
               type_=mysql.VARCHAR(length=150),
               nullable=False)
    op.drop_column('client', 'name')
    # ### end Alembic commands ###
