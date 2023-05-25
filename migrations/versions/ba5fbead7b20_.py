"""empty message

Revision ID: ba5fbead7b20
Revises: 78e0707394f9
Create Date: 2023-05-23 22:46:33.367069

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ba5fbead7b20'
down_revision = '78e0707394f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('number_id', sa.String(length=50), nullable=False))
    op.drop_index('company_id', table_name='client')
    op.create_unique_constraint(None, 'client', ['number_id'])
    op.drop_column('client', 'company_id')
    op.add_column('owner', sa.Column('number_id', sa.String(length=50), nullable=True))
    op.add_column('owner', sa.Column('contact', sa.String(length=200), nullable=False))
    op.alter_column('owner', 'name',
               existing_type=mysql.VARCHAR(length=150),
               type_=sa.String(length=200),
               nullable=True)
    op.drop_index('company', table_name='owner')
    op.drop_index('document_id', table_name='owner')
    op.create_unique_constraint(None, 'owner', ['number_id'])
    op.create_unique_constraint(None, 'owner', ['name'])
    op.drop_column('owner', 'company')
    op.drop_column('owner', 'document_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('owner', sa.Column('document_id', mysql.VARCHAR(length=50), nullable=False))
    op.add_column('owner', sa.Column('company', mysql.VARCHAR(length=150), nullable=True))
    op.drop_constraint(None, 'owner', type_='unique')
    op.drop_constraint(None, 'owner', type_='unique')
    op.create_index('document_id', 'owner', ['document_id'], unique=False)
    op.create_index('company', 'owner', ['company'], unique=False)
    op.alter_column('owner', 'name',
               existing_type=sa.String(length=200),
               type_=mysql.VARCHAR(length=150),
               nullable=False)
    op.drop_column('owner', 'contact')
    op.drop_column('owner', 'number_id')
    op.add_column('client', sa.Column('company_id', mysql.VARCHAR(length=50), nullable=False))
    op.drop_constraint(None, 'client', type_='unique')
    op.create_index('company_id', 'client', ['company_id'], unique=False)
    op.drop_column('client', 'number_id')
    # ### end Alembic commands ###
