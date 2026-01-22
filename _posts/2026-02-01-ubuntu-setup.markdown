---
layout: post
title: "Setting up the perfect programming environment on Ubuntu"
date: 2026-02-01 10:00:00 +0100
category: Linux
tags: [Linux, Productivity, Setup]
cover: /assets/images/ubuntu-setup.jpg
author: Fernando
author_avatar: /assets/images/avatar.jpg
read_time: 3 min read
description: "Guía completa para configurar un entorno de desarrollo profesional en Ubuntu con las mejores herramientas y prácticas."
# featured_posts:
#   - { title: "Automatizando tareas con Bash", url: "/automating-routine-tasks-with-bash-scripts/" }
#   - { title: "Por qué migré a Arch", url: "/why-i-switched-to-arch-linux-and-never-looked-back/" }
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
Shell: zsh + oh-my-zsh o starship
5. Docker y Compose
6. Productividad y calidad
Linters/formatters: eslint/prettier para JS/TS; black/ruff para Python
Hooks: pre-commit para chequear antes del push
Dotfiles: guarda tu config en un repo para reproducir tu entorno
7. Atajos finales
Crea una carpeta ~/dev para tus proyectos
Activa autosave y format on save en tu editor
Usa workspaces para separar cliente, backend y scripts
Con este stack tendrás un entorno rápido, reproducible y listo para código, contenedores y automatización diaria.

