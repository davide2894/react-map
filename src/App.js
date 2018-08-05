import React, { Component } from 'react';
import './App.css';
import * as locations from "./locations.json";
import ListView from './components/ListView';
import InfoWindow from './components/InfoWindow';
import { slide as Menu } from 'react-burger-menu';

class App extends Component {

  state = {
    currentLocationDescription: "",
    currentLocationRating: "",
    isinfoWindowOpen: false,
    locations: locations,
    currentMarker: {},
    markers: [],
    googleMap: ""
  }

  componentDidMount(){
    window.initMap = this.initMap;
    this.loadMap();  
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
      console.log('res',res);
      if(res.ok){
				return res.json();
			} else {
				throw new Error("Sorry, can't get information from Foursquare...");			
			}
		})
		.then(resp => {
      console.log(resp);
			this.setState({
        currentLocationRating: resp.response.venue.rating,
        currentLocationDescription: resp.response.venue.description
      })
		})
		.catch((error) => {
			alert(error);
		})
  }

  render() {
    
    return (
      <div className="App">
        <Menu  
          tabIndex={0}
          role="Menu"
          className=" "
          width={280}
          noOverlay
          disableOverlayClick
          onClick={this.menuIsClicked}
          ref={(input) => { this.nameInput = input; }} 
          isOpen={true}
         >
          <ListView
            locations={this.state.locations}
            markers={this.state.markers}
            openInfoWindow={this.openInfoWindow}
          />
          {
            this.state.isInfoWindowOpen &&
            <InfoWindow
              currentMarker={this.state.currentMarker}
              currentLocationRating={this.state.currentLocationRating}
              currentLocationDescription={this.state.currentLocationDescription}
            />
          }   
        </Menu>
        <div id="googleMap" role="application">
        </div>
      </div>
    );
  }
}

export default App;