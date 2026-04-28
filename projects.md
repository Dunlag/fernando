---
layout: page
title: Proyectos
permalink: /projects/
description: Una selección de mis trabajos en desarrollo web y diseño UI/UX.
---

{% assign sorted_projects = site.projects | sort: 'date' | reverse %}

<div class="project-list">
{% for project in sorted_projects %}
  <article class="project-item">
    <span class="timestamp">{{ project.date | date: "%Y.%m" }}</span>
    <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
    <p class="project-description">{{ project.description }}</p>
    <p class="project-tech">// Stack — {{ project.technologies }}</p>
    <a href="{{ project.url | relative_url }}" class="btn btn-outline">Ver detalle →</a>
  </article>
{% endfor %}
</div>

---

### Proyectos profesionales

Sitios web reales desarrollados para clientes, con backend en PHP y diseño a medida:

- **[Finca Avignon]({{ '/projects/avignon/' | relative_url }})** — Web corporativa para finca con formulario de reservas
- **[Puerto Narixa]({{ '/projects/puerto-narixa/' | relative_url }})** — Página web completa con galería y contacto
- **[Landing Pacífico]({{ '/projects/landing-pacifico/' | relative_url }})** — Landing page orientada a conversión

¿Tienes un proyecto en mente? [Contáctame](mailto:fernando.pinilla85@gmail.com).
