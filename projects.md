---
layout: page
title: Proyectos
permalink: /projects/
---

## Mis Proyectos

Aquí encontrarás una selección de mis trabajos en desarrollo web y diseño UI/UX.

{% assign sorted_projects = site.projects | sort: 'date' | reverse %}

<div class="project-list">
{% for project in sorted_projects %}
  <div class="project-item">
    <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
    <p class="project-description">{{ project.description }}</p>
    <p class="project-tech"><strong>Tecnologías:</strong> {{ project.technologies }}</p>
    <p class="project-date"><em>{{ project.date | date: "%B %Y" }}</em></p>
    <a href="{{ project.url | relative_url }}" class="btn">Ver detalles →</a>
  </div>
  <hr>
{% endfor %}
</div>

---

### Proyectos Profesionales

Sitios web reales desarrollados para clientes, con backend en PHP y diseño a medida:

- **[Finca Avignon](/fernando/projects/avignon/)** — Web corporativa para finca con formulario de reservas
- **[Puerto Narixa](/fernando/projects/puerto-narixa/)** — Página web completa con galería y contacto
- **[Landing Pacífico](/fernando/projects/landing-pacifico/)** — Landing page orientada a conversión

---

¿Tienes un proyecto en mente? [Contáctame](mailto:fernando.pinilla85@gmail.com)
