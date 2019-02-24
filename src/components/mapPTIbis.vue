<template>
  <div class="openstreet-map" :id="mapName"></div>
</template>

<script>

import {db} from '@/main.js'

//import L from 'leaflet'
import 'leaflet-polylinedecorator'


export default {
  name: 'openstreet-map',
  props: ['id','nbr'],
  data() {
    return {
      mapName: this.id + "-map",
      nbrMarkers:this.nbr,
      myMap:"",
      datas: [],
      map: null,
      bounds: null,
      infoWindow: null,
      markers: [],
      markersLayer:null,
      polylineLayer:null
    }
  },
  methods :{
    getDatas(){
      this.datas = [];
    const trame = db.collection('Devices').doc(this.id).collection('trame');
    trame.orderBy('date','desc').limit(20)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            const data = doc.data();
            this.datas.push(data);
        })
        return console.log('telechargement des données terminée')
    })
    .then(()=>{
      console.log("montage de la carte")
      const mapCentre = this.datas[0].position

      this.myMap = L.map(this.mapName).setView([mapCentre._lat, mapCentre._long], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 23,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2hhcmx5Yjk5NzgiLCJhIjoiY2pzZHBiangzMDQ5azN5czB0aWhpMmVxeCJ9.0dxL9QR8OGbAZDpNuy9YRg'
}).addTo(this.myMap);

this.afficheMarkers()
      
    })},
    afficheMarkers: function(){
      console.log("montage des markers")
      this.markers=[];
      if(this.markersLayer!=null){
        this.markersLayer.remove()
      }    
      this.positions.forEach((data)=>{
        this.markers.push(L.marker([data.position._lat, data.position._long]))
      })
      this.markersLayer = L.layerGroup(this.markers).addTo(this.myMap)
      this.affichePolyLine()
    },
   affichePolyLine: function(){
     const datasPolyline=[]
     if(this.polylineLayer!=null){
       this.polylineLayer.remove()
     }
     this.positions.forEach((data)=>{
       datasPolyline.push([data.position._lat, data.position._long])
     })
    this.polylineLayer = L.polyline(datasPolyline).addTo(this.myMap)
     L.polylineDecorator(this.polylineLayer, {
    patterns: [
        // defines a pattern of 10px-wide dashes, repeated every 20px on the line
        {offset: 50, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
    ]
}).addTo(this.myMap)
   }
    },
    computed:{
        positions:function(){
          return  this.datas.slice(0,this.nbr);
        } 
    },
    
  
  mounted(){
    this.getDatas()
  },

  watch:{
    nbr:function(){
      this.afficheMarkers()
    }
  }
}
</script>

<style>
.openstreet-map {
  height: 600px;
  width: 95%;
  margin: auto auto;
}
</style>