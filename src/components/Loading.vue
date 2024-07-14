<template>
  <div class="loading"></div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-ms-keyframes spin {
  100% {
    -ms-transform: rotate(360deg);
  }
}

@-o-keyframes spin {
  100% {
    -o-transform: rotate(360deg);
  }
}

.loading {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-left-color: #f8f8f8;
  border-right-color: transparent;
  border-bottom-color: #eeeeee;
  border-radius: 100%;
  animation: spin 600ms infinite linear;

  -moz-animation: spin 600ms infinite linear;
  -o-animation: spin 600ms infinite linear;
  -webkit-animation: spin 600ms infinite linear;
  -ms-animation: spin 600ms infinite linear;
}
</style>