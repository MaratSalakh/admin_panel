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
import type { Account, NewAccount } from "./models/accountTypes.ts";
import type { AcceptableValue } from "reka-ui";
import lodash from "lodash";

const store = useAccountsStore();
const accountsList = ref<Account[]>([]);

function saveToStore(currentAccount: Account) {
  const currentStoreAccountIndex = store.accountsList.findIndex(
    (item) => item.id === currentAccount.id,
  );

  const normalizedMark = currentAccount.mark.split(";").map((item: string) => ({
    text: item.trim(),
  }));

  let normalizedAccount;
  if (currentAccount.accountType === "LDAP") {
    normalizedAccount = {
      ...currentAccount,
      mark: normalizedMark,
      password: null,
    };
  } else {
    normalizedAccount = {
      ...currentAccount,
      mark: normalizedMark,
    };
  }

  if (currentStoreAccountIndex === -1) {
    store.accountsList.push(lodash.cloneDeep(normalizedAccount));
  } else {
    store.accountsList[currentStoreAccountIndex] =
      lodash.cloneDeep(normalizedAccount);
  }

  store.saveToLocalStorage();
}

function validation(currentAccount: Account) {
  validateMarkHandler(currentAccount);
  validateTypeAccount(currentAccount);
  validateLoginHandler(currentAccount);
  validatePasswordHandler(currentAccount);

  if (
    currentAccount.validateMark &&
    currentAccount.validateLogin &&
    currentAccount.validatePassword &&
    currentAccount.validateAccountType
  ) {
    saveToStore(currentAccount);
  }
}

function addAccount() {
  accountsList.value.push({
    id: accountsList.value.length + 1,
    mark: "",
    validateMark: true,
    accountType: null,
    validateAccountType: true,
    login: "",
    validateLogin: true,
    password: "",
    validatePassword: true,
  });
}

function deleteAccount(id: number) {
  accountsList.value = accountsList.value.filter(
    (account) => account.id !== id,
  );

  store.deleteAccount(id);
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
}

function validateLoginHandler(account: Account) {
  if (account.login.length === 0 || account.login.length > 100) {
    account.validateLogin = false;
    return;
  }
  account.validateLogin = true;
}

function validatePasswordHandler(account: Account) {
  if (account.accountType === "LDAP") {
    account.validatePassword = true;
    return;
  }

  if (!account.password) {
    account.validatePassword = false;
    return;
  }

  if (account.password.length === 0 || account.password.length > 100) {
    account.validatePassword = false;
    return;
  }
  account.validatePassword = true;
}

function validateTypeAccount(account: Account) {
  if (account.accountType === null) {
    account.validateAccountType = false;
  }

  if (account.accountType === "local") {
    account.validateAccountType = true;
  }

  if (account.accountType === "LDAP") {
    account.validateAccountType = true;
  }
}

function typeAccountHandler(
  account: Account,
  value: AcceptableValue | undefined,
) {
  if (value === null || value === undefined) {
    return;
  }

  account.accountType = value?.toString();

  if (account.accountType === "LDAP") {
    account.password = "";
  }

  validation(account);
}

const normilizeStoreData = (storeData: NewAccount[]) => {
  return storeData.map((account) => {
    const normilizeMark = account.mark.reduce((acc, currentValue) => {
      return acc === "" ? currentValue.text : `${acc};${currentValue.text}`;
    }, "");

    if (account.password === null) {
      return { ...account, password: "", mark: normilizeMark };
    }

    return {
      ...account,
      password: `${account.password}`,
      mark: normilizeMark,
    };
  });
};

onMounted(() => {
  store.loadFromLocalStorage();
  accountsList.value = normilizeStoreData(store.accountsList);
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
                @change="validation(account)"
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
                  (value) => typeAccountHandler(account, value)
                "
                :modelValue="account.accountType"
              >
                <SelectTrigger class="w-[180px]">
                  <SelectValue
                    :class="{
                      'text-red-500': !account.validateAccountType,
                    }"
                    placeholder="Тип записи"
                  />
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
                @change="validation(account)"
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
                @change="validation(account)"
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
