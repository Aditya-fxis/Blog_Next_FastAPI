from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
import sys

# ✅ Add your app directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# ✅ Import your DB base and settings
from app.models import Base  # This must import all your models
from app.config import settings  # config.py must contain DATABASE_URL

# Load alembic.ini config
config = context.config

# ✅ Override DB URL from settings.py
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Set up loggers
fileConfig(config.config_file_name)

# ✅ Metadata for Alembic to auto-detect changes
target_metadata = Base.metadata

# === Migration routines ===

def run_migrations_offline():
    """Run migrations in 'offline' mode (no engine)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True  # Detect type changes
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode (real connection)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True  # Detect column type changes
        )

        with context.begin_transaction():
            context.run_migrations()


# Run the appropriate mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
