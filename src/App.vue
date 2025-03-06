<script setup lang="ts">
import { Plus, Trash2 } from "lucide-vue-next";
import Button from "./components/ui/button/Button.vue";
import WarningText from "./components/customUI/warningText/WarningText.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useAccountsStore } from "./store/accounts";
import { onMounted, ref } from "vue";
import type { Account } from "./models/account";
import type { AcceptableValue } from "reka-ui";

const store = useAccountsStore();

const accountsList = ref<Account[]>([]);

function addAccount() {
  store.counter += 1;

  accountsList.value.push({
    id: store.counter,
    mark: "",
    validateMark: true,
    accountType: null,
    login: "",
    validateLogin: true,
    password: "",
    validatePassword: true,
  });

  store.accountsList = JSON.parse(JSON.stringify(accountsList.value));
  store.saveToLocalStorage();
}

function deleteAccount(id: number) {
  const newAccountsList = accountsList.value.filter(
    (account) => account.id !== id,
  );

  accountsList.value = newAccountsList;

  store.accountsList = JSON.parse(JSON.stringify(accountsList.value));
  store.saveToLocalStorage();
}

function validateMarkHandler(account: Account) {
  const currentAccount = accountsList.value.find(
    (item) => item.id === account.id,
  );

  if (!currentAccount) {
    return;
  }

  if (account.mark.length > 50) {
    currentAccount.validateMark = false;
  }

  if (account.mark.length < 50) {
    currentAccount.validateMark = true;
  }

  // transform string to array

  const transformedList = JSON.parse(JSON.stringify(accountsList.value));

  const transformedAccount = transformedList.find(
    (item: Account) => item.id === account.id,
  );

  transformedAccount.mark = currentAccount.mark.split(";");
  transformedAccount.mark = transformedAccount.mark.map((item: string) => ({
    text: item.trim(),
  }));

  if (currentAccount.validateMark) {
    store.accountsList = JSON.parse(JSON.stringify(transformedList));
    store.saveToLocalStorage();
  }
}

function validateLoginHandler(account: Account) {
  const currentAccount = accountsList.value.find(
    (item) => item.id === account.id,
  );

  if (!currentAccount) {
    return;
  }

  if (account.login.length === 0 || account.login.length > 100) {
    currentAccount.validateLogin = false;
  } else {
    currentAccount.validateLogin = true;
  }

  if (currentAccount.validateLogin) {
    store.accountsList = JSON.parse(JSON.stringify(accountsList.value));
    store.saveToLocalStorage();
  }
}

function validatePasswordHandler(account: Account) {
  const currentAccount = accountsList.value.find(
    (item) => item.id === account.id,
  );

  if (!currentAccount) {
    return;
  }

  if (account.password.length === 0 || account.password.length > 100) {
    currentAccount.validatePassword = false;
  } else {
    currentAccount.validatePassword = true;
  }

  if (currentAccount.validatePassword) {
    store.accountsList = JSON.parse(JSON.stringify(accountsList.value));
    store.saveToLocalStorage();
  }
}

function validateTypeAccount(account: Account, value: AcceptableValue) {
  const currentAccount = accountsList.value.find(
    (item) => item.id === account.id,
  );

  if (!currentAccount) {
    return;
  }

  if (!value) {
    return;
  }

  currentAccount.accountType = value?.toString();

  store.accountsList = JSON.parse(JSON.stringify(accountsList.value));
  store.saveToLocalStorage();
}

// Метод для загрузки состояния из localStorage
function loadFromLocalStorage() {
  const accounts = localStorage.getItem("accounts");
  if (accounts) {
    accountsList.value = JSON.parse(accounts);
  }
}

onMounted(() => {
  loadFromLocalStorage();
  store.loadFromLocalStorage();
});
</script>

<template>
  <div class="flex justify-center">
    <div class="flex w-9/12 flex-col gap-4 p-2 align-middle">
      <div class="flex justify-start gap-2 align-middle text-2xl">
        <h2>Учетные записи</h2>
        <Button @click="addAccount"><Plus /></Button>
      </div>

      <WarningText />

      <Table>
        <TableCaption> Таблица </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Метки </TableHead>
            <TableHead class="w-[200px]"> Тип записи </TableHead>
            <TableHead> Логин </TableHead>
            <TableHead> Пароль </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="account in accountsList">
            <TableCell class="font-medium">
              <Input
                @change="validateMarkHandler(account)"
                :class="{
                  'border-red-500': !account.validateMark,
                  'border-4': !account.validateMark,
                }"
                v-model="account.mark"
                placeholder="Значение"
              />
            </TableCell>

            <TableCell>
              <Select
                @update:modelValue="
                  (value) => validateTypeAccount(account, value)
                "
                :modelValue="account.accountType"
              >
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Тип записи" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="LDAP"> LDAP </SelectItem>
                    <SelectItem value="local"> Локальная </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell>
              <Input
                @change="validateLoginHandler(account)"
                :class="{
                  'border-red-500': !account.validateLogin,
                  'border-4': !account.validateLogin,
                }"
                v-model="account.login"
                placeholder="Значение"
              />
            </TableCell>

            <TableCell v-if="account.accountType === 'local'">
              <Input
                @input="validatePasswordHandler(account)"
                :class="{
                  'border-red-500': !account.validatePassword,
                  'border-4': !account.validatePassword,
                }"
                v-model="account.password"
                type="password"
                placeholder="Значение"
              />
            </TableCell>
            <TableCell v-else></TableCell>

            <TableCell>
              <Button @click="deleteAccount(account.id)" variant="ghost">
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
