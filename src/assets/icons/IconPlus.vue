<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 3.4165C10.4142 3.4165 10.75 3.75229 10.75 4.1665V15.8332C10.75 16.2474 10.4142 16.5832 10 16.5832C9.58579 16.5832 9.25 16.2474 9.25 15.8332V4.1665C9.25 3.75229 9.58579 3.4165 10 3.4165Z"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.41675 10C3.41675 9.58579 3.75253 9.25 4.16675 9.25H15.8334C16.2476 9.25 16.5834 9.58579 16.5834 10C16.5834 10.4142 16.2476 10.75 15.8334 10.75H4.16675C3.75253 10.75 3.41675 10.4142 3.41675 10Z"
    ></path>
  </svg>
</template>


<script setup>
defineProps({
  color: {
    type: String,
  },
});
</script>