<template>
  <v-card>
    <v-card-title>
      Historique d'utilisation des Bip Pti
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
        <td class="text-xs-right">{{ props.item.date.toLocaleString()}}</td>
        <td class="text-xs-right">{{ props.item.duree }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>

  export default {
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
          { text: 'Date', value: 'date' },
          {text:"Durée d'utilisation",value:'duree'}
        ],
      }
    }
  }
</script>
