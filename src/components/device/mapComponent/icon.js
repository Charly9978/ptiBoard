import L from 'leaflet'

let LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [51, 51],
        iconAnchor:   [25, 0],
        popupAnchor:  [0, 51]
    }
});

export const greenIcon = new LeafIcon({iconUrl: require('./marker-green.png')})
export const blueIcon = new LeafIcon({iconUrl:require('./marker-blue.png')})
export const redIcon = new LeafIcon({iconUrl: require('./marker-red.png')})
export const orangeIcon = new LeafIcon({iconUrl: require('./marker-orange.png')});
