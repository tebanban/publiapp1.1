"""empty message

Revision ID: 573eb92bd18c
Revises: f1acfaf41bcc
Create Date: 2023-06-12 00:14:27.430471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '573eb92bd18c'
down_revision = 'f1acfaf41bcc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('owner_ibfk_1', 'owner', type_='foreignkey')
    op.create_foreign_key(None, 'owner', 'user', ['user_id'], ['id'], onupdate='CASCADE', ondelete='SET NULL')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'owner', type_='foreignkey')
    op.create_foreign_key('owner_ibfk_1', 'owner', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###
