---
layout: post
title: "Automatizando tareas repetitivas con scripts en Bash"
date: 2026-01-28 14:30:00 +0100
category: Bash
tags: [Bash, Automation, Scripts]
cover: /assets/images/bash-automation.jpg
author: Fernando
read_time: 4 min read
description: "Aprende a automatizar tus flujos de trabajo diarios con scripts Bash profesionales y reutilizables."
---

## Introducción

Los scripts en Bash son herramientas poderosas para automatizar tus tareas diarias. En este artículo, aprenderás a crear scripts profesionales que te ahorren tiempo y reduzcan errores.

## El poder de la automatización

Repetir las mismas tareas manualmente es tedioso y propenso a errores. Con Bash, puedes automatizar:

- Despliegue de aplicaciones
- Backups regulares
- Monitoreo de sistemas
- Procesamiento de archivos en lote
- Flujos de desarrollo

## Script básico: Tu primer automatización

Crea un archivo `deploy.sh`:

```bash
#!/bin/bash

# Script para desplegar aplicación automáticamente

echo "🚀 Iniciando despliegue..."

# Detener servicio actual
sudo systemctl stop mi-app || true

# Actualizar código
git pull origin main

# Instalar dependencias
npm install

# Compilar
npm run build

# Iniciar servicio
sudo systemctl start mi-app

echo "✅ Despliegue completado"
```

Dale permisos y ejecuta:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Buenas prácticas

**1. Usa variables para flexibilidad:**
```bash
#!/bin/bash
APP_DIR="/var/www/myapp"
BACKUP_DIR="/backup"

cd $APP_DIR
tar -czf $BACKUP_DIR/backup-$(date +%Y%m%d).tar.gz .
```

**2. Manejo de errores:**
```bash
#!/bin/bash
set -e  # Salir si algo falla

if [ ! -f config.yml ]; then
  echo "Error: config.yml no encontrado"
  exit 1
fi
```

**3. Funciones reutilizables:**
```bash
#!/bin/bash

function log_info() {
  echo "[INFO] $1"
}

function log_error() {
  echo "[ERROR] $1" >&2
}

log_info "Iniciando proceso"
log_error "Algo salió mal"
```

## Casos de uso reales

**Backup automático:**
```bash
#!/bin/bash
BACKUP_DIR="/mnt/backup"
DB_PASS=$(cat /etc/db-password)

mysqldump -u root -p$DB_PASS --all-databases > $BACKUP_DIR/mysql-$(date +%Y%m%d-%H%M%S).sql
```

**Monitoreo de espacio en disco:**
```bash
#!/bin/bash
THRESHOLD=80

USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $USAGE -gt $THRESHOLD ]; then
  echo "Disco al ${USAGE}% - Limpieza necesaria"
  sudo apt clean
fi
```

## Próximos pasos

- Explora `man bash` para conocer todas las capacidades
- Integra con cron para ejecución automática
- Aprende sobre variables de entorno y pipes
- Mantén tus scripts en control de versiones

¡Con Bash dominas tu flujo de trabajo!

## 5. Docker y Compose
```bash
sudo apt install docker.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world
```

## 6. Productividad y calidad
- Linters/formatters: eslint/prettier para JS/TS; black/ruff para Python
- Hooks: pre-commit para chequear antes del push
- Dotfiles: guarda tu config en un repo para reproducir tu entorno

## 7. Atajos finales
- Crea una carpeta `~/dev` para tus proyectos
- Activa autosave y format on save en tu editor
- Usa workspaces para separar cliente, backend y scripts

> Con este stack tendrás un entorno rápido, reproducible y listo para código, contenedores y automatización diaria.
