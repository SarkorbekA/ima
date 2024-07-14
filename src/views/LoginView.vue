<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const error = ref("");

const email = ref("");
const password = ref("");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);

  axios
    .post("http://task.loc.com/api/login", formData, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.data.token)
      );
      router.push("/admin");
      // console.log(response.data);
    })
    .catch((e) => {
      error.value = e.response.data.error;
      email.value = "";
      password.value = "";
      console.error("Ошибка:", e.response.data.error);
    });
}
</script>

<template>
  <div class="login">
    <div class="login-wrapper">
      <h2 class="login-title">Login</h2>
      <form class="login-form" @submit="handleSubmit">
        <div class="form-group">
          <label class="login-label" for="username">Email:</label>
          <input
            class="login-input"
            type="email"
            required
            v-model="email"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label class="login-label" for="password">Пароль:</label>
          <input
            class="login-input"
            minlength="8"
            v-model="password"
            type="password"
            required
            id="password"
            name="password"
            placeholder="Password"
          />
          <div class="login-error">
            <span v-if="error.length > 0">{{ error }}</span>
          </div>
        </div>
        <button class="login-button" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #f5f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  &-title {
    text-align: center;
    margin-bottom: 20px;
  }
  &-wrapper {
    width: 100%;
    max-width: 360px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0px 4px 20px 0px #06496e1a;
    padding: 24px 12px 12px;
    position: relative;
  }
  &-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &-label {
    display: block;
    font-size: 16px;
    color: #044467;
    margin-bottom: 8px;
  }
  &-input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border-radius: 8px;
    outline: none;
    border: 1px solid #044467;
  }
  &-button {
    width: 100%;
    height: 40px;
    background-color: #dde2ea;
    border-radius: 12px;
  }
  &-error {
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    margin-top: 10px;
    color: #003c5d;
  }
}
</style>