#!/bin/bash

# Source (Download folder)
SRC="/storage/emulated/0/Download"

# Destination (public/images folder)
DEST="$HOME/ecommerce_project/frontend/public/images"

# Agar destination folder nahi hai to create kar do
mkdir -p "$DEST"

# User se ek ya multiple image names lena
echo "Enter image name(s) (space separated if multiple):"
read IMAGES

# Har image ko copy karna
for IMG in $IMAGES; do
    if [ -f "$SRC/$IMG" ]; then
        cp "$SRC/$IMG" "$DEST/"
        echo "✅ $IMG copied successfully"
    else
        echo "❌ $IMG not found in $SRC"
    fi
done

echo "🎉 Done! Check images in: $DEST"
