#!/bin/bash
set -e

echo "Iniciando backend Laravel..."

# Crear directorios de storage si no existen
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/testing
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p storage/app/public

# Configurar permisos
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Instalar dependencias si no existen
if [ ! -d "vendor" ]; then
    echo "Instalando dependencias de Composer..."
    composer install --no-dev --optimize-autoloader
fi

# Generar clave de aplicación si no existe en .env
if ! grep -q "APP_KEY=base64:" .env 2>/dev/null || grep -q "APP_KEY=$" .env 2>/dev/null; then
    echo "Generando clave de aplicación..."
    php artisan key:generate --force || true
fi

# Crear enlace simbólico del storage si no existe
if [ ! -L "public/storage" ]; then
    echo "Creando enlace simbólico del storage..."
    php artisan storage:link || true
fi

# Limpiar caché
php artisan config:clear || true
php artisan cache:clear || true
php artisan view:clear || true

echo "Backend listo. Iniciando PHP-FPM..."

# Ejecutar PHP-FPM
exec php-fpm
