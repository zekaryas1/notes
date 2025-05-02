#!/bin/bash

# Global variable for backup retention period (in days)
RETENTION_DAYS=30

# Set paths
SOURCE_FOLDER="./docs/Private"
BACKUP_DIR="./private_backup"

# Check if 7z is installed
if ! command -v 7z &> /dev/null; then
    echo "Error: 7z (p7zip) is not installed. Install it using 'brew install p7zip'."
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Get current date for filename (YYYY-MM-DD)
CURRENT_DATE=$(date +%Y-%m-%d)

# Set output 7z filename
ARCHIVE_FILE="$BACKUP_DIR/$CURRENT_DATE.7z"

# Check if source folder exists
if [ ! -d "$SOURCE_FOLDER" ]; then
    echo "Error: Source folder $SOURCE_FOLDER does not exist."
    exit 1
fi

# Create AES-encrypted 7z archive
echo "Creating AES-encrypted archive for $SOURCE_FOLDER..."
7z a -p "$ARCHIVE_FILE" -r "$SOURCE_FOLDER"
if [ $? -eq 0 ]; then
    echo "Backup created successfully: $ARCHIVE_FILE"
else
    echo "Error: Failed to create backup."
    exit 1
fi

# Check for backups older than RETENTION_DAYS
echo "Checking for backups older than $RETENTION_DAYS days in $BACKUP_DIR..."
OLD_FILES=$(find "$BACKUP_DIR" -type f -name "*.7z" -mtime +"$RETENTION_DAYS")

# If no old files are found, skip deletion
if [ -z "$OLD_FILES" ]; then
    echo "No backups older than $RETENTION_DAYS days found."
    exit 0
fi

# List old files
echo "The following backups will be deleted:"
find "$BACKUP_DIR" -type f -name "*.7z" -mtime +"$RETENTION_DAYS" -ls

# Prompt user for confirmation
echo -n "Do you want to delete these old backups? (y/N): "
read -r CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
    # Perform deletion
    find "$BACKUP_DIR" -type f -name "*.7z" -mtime +"$RETENTION_DAYS" -delete
    if [ $? -eq 0 ]; then
        echo "Old backups (older than $RETENTION_DAYS days) deleted successfully."
    else
        echo "Error: Failed to delete old backups."
        exit 1
    fi
else
    echo "Deletion cancelled by user."
fi

exit 0