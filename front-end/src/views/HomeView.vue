<template>
  <main class="form-container">
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


      <!--priority-->
      <n-button class="btn-send" size="large">Enviar</n-button>
    </n-form>
  </main>
</template>

<script setup lang="ts">
import {NForm, NFormItem, NButton, NInput} from 'naive-ui';

import {ref} from "vue";

interface IUser {
  email: string;
  bugName: string;
  description:string;

}

const user = ref(<IUser>{
  email: "",
  bugName: ""
});

</script>


<style>
.form-container {
  width: 80rem;
  max-width: 95%;

  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;

  border-radius: 0.3rem;
  background-color: #ffffff;
}

.btn-send {
  width: 100%;
}

</style>
