<template>
  <footer>
    <p>
      Desenvolvido por:
    </p>
    <a class="link" href="https://arthur-vsl.vercel.app" target="_blank" >
      @Arthur.vsl
    </a>
  </footer>
</template>

<style>
footer {
  bottom: 0;
  position: fixed;
  margin-bottom: 1rem;

  display: flex;
  gap: 0.5rem;
}

.link {
  transition: 0.2s ease;
  &:hover {
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  color: var(--vue-green-01);
  transition: 0.2s ease;
  }
}

</style>