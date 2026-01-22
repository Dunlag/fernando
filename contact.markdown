---
layout: page
title: Contacto
permalink: /contact/
---

<div class="contact-intro">
  <h2>Ponte en Contacto</h2>
  <p>¿Tienes un proyecto en mente o quieres colaborar? Envíame un mensaje y te responderé lo antes posible.</p>
</div>

<div class="contact-container">
  <div class="contact-form-wrapper">
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
      <div class="form-group">
        <label for="name">Tu Nombre</label>
        <input type="text" id="name" name="name" required placeholder="Escribe tu nombre">
      </div>

      <div class="form-group">
        <label for="email">Tu Email</label>
        <input type="email" id="email" name="email" required placeholder="tu@email.com">
      </div>

      <div class="form-group">
        <label for="message">Tu Mensaje</label>
        <textarea id="message" name="message" rows="6" required placeholder="Escribe tu mensaje aquí..."></textarea>
      </div>

      <button type="submit" class="btn btn-submit">
        <i class="fas fa-paper-plane"></i> Enviar Mensaje
      </button>
    </form>
  </div>

  <div class="contact-info">
    <div class="info-card">
      <i class="fas fa-envelope"></i>
      <h3>Email</h3>
      <p><a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
    </div>

    <div class="info-card">
      <i class="fas fa-map-marker-alt"></i>
      <h3>Ubicación</h3>
      <p>Madrid, España</p>
    </div>

    <div class="info-card">
      <i class="fas fa-share-alt"></i>
      <h3>Redes Sociales</h3>
      <div class="social-links">
        {% if site.github_username %}
        <a href="https://github.com/{{ site.github_username }}" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        {% endif %}
        {% if site.linkedin_username %}
        <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
        {% endif %}
      </div>
    </div>
  </div>
</div>
