---
layout: default
title: Contacto
permalink: /contact/
---

<div class="contact-hero">
  <div class="contact-image">
    <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop" alt="Contacto">
  </div>
  
  <div class="contact-content">
    <h1>Ponte en Contacto</h1>
    <p class="contact-description">¿Tienes un proyecto en mente o quieres colaborar? Aquí encontrarás todas las formas de contactarme.</p>
    
    <div class="contact-info">
      <div class="info-card">
        <i class="fas fa-envelope"></i>
        <h3>Email</h3>
        <p><a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
      </div>

      <div class="info-card">
        <i class="fas fa-map-marker-alt"></i>
        <h3>Ubicación</h3>
        <p>Málaga, España</p>
      </div>

      <div class="info-card">
        <i class="fas fa-share-alt"></i>
        <h3>Redes Sociales</h3>
        <div class="social-links">
          {% if site.github_username %}
          <a href="https://github.com/{{ site.github_username }}" target="_blank" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          {% endif %}
          {% if site.linkedin_username %}
          <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          {% endif %}
        </div>
