
export default function csvWrite(datas){

        const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
        const csvStringifier = createCsvStringifier({
            header:[{id: 'bipName', title: 'Nom du bip'},
            {id: 'alarme', title: "Type d'alarme"},
            {id:"date",title:"Date"},
            {id:"useArea",title:"Zone de rattachement"},
            {id:"user.company",title:"Entreprise"},
            {id:"user.useArea",title:"Zone d'utilisation"}]
        });
         
        datas.forEach(data => {
           let date = data.date.toJSON()
            data.date = date.split('.000Z')[0].replace('T'," ")
            
        });

        const header = csvStringifier.getHeaderString();
        const records = csvStringifier.stringifyRecords(datas)
      
         const csv = header+records
         downloadCsv(csv)

         function downloadCsv (csv) {
            try {
              let uri = 'data:text/csv;charset=utf-8,' + '\uFEFF' + encodeURI(csv)
      
              let link = document.createElement('a')
      
              link.id = 'csv-file'
              link.href = uri
      
              document.body.appendChild(link)
      
              document.getElementById(link.id).style.visibility = 'hidden'
              document.getElementById(link.id).download = 'extract.csv'
      
              document.body.appendChild(link)
              document.getElementById(link.id).click()
      
              setTimeout(function () {
                document.body.removeChild(link)
              })
              return true
            } catch (err) {
              return false
            }
          }
      
}
