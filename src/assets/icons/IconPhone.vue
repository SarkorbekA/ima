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
      <clipPath id="clip4_9019">
        <rect
          id="phone-flip 1"
          width="20.000000"
          height="20.000000"
          transform="matrix(-1 0 0 1 20 0)"
          fill="white"
          fill-opacity="0"
        />
      </clipPath>
    </defs>
    <rect
      id="phone-flip 1"
      width="20.000000"
      height="20.000000"
      transform="matrix(-1 0 0 1 20 0)"
      fill="#FFFFFF"
      fill-opacity="0"
    />
    <g clip-path="url(#clip4_9019)">
      <path
        id="Vector"
        d="M1.52 1.51L2.39 0.75C3.4 -0.25 5.04 -0.25 6.04 0.75C6.07 0.78 7.61 2.79 7.61 2.79C8.56 3.79 8.56 5.36 7.61 6.35L6.64 7.57C7.86 10.33 9.75 12.23 12.42 13.36L13.64 12.39C14.63 11.43 16.21 11.43 17.2 12.39C17.2 12.39 19.21 13.93 19.24 13.95C20.24 14.96 20.24 16.59 19.28 17.56L18.44 18.52C17.49 19.48 16.19 20 14.79 20C8.43 20 -0.01 11.56 -0.01 5.2C-0.01 3.81 0.52 2.51 1.52 1.52L1.52 1.51ZM14.79 18.33C15.74 18.33 16.62 17.98 17.22 17.37L18.05 16.41C18.39 16.07 18.41 15.51 18.09 15.15C18.09 15.15 16.09 13.62 16.07 13.59C15.73 13.25 15.13 13.25 14.78 13.59C14.75 13.62 13.08 14.96 13.08 14.96C12.84 15.15 12.54 15.19 12.26 15.09C8.81 13.77 6.34 11.3 4.91 7.75C4.8 7.47 4.84 7.15 5.04 6.91C5.04 6.91 6.38 5.23 6.39 5.21C6.75 4.85 6.75 4.28 6.39 3.92C6.37 3.9 4.84 1.9 4.84 1.9C4.48 1.58 3.92 1.59 3.54 1.97L2.66 2.73C2.02 3.37 1.66 4.25 1.66 5.19C1.66 11 9.8 18.33 14.79 18.33Z"
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