import type { NewAccount } from "@/models/accountTypes.ts";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountsStore = defineStore("accounts", () => {
  const accountsList = ref<NewAccount[]>([]);

  function deleteAccount(id: number) {
    accountsList.value = accountsList.value.filter(
      (account) => account.id !== id,
    );
  }

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
    accountsList,
    saveToLocalStorage,
    loadFromLocalStorage,
    deleteAccount,
  };
});
