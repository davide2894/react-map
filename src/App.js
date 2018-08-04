import React, { Component } from 'react';
import './App.css';
import * as locations from "./locations.json";
import ListView from './components/ListView';
import InfoWindow from './components/InfoWindow';

class App extends Component {

  state = {
    isinfoWindowOpen: false,
    currentLocationInfo: '',
    locations: locations,
    currentMarker: {},
    markers: [],
    googleMap: "",
  }

  initMap = () => {

    const referToThis = this;
    
    let map = new window.google.maps.Map(document.getElementById("googleMap"), {
      zoom: 14,
      center: { lat: 44.498955, lng: 11.327591 }
    });

    this.setState({map})

    this.state.locations.map( location => {
      let marker = new window.google.maps.Marker({
        map: map,
        position: location.position,
        title: location.title,
        id: location.venueId,
        animation: window.google.maps.Animation.DROP
      });
  
      this.state.markers.push(marker);
  
      marker.addListener('click', function () {
        referToThis.openInfoWindow(marker);
      });

      return marker;
      
    })

    map.addListener('click', ()=>{
      referToThis.closeInfoWindow();
    })
  }

  openInfoWindow = (marker) => {
    this.setState({
      isInfoWindowOpen: true,
      currentMarker: marker
    })
    this.getFourSquareInfo(marker)
  }

  closeInfoWindow = () => {
    this.setState({
      isInfoWindowOpen: false,
      currentMarker: {}
    });
  }

  getFourSquareInfo = (marker) => {

    console.log(marker);
    console.log('clickedMarkerID', marker.id);
    
    const endpoint = 'https://api.foursquare.com/v2/venues/';

		const params = {
		  client_id: 'RJZMA0DVSXNVV1VEXCS2ZO3D2NE0ZLW1HV40AUKF5WKWUX1O',
		  client_secret: 'JPMG5BHSRIECSFICJ3B1INNWNZIVU4JG3OVRFFC1WU0JT3FF',
		  v:"20180323"
    };
    
	
		fetch(`${endpoint}${marker.id}?client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`, {
			method: 'GET'
		})
		.then(res => {
			if(res.ok){
				return res.json();
			} else {
				alert("Sorry, can't get information from Foursquare...");
				throw new Error("Sorry, can't get information from Foursquare...");			
			}
		})
		.then(resp => {
      console.log(resp)
			this.setState({currentLocationInfo: resp.response.venue.rating})
		})
		.catch((error) => {
			console.log(error);
		})
  }


  loadMap = () => {
    let reference = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCUXBzFr_nKA31GsOSxyGPiGV2ct6fgcR0&callback=initMap';
    script.async = true;
    reference.parentNode.insertBefore(script, reference);
  
    script.onerror = function () {
      document.write("Sorry, Google Maps didn't load...");
    };
  }

  componentDidMount(){
    window.initMap = this.initMap;
    this.loadMap();  
  }

  render() {
    return (
      <div className="App">

        <ListView
          locations={this.state.locations}
          markers={this.state.markers}
          openInfoWindow={this.openInfoWindow}
        />
        {
          this.state.isInfoWindowOpen &&
          <InfoWindow
            currentMarker={this.state.currentMarker}
            currentLocationInfo={this.state.currentLocationInfo}
          />
        }   
        <div id="googleMap" role="application">
        </div>
      </div>
    );
  }
}

export default App;