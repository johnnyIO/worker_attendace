import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";
const user = ref(null);
const errorMessage = ref("");
const error = ref(false);
const router = useRouter();

export const useUSerStore = defineStore("user", () => {
  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    const loginCredentials = {
      username: username,
      password: password,
    };

    error.value = false;
    errorMessage.value = "";
    // console.log(loginCredentials);

    await axios
      .post("http://localhost:3000/adminlogin", loginCredentials)
      .then((res) => {
        if (res.data.status) {
          // console.log(res.data);
          // router.push("/adminindex");
          user.value = true;
        } else {
          error.value = true;
          errorMessage.value = res.data.msg;
        }
      })
      .catch((err) => {
        return (errorMessage.value = err);
      });
  };

  const handleLogout = () => {
    user.value = false;
  };

  return {
    handleLogin,
    handleLogout,
    user,
    errorMessage,
    error,
  };
});
