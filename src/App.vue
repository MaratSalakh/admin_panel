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
import { ref } from "vue";

let counter = 0;

const accountsList = ref<
  {
    id: number;
    mark: string;
    accountType: string | null;
    login: string;
    password: string;
  }[]
>([]);

const addAccount = () => {
  counter += 1;

  accountsList.value.push({
    id: counter,
    mark: "",
    accountType: null,
    login: "",
    password: "",
  });
};

const deleteAccount = (id: number) => {
  const newAccountsList = accountsList.value.filter(
    (account) => account.id !== id,
  );

  accountsList.value = newAccountsList;
};
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
              <Input placeholder="Значение" />
            </TableCell>

            <TableCell>
              <Select v-model="account.accountType">
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

            <TableCell> <Input placeholder="Значение" /> </TableCell>

            <TableCell v-if="account.accountType === 'local'">
              <Input type="password" placeholder="Значение" />
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
