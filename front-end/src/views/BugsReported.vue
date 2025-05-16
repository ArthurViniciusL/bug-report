<template>
  <div>
    <h2>Bugs Registrados:</h2>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>e-mail</th>
        <th>nome do Bug</th>
        <th>descrição</th>
        <th>prioridade</th>
        <th>status</th>
      </tr>
      </thead>
      <tbody>
      <!-- Linhas da tabela geradas dinamicamente -->
      <tr v-for="bug in bugsList" :key="bug.id">
        <td>{{ bug.id }}</td>
        <td>{{ bug.userEmail }}</td>
        <td>{{ bug.bugName }}</td>
        <n-tooltip v-if="bug.description.length > 50" placement="bottom" trigger="hover">
          <template #trigger>
            <td>{{ bug.description.slice(0, 50) + '...' }}</td>
          </template>
          <span class="app-font-capitalize"> {{ bug.description }} </span>
        </n-tooltip>
        <td v-else>{{ bug.description }}</td>
        <td>{{ bug.priority }}</td>

        <td>
          <n-popselect
              v-model:value="selectedStatus"
              :options="statusOptions"
              size="large"
              trigger="click"
              @update:value="(value) => handleStatusChange(value, bug.id)"
          >
            <n-button style="width: 10rem" strong round :type="getStatusButtonType(bug.status)">
              {{ getStatusLabel(bug.status) }}
            </n-button>
          </n-popselect>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {NButton, NTooltip, NSpace, NPopselect, NAutoComplete} from 'naive-ui';
import {ref, onMounted} from 'vue';
import axios from 'axios';

interface Bug {
  id: string;
  userEmail: string;
  bugName: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
}

const bugsList = ref<Bug[]>([]);
const filteredBugs = ref<Bug[]>([]);
const selectedStatus = ref<string | null>(null);

const statusOptions = [
  {label: 'Não Corrigido', value: 'não corrigido'},
  {label: 'Em Correção', value: 'em correção'},
  {label: 'Corrigido', value: 'corrigido'},
];

const getStatusLabel = (value: string) => {
  return statusOptions.find(option => option.value === value)?.label || value;
};

const updateBugStatus = async (bugId: number, newStatus: string) => {
  try {
    const response = await axios.put(`http://localhost:3000/bugs/${bugId}`, {
      status: newStatus
    });

    if (response.data) {
      // Atualiza o status localmente
      const bugIndex = bugsList.value.findIndex(bug => bug.id === bugId);
      if (bugIndex !== -1) {
        bugsList.value[bugIndex].status = newStatus;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status do bug:', error);
    throw error;
  }
};

const getStatusButtonType = (status: string) => {
  switch (status) {
    case 'em correção':
      return 'warning';
    case 'corrigido':
      return 'primary';
    case 'não corrigido':
    default:
      return 'default';
  }
};

const handleStatusChange = async (newStatus: string, bugId: number) => {
  await updateBugStatus(bugId, newStatus);
  selectedStatus.value = null;
};

onMounted(async () => {
  try {
    const response = await axios.get<Bug[]>('http://localhost:3000/bugs');
    bugsList.value = response.data;
    filteredBugs.value = [...response.data];
  } catch (error) {
    console.error('Erro ao carregar bugs:', error);
  }
});

</script>

<style scoped>
.table {
  width: 100%;
  margin: 1rem 0;
  border-radius: 3rem;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--secondary-white);

  &:hover {
    border-bottom: 1px solid var(--vue-green-01);
  }
}

.table th {
  text-align: center;
  font-weight: 600;
  background-color: var(--secondary-white);
}

.table td {
  font-size: 0.8rem;
  font-weight: lighter;
}

.table tr:hover {
  color: var(--vue-green-01);
  background-color: var(--secondary-white);
}
</style>