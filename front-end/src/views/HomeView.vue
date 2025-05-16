<template>
  <n-form >
    <n-form-item label="* Digite seu e-mail:" path="user.email">
      <n-auto-complete
          v-model:value="user.email"
          :input-props="{ autocomplete: 'disabled', }"
          :options="emailOptions"
          placeholder="Ex: nome@email.com"
          clearable
      />
    </n-form-item>


    <n-form-item label="Digite um nome para o bug:" path="user.bugName">
      <n-input
          v-model:value="user.bugName"
          placeholder="Ex: Erro de responsividade no layout"
      />
    </n-form-item>

    <n-form-item label="* Descreva o bug:" path="user.description">
      <n-input
          v-model:value="user.description"
          type="textarea"
          placeholder="Ex: O layout está ultrapassando a margem de visualização da tela..."
          required
      />
    </n-form-item>

    <n-form-item label="* Prioridade para corrigir o bug:">
      <n-radio-group v-model:value="priority" name="priority">
        <n-radio value="Definitely Maybe">
          Baixa
        </n-radio>
        <n-radio value="Be Here Now">
          Média
        </n-radio>
        <n-radio value="Definitely High">
          Alta
        </n-radio>
      </n-radio-group>
    </n-form-item>

    <button type="submit" class="btn-send" @click="handleSubmit">
      Enviar
    </button>

  </n-form>
</template>


<script setup lang="ts">
import {NForm, NFormItem, NInput, NRadioGroup, NRadio, NAutoComplete} from 'naive-ui';
import {ref, computed} from 'vue';
import axios from 'axios';
import type {AxiosError} from 'axios';

interface BugReport {
  userEmail: string;
  bugName: string;
  description: string;
  priority: 'baixa' | 'média' | 'alta';
  status: 'não corrigido';
}

// Dados reativos do formulário
const user = ref({
  email: '',
  bugName: '',
  description: '',
});

const emailOptions = computed(() => {
  const email = user.value.email;
  const prefix = email.includes('@') ? email.split('@')[0] : email;
  return ['@gmail.com', '@yahoo.com', '@hotmail.com'].map(domain => ({
    label: prefix + domain,
    value: prefix + domain,
  }));
});

const priority = ref<string>('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const priorityMap: Record<string, 'baixa' | 'média' | 'alta'> = {
  'low': 'baixa',
  'medium': 'média',
  'high': 'alta',
};

async function handleSubmit() {
  errorMessage.value = null;

  if (!user.value.email || !user.value.description || !priority.value) {
    errorMessage.value = 'Por favor, preencha todos os campos obrigatórios!';
    return;
  }

  isLoading.value = true;

  try {
    const bugReport: BugReport = {
      userEmail: user.value.email,
      bugName: user.value.bugName,
      description: user.value.description,
      priority: priorityMap[priority.value] || 'média',
      status: 'não corrigido',
    };

    const response = await axios.post('http://localhost:3000/bugs', bugReport, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Bug reportado com sucesso:', response.data);

    // Reset do formulário
    user.value = {email: '', bugName: '', description: ''};
    priority.value = '';

    alert('Bug reportado com sucesso! Obrigado pelo seu feedback.');

  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao reportar bug:', axiosError.response?.data);
    errorMessage.value = 'Erro ao enviar o relatório. Por favor, tente novamente mais tarde.';
  } finally {
    isLoading.value = false;
  }
};

</script>

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

.select-priority {
  display: flex;
  flex-direction: column;
}

</style>
