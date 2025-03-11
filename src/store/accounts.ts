import type { NewAccount } from "@/models/account";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountsStore = defineStore("accounts", () => {
  const counter = ref(0);

  const accountsList = ref<NewAccount[]>([]);

  // Метод для сохранения состояния в localStorage
  function saveToLocalStorage() {
    localStorage.setItem("accounts", JSON.stringify(accountsList.value));
  }

  // Метод для загрузки состояния из localStorage
  function loadFromLocalStorage() {
    const accounts = localStorage.getItem("accounts");
    if (accounts) {
      accountsList.value = JSON.parse(accounts);
    }
  }
  return {
    counter,
    accountsList,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
});
