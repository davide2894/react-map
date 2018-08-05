import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import * as locations from "../locations.json";

class ListView extends Component {

    state = {
        query: "",
        filteredLocations: locations,
        filteredMarkers: [],
        currentMarker: {}
    }

    componentDidMount(){
        this.setState({filteredMarkers: this.props.markers})
    }

    locationInListIsClicked = (location) => {

        let referToThis = this; 

        this.animateMarker(location);

        this.removeMarkerAnimations();

        setTimeout(()=>{
            this.removeMarkerAnimations();
        },500)

        this.getCurrentMarker(location);
        
        setTimeout(function(){
            referToThis.props.openInfoWindow(referToThis.state.currentMarker)
        }, 500);

    }

    getCurrentMarker = (location) => {
        this.state.filteredMarkers.map(marker =>
            marker.id === location.venueId 
                && this.setState({currentMarker: marker})
        );
    }

    updateFilteredLocations = (query) => {

        let referToThis = this;

        this.setState({query: query});
    
        if(query){
    
            const match = new RegExp(escapeRegExp(query), 'i');
    
            let locationsToDisplay = this.props.locations.filter(location => 
                match.test(location.title)
            );
            
            this.setState({filteredLocations: locationsToDisplay});

            let markersToDisplay = this.props.markers.filter(marker => 
                match.test(marker.title)
            );
            this.setState({filteredMarkers: markersToDisplay});
        
        } else {

            this.setState({
                filteredLocations: this.props.locations,
                filteredMarkers: this.props.markers
            })
        }

        this.props.markers.map(marker=>marker.setVisible(false));
        
        setTimeout(function(){
            referToThis.props.markers.map(marker=>
                referToThis.makeMarkersVisible(marker)
            )
        },500)
    }

    animateMarker = (location) => {
        
        // Animate marker corresponding to clicked location item
        this.state.filteredMarkers.map(marker=>
            marker.id === location.venueId &&
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
        )        
    }

    removeMarkerAnimations = () => {
        this.state.filteredMarkers.map(marker=>
            marker.setAnimation(null)
        )
    }

    makeMarkersVisible = (marker) => {
        this.state.filteredMarkers.map(filteredMarker=>
            filteredMarker.id === marker.id && filteredMarker.setVisible(true)
        )
    }
    
    render(){

        const {query} = this.state;

        return(     
            <section className='listViewContainer'>
                <form
                    className='locationFilter'
                    onSubmit={(event)=>event.preventDefault()}
                    >
                    <input
                        aria-labelledby="filter"
                        type="text"
                        placeholder="Look for a location"
                        value={query}
                        onChange={(event) => 
                            this.updateFilteredLocations(event.target.value)
                        }
                    />
                </form>
                <ul 
                    className="locationList"
                >
                {this.state.filteredLocations.map(location =>
                        <li 
                        key={location.id}
                        onClick={ () => this.locationInListIsClicked(location) }
                        onKeyPress={ () => this.locationInListIsClicked(location) }
                        tabIndex={0}
                        role="button"
					>
                        {location.title}

					</li>
				)}  
                </ul>
            </section>
        )   
    }
}

export default ListView;