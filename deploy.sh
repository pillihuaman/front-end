#!/bin/bash

# Variables
BUCKET_NAME="alamodaperu-frontend"
CLOUDFRONT_DIST_ID="E1ZPD1AZFOON1L"
DIST_FOLDER="dist/alamodaperu"

echo "🔧 Construyendo proyecto Angular..."
npm run build -- --configuration production

echo "⬆️ Subiendo archivos a S3..."
aws s3 sync $DIST_FOLDER s3://$BUCKET_NAME --delete

echo "📦 Invalidando caché en CloudFront..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*"

echo "✅ Despliegue completado."
