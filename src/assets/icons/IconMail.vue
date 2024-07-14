<template>
  <svg
    width="20.000000"
    height="20.000000"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <desc>Created with Pixso.</desc>
    <defs>
      <clipPath id="clip4_9023">
        <rect
          id="envelope 1"
          width="20.000000"
          height="20.000000"
          fill="white"
          fill-opacity="0"
        />
      </clipPath>
    </defs>
    <rect
      id="envelope 1"
      width="20.000000"
      height="20.000000"
      fill="#FFFFFF"
      fill-opacity="0"
    />
    <g clip-path="url(#clip4_9023)">
      <path
        id="Vector"
        d="M15.83 0.83L4.16 0.83C3.06 0.83 2 1.27 1.22 2.05C0.44 2.83 0 3.89 0 5L0 15C0 16.1 0.44 17.16 1.22 17.94C2 18.72 3.06 19.16 4.16 19.16L15.83 19.16C16.93 19.16 17.99 18.72 18.77 17.94C19.55 17.16 19.99 16.1 20 15L20 5C19.99 3.89 19.55 2.83 18.77 2.05C17.99 1.27 16.93 0.83 15.83 0.83ZM4.16 2.5L15.83 2.5C16.33 2.5 16.81 2.65 17.23 2.93C17.64 3.21 17.96 3.6 18.14 4.07L11.76 10.45C11.29 10.92 10.66 11.18 10 11.18C9.33 11.18 8.7 10.92 8.23 10.45L1.85 4.07C2.03 3.6 2.35 3.21 2.76 2.93C3.18 2.65 3.66 2.5 4.16 2.5ZM15.83 17.5L4.16 17.5C3.5 17.5 2.86 17.23 2.39 16.76C1.93 16.29 1.66 15.66 1.66 15L1.66 6.25L7.05 11.63C7.83 12.41 8.89 12.85 10 12.85C11.1 12.85 12.16 12.41 12.94 11.63L18.33 6.25L18.33 15C18.33 15.66 18.06 16.29 17.6 16.76C17.13 17.23 16.49 17.5 15.83 17.5Z"
        :fill="color"
        fill-opacity="1.000000"
        fill-rule="nonzero"
      />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>