import './Map.css';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import {showDataOnMap} from '../util/util';

function Map({ countries, casesType, center, zoom}) {
  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer 
          url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          noWrap='true'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
