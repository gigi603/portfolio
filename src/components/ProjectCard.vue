<template>
  <router-link :to="{ name: 'ProjectDetailComponent', params: { id: project.id } }" class="project-card">
    <div class="project-card-image">
      <img :src="project.img" alt="">
    </div>
    <div class="project-card-body">
      <div class="project-card-text">
        <div class="project-card-tags">
          <span class="tag tag-status">{{ $t(`projects.${project.id}.label`) }}</span>
          <span class="tag tag-type">{{ $t(`projects.${project.id}.type`) }}</span>
        </div>
        <h3>{{ project.name }}</h3>
        <p>{{ $t(`projects.${project.id}.hook`) }}</p>
      </div>
      <span class="project-card-arrow" aria-hidden="true">
        <img src="@/assets/icons/arrow-right-fill.svg" alt="">
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
  .project-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 14px 40px rgba(61, 22, 87, 0.1);
    transition: transform 250ms ease, box-shadow 250ms ease;
  }
  .project-card:hover,
  .project-card:focus-visible {
    transform: translateY(-6px);
    box-shadow: 0 24px 50px rgba(61, 22, 87, 0.18);
  }
  .project-card:focus {
    outline: none;
  }
  .project-card:focus-visible {
    outline: 3px solid #9535d7;
    outline-offset: 4px;
  }
  .project-card-image {
    height: 330px;
    overflow: hidden;
  }
  .project-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 250ms ease;
  }
  .project-card:hover .project-card-image img,
  .project-card:focus-visible .project-card-image img {
    transform: scale(1.03);
  }
  .project-card-body {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 30px;
    flex-grow: 1;
  }
  .project-card-text {
    flex-grow: 1;
  }
  .project-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }
  .tag {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 9999px;
  }
  .tag-status {
    background: #f3e8ff;
    color: #7b2cb8;
  }
  .tag-type {
    background: #f1f1f4;
    color: #555;
  }
  .project-card h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: #111;
  }
  .project-card p {
    font-size: 15px;
    color: #7a7a7a;
    padding-top: 4px;
  }
  .project-card-arrow {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #9535d7;
    box-shadow: 0 8px 18px rgba(149, 53, 215, 0.3);
    display: grid;
    place-items: center;
  }
  .project-card-arrow img {
    width: 28px;
    height: 28px;
  }
  @media (max-width: 640px) {
    .project-card-image {
      height: 220px;
    }
    .project-card-body {
      padding: 20px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .project-card,
    .project-card-image img {
      transition: none;
    }
    .project-card:hover,
    .project-card:focus-visible {
      transform: none;
    }
    .project-card:hover .project-card-image img,
    .project-card:focus-visible .project-card-image img {
      transform: none;
    }
  }
</style>
