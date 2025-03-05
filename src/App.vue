<script setup lang="ts">
import { Plus } from "lucide-vue-next";
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
            <TableHead class="w-[100px]"> Метки </TableHead>
            <TableHead>Тип записи</TableHead>
            <TableHead>Логин</TableHead>
            <TableHead class="text-right"> Пароль </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="font-medium"> XXX </TableCell>
            <TableCell> Локальная </TableCell>
            <TableCell> Значение </TableCell>
            <TableCell class="text-right"> Пароль </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
