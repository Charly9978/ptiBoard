<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
import {db} from '@/main.js'


export default {
  name: 'google-map',
  props: ['name','nbr'],
  data() {
    return {
      mapName: this.name + "-map",
      datas: [],
      map: null,
      bounds: null,
      infoWindow: null,
      markers: [],
      positions:[]
    }
  },
  methods :{
    mapPosition(){
      this.datas = [];
      this.positions =[];
      this.markers =[];
    const trame = db.collection('Devices').doc('867856031189845').collection('trame');
    trame.orderBy('date','desc').limit(this.nbr)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            const data = doc.data();
            //console.log(position._lat)
            this.datas.push(data);
        })
        return console.log('telechargement des données terminée')
    }).then(()=>{

      this.bounds = new google.maps.LatLngBounds();

      this.infoWindow = new google.maps.InfoWindow();

  
      const element = document.getElementById(this.mapName)
      console.log('debut de montage de la carte')
      const mapCentre = this.datas[0].position
      const options = {
        center: new google.maps.LatLng(mapCentre._lat, mapCentre._long)
      }
  
      this.map = new google.maps.Map(element, options);
  
      this.datas.forEach((data) => {
        const position = new google.maps.LatLng(data.position._lat, data.position._long);
        this.positions.push(position)
        let colorMarker
          if(data.alarme.length>0 && !data.alarme.lowBattery ){
            colorMarker ='red'
          }else if(data.alarme.lowBattery) {
            colorMarker = 'orange'
          } else if(data.inCharge) {
            colorMarker = 'blue'
          }else{
            colorMarker = 'green'
          }
      
        const html = `<b>Date:${data.date.toLocaleString()}</b>
                      <br/>Vitesse:${data.speed}km/h 
                      <br/>Direction: ${data.dir} 
                      <br/>Précision Satellelite: ${data.fixedSatellite}/${data.availableSatellite}
                      <br/>Altitude: ${data.alt}m
                      <br/>Batterie: ${data.levelBattery}%
                      <br/><b>Alarme: ${data.alarme}`;
        const marker = new google.maps.Marker({ 
          position,
          icon: `http://maps.google.com/mapfiles/ms/icons/${colorMarker}-dot.png`,
          map: this.map
        });
        google.maps.event.addListener(marker, 'click', ()=>{
            this.infoWindow.setContent(html);
            this.infoWindow.open(this.map, marker);
          });

  
      this.markers.push(marker)
        
      this.map.fitBounds(this.bounds.extend(position))

      })
  
      const lineSymbol = {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
      };
  
  
      const path = new google.maps.Polyline({
      path: this.positions,
      icons: [{
      icon: lineSymbol,
      repeat: '10%'
      }],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
      });
  
      path.setMap(this.map);
    
    })
    }
  },
  mounted(){
    this.mapPosition()
  },
  watch:{
  nbr(){this.mapPosition()}
  }
}
</script>

<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>