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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
</script>

<template>
  <div class="flex justify-center">
    <div class="flex w-9/12 flex-col gap-4 p-2 align-middle">
      <div class="flex justify-start gap-2 align-middle text-2xl">
        <h2>Учетные записи</h2>
        <Button><Plus /></Button>
      </div>

      <WarningText />

      <Table>
        <TableCaption>Таблица</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Метки </TableHead>
            <TableHead class="w-[200px]">Тип записи</TableHead>
            <TableHead>Логин</TableHead>
            <TableHead> Пароль </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="font-medium"> <Input /> </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Тип записи" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple"> LDAP </SelectItem>
                    <SelectItem value="banana"> Локальная </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell> <Input /> </TableCell>
            <TableCell> <Input type="password" /> </TableCell>
            <TableCell>
              <Button variant="ghost">
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
