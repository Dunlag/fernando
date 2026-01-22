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

## 1. Actualiza el sistema
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install build-essential curl git ca-certificates
```

## 2. Instala tus herramientas base
- Git, Node.js (nvm), Python (pyenv), Docker
- Editor: VS Code o Neovim (elige tu stack)
- Navegador: Firefox/Brave para devtools y pruebas

```bash
# nvm + última LTS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts

# pyenv + Python estable
curl https://pyenv.run | bash
pyenv install 3.12.2
pyenv global 3.12.2
```

## 3. Configura Git y SSH
```bash
git config --global user.name "Fernando"
git config --global user.email "tu-email@example.com"
ssh-keygen -t ed25519 -C "tu-email@example.com"
```

## 4. Fuentes, terminal y shell
- Fuente: JetBrains Mono o Fira Code (con ligaduras)
- Terminal: GNOME Terminal + tema oscuro
- Shell: zsh + oh-my-zsh o starship

```bash
sudo apt install fonts-firacode zsh
chsh -s $(which zsh)
curl -sS https://starship.rs/install.sh | sh
```

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
