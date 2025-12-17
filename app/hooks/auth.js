import { useUserStore } from "~/stores/user";
import API_HANDLER from "~/hooks/api_handler";
import { REGISTER, LOGIN_ACCESS_TOKEN, GET_CURRENT_USER } from "~/configs/api/urls";
import { CORE } from "~/configs/routes/core";
import { useCoreAuthStore } from "~/stores/auth";

export default function useAuth() {
  const userStore = useUserStore();
  const useAuth = useCoreAuthStore()

  const user = reactive({
    email: "",
    username: "",
    password: "",
  });

  const errorsState = ref({});

  const validateHandler = ref(true);
  const errorMassage = ref("");
  const errorList = ref([]);


  const validationusername = computed(() => {
    if (validateHandler.value) {
      return user.username.length >= 1;
    }
  });

  const validationEmail = computed(() => {
    if (validateHandler.value) {
      return /^[^\s@]+@[^\s@]/.test(user.email);
    }
  });

  const validationPassword = computed(() => {
    if (validateHandler.value) {
      return user.password.length >= 8;
    }
  });

  const loginValid = computed(() => {
    return (
      validationEmail.value &&
      validationPassword.value
    );
  });

  const registerValid = computed(() => {
    return (
      validationusername.value &&
      validationEmail.value
    );
  });

  const signUp = async () => {
    console.log(user)
    errorList.value = [];
    validateHandler.value = true;

    try {
      const register = await API_HANDLER({
        ...REGISTER,
        body: {
          ...user,
          
        },
      });
      if (register && register.access_token) {
        // Store the token after successful registration
        useAuth.setTokens(register.access_token);
        
        // Fetch user data after successful registration
        await FetchUser();
        
        // Redirect to home page
        location.href = `${CORE.ROOT}`;
      } else {
        errorList.value = register?.message?.errors || "Ошибка при регистрации";
      }
    } catch (error) {
      console.log(error);
      errorList.value = ["Ошибка при регистрации. Попробуйте еще раз."];
    } finally {
      validateHandler.value = false;
    }
  };

  const signIn = async () => {
    console.log(user)
    validateHandler.value = true;
    errorMassage.value = "";
    const body = {
       email: user?.email,
       password: user?.password,
     };

    try {
      const login = await API_HANDLER({
        ...LOGIN_ACCESS_TOKEN,
        body,
      });
      if (login && login.access_token) {
        // Store the token in the auth store
        useAuth.setTokens(login.access_token);
        
        // Fetch user data after successful login
        await FetchUser();
        
        location.href = `${CORE.ROOT}`;
        console.log("успешная авторизация", login);
      } else {
        errorMassage.value = "Неправильный логин или пароль";
      }
    } catch (error) {
      console.log(error);
      errorMassage.value = "Ошибка при входе. Попробуйте еще раз.";
    } finally {
      validateHandler.value = false;
    }
  };

  const FetchUser = async () => {
    try {
      const resData = await API_HANDLER(GET_CURRENT_USER);
      if (resData) {
        userStore.setUser(resData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    signIn,
    signUp,
    FetchUser,
    errorMassage,
    errorList,
  };
}