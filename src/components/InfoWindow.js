import React, {Component} from 'react';

class InfoWindow extends Component{
    
    render(){
        return(
            <div 
                tabIndex={0}
                className="InfoWindowContainer"
            >

                <h2 className="locationTitle">{this.props.currentMarker.title}</h2>
                <blockquote className="locationInfo"><i>Rating provided by <a href="https://foursquare.com/">Foursquare</a></i>: {this.props.currentLocationInfo}</blockquote>

            </div>
        )
    }
}

export default InfoWindow;