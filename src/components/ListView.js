import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import * as locations from "../locations.json";

class ListView extends Component {

    state = {
        query: '',
        filteredLocations: locations,
        filteredMarkers: [],
        currentMarker: {}
    }

    componentDidMount(){
        this.setState({filteredMarkers: this.props.markers})
    }

    locationInListIsClicked = (location) => {
        let controlledThis = this;

        this.getCurrentMarker(location);
       
        setTimeout(function(){controlledThis.props.openInfoWindow(controlledThis.state.currentMarker)
        }, 0.5);
    }

    getCurrentMarker = (location) => {
        this.state.filteredMarkers.filter(marker => {
            marker.id === location.id && this.setState({currentMarker: marker})
        });
    }

    render(){
        const { query } = this.state;
        const { locations } = this.props;
                
        return(     
            <div className='listViewContainer'>
                <div className='query'>{query}</div>
                <form
                    role="searchbox"
                    className='locationFilter'
                    onSubmit={(event)=>event.preventDefault()}
                    >
                    <input
                        ref={(input) => { this.nameInput = input; }} 
                        aria-labelledby="filter"
                        type="text"
                        placeholder="Look for a location"
                        value={query}
                        onChange={(event) => 
                            this.updateQuery(event.target.value
                            )
                        }
                    />
                </form>
                <ul 
                    className="locationList"
                >
                {locations.map(location =>
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
            </div>
        )   
    }
}

export default ListView;