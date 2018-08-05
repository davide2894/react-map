import React, {Component} from 'react';

class InfoWindow extends Component{
    
    render(){
        return(
            <div 
                tabIndex={0}
                className="InfoWindowContainer"
            >

                <h2 className="locationTitle">{this.props.currentMarker.title}</h2>
                <blockquote className="locationRating"><i>Rating provided by <a href="https://foursquare.com/">Foursquare</a></i>: {this.props.currentLocationRating}</blockquote>
                <p className="locationDescription"><i>Description</i>: {this.props.currentLocationDescription}</p>
            </div>
        )
    }
}

export default InfoWindow;