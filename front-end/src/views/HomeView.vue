<script setup lang="ts">
import {NForm, NFormItem, NButton, NInput} from 'naive-ui';

import {ref} from "vue";

interface IUser {
  email: string;
  bugName: string;
  description: string;
}

const user = ref(<IUser>{
  email: "",
  bugName: ""
});

</script>

<template>
    <n-form
    >
      <n-form-item label="* Digite seu e-mail:" path="user.email">
        <n-input v-model:value="user.email" placeholder="Ex: nome@email.com"/>
      </n-form-item>
      <n-form-item label="Digite um nome para o bug:" path="user.bugName">
        <n-input v-model:value="user.bugName" placeholder="Ex: Erro de responsividade no layout"/>
      </n-form-item>

      <n-form-item label="Descreva o bug:" path="user.bugName">
        <n-input
            v-model:value="user.description"
            type="textarea"
            placeholder="Ex: O layout está ultrassando a margem de visuzação da dela..."
        />
      </n-form-item>

      <button class="btn-send">
        Enviar
      </button>

    </n-form>
</template>

<style>

.btn-send {
  width: 100%;
  padding: 1rem;
  color: var(--vue-green-01);
  background-color: transparent;
  border: dashed var(--vue-green-01) 0.5px;


  &:hover {
    color: #ffffff;
    background-color: var(--vue-green-01);
  }
}

</style>
