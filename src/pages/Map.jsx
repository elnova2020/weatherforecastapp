import { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { mapService } from '../services/mapService'



export class _MapContainer extends Component {

  state = {
    userLocation: null,
    activeMarker: {},
    selectedPlace: {},
    addresseName: '',
    places: [],
    isWrongLoc: false
  };

  componentDidMount() {
    this.loadPlaces()

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { coords } = pos
        console.log('Current location...', coords)

        this.setState({
          ...this.state,
          userLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }
  }

  // onMapClicked = () => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }
  // }


  loadPlaces = () => {
    var places = mapService.getPlaces()
    this.setState({
      ...this.state,
      places

    })
  }

  // onGoToCurrent = () => {

  // }

  onAddMarker = async (ev) => {
    ev.preventDefault()
    try {
      var addressForQuerry = this.state.addresseName.replace(/\s/g, "%20");

      const newLoc = await mapService.query(addressForQuerry)
      this.setState({
        ...this.state,
        places: [...this.state.places, { name: this.state.addresseName, lat: newLoc.lat, lng: newLoc.lng }],
        isWrongLoc: false
      }, () => {
        mapService.addPlace({ name: this.state.addresseName, lat: newLoc.lat, lng: newLoc.lng })
      })

    } catch (err) {
      console.log('Could not add marker', err);
      this.setState({
        ...this.state,
        isWrongLoc: true
      })
    }

  }


  onHandleChange = ({ target }) => {
    this.setState({
      ...this.state,
      addresseName: target.value
    })
  }

  onMarkerClick = (props, marker, ev) => {

    console.log('Marker name...', marker);
    this.setState({ ...this.state, 
                  // selectedPlace: { ...this.state.selectedPlace, name: ev.name },
                activeMarker : marker })

  }

  render() {
    const { places, isWrongLoc, userLocation } = this.state

    if (!places || !userLocation) return <div>Loading...</div>
    return (
      <section className="page-map">

        <form className="page-map-form flex align-center justify-center" action="" onSubmit={this.onAddMarker} >
          <input className="page-map-input" type="text" placeholder="Type location" onChange={this.onHandleChange} />
          <button>Add Marker</button>
        </form>

        {isWrongLoc && <div className="page-map-wrong-loc">You have entered a wrong location , please try again.</div>}

        <Map
          google={this.props.google}
          initialCenter={userLocation}
          onClick={this.onMapClicked}
          zoom={14}
          style={{ position: 'relative', width: '85%', height: '700px', margin: 'auto', bottom: '0' }}>
          <Marker name={'Your current position'} position={userLocation} onClick={this.onMarkerClick} /> 
          {places.map((place, idx) => <Marker key={idx} name={place.name} position={{ lat: place.lat, lng: place.lng }} onClick={this.onMarkerClick}/>)}

          <InfoWindow marker={this.state.activeMarker} visible={true} >
            <div>
              <h3>{this.state.activeMarker.name}</h3>
            </div>
          </InfoWindow>
        </Map>

      </section>
    );
  }
}

export const MapContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyCH-jmqS38VxKTB2yaaz9xPB95yW3TyeG4')
})(_MapContainer)


