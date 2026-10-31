<template>
  <div class="container mx-auto max-w-7xl px-6 not-found-wrapper">
    <section class="not-found">
      <p class="not-found-code" aria-hidden="true">404</p>
      <h1>{{ $t('notFound.title') }}</h1>
      <p class="not-found-text">{{ $t('notFound.text') }}</p>
      <div class="not-found-buttons">
        <router-link to="/projects" class="not-found-btn not-found-btn-primary">{{ $t('notFound.projects') }}</router-link>
        <router-link to="/" class="not-found-btn not-found-btn-outline">{{ $t('notFound.home') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFoundComponent',
}
</script>

<style scoped>
  .not-found-wrapper {
    padding-top: 32px;
    padding-bottom: 80px;
  }
  .not-found {
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 24px 60px rgba(61, 22, 87, 0.1);
    padding: 64px 32px;
    text-align: center;
  }
  .not-found-code {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 96px;
    line-height: 1;
    color: #9535d7;
  }
  .not-found h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 32px;
    margin-top: 16px;
  }
  .not-found-text {
    margin: 12px auto 0;
    max-width: 32rem;
    font-size: 17px;
    color: #5b5b66;
  }
  .not-found-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    margin-top: 32px;
  }
  .not-found-btn {
    border-radius: 9999px;
    padding: 14px 26px;
    font-size: 15px;
    font-weight: 600;
    transition: opacity 150ms ease;
  }
  .not-found-btn:hover {
    opacity: 0.85;
  }
  .not-found-btn-primary {
    background: #9535d7;
    color: #fff;
    box-shadow: 0 10px 24px rgba(149, 53, 215, 0.28);
  }
  .not-found-btn-outline {
    border: 2px solid #9535d7;
    color: #9535d7;
  }
  @media (max-width: 600px) {
    .not-found {
      padding: 48px 20px;
      border-radius: 24px;
    }
    .not-found-code {
      font-size: 72px;
    }
    .not-found h1 {
      font-size: 26px;
    }
  }
</style>
