<template>
  <v-card>
    <v-card-title>
      Historique des alarmes des Bip Pti
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="datas"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.bipName }}</td>
        <td class="text-xs-right">{{ props.item.alarme}}</td>
        <td class="text-xs-right">{{ props.item.date.toLocaleString()}}</td>
        <td class="text-xs-right">{{ props.item.useArea }}</td>
        <td v-if="props.item.user.name" class="text-xs-right">{{ props.item.user.company }}</td>
        <td v-if="props.item.user.name" class="text-xs-right">{{ props.item.user.useArea }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <extractCsv
    :datas="datas"
    />
  </v-card>
</template>

<script>

import extractCsv from './extractCsv.vue'

  export default {

    components:{
      extractCsv
    },
      props:['datas'],

    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nom du bip',
            align: 'left',
            value: 'bipName'
          },
          { text: "Type d'alarme", value: 'alarme' },
          { text: 'Date', value: 'date' },
          { text: "Rattachement", value: 'useArea' },
          { text: 'Utilisateur', value: 'user' },
          { text: "Zone d'utilisation", value: 'user' },
        ],
      }
    }
  }
</script>
