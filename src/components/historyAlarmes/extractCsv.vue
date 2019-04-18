<template>
    <div>
        <v-btn  v-on:click="csvCreated">Telecharger les données</v-btn>
    </div>
</template>
<script>
import csvWrite from'./csvWrite.js'

export default {

     props:['datas'],


    data() {
        return {
            records:[]
        }
    },
    methods: {
        csvCreated(){
            /* this.datas.forEach(data => {

                let record = [data.bipName,data.alarme,data.date.toLocaleString(),data.useArea,data.user.company,data.user.useArea];
                console.log(record)
                //marche pas
                this.records.push(record);
            })
            console.log(this.records)*/
            csvWrite(this.datas) ;
           
        }
    },
}
</script>
