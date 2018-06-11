/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

/** import dependencies */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

/** set icons leaflet */
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../../node_modules/leaflet/dist/images/marker-shadow.png')
})

/**
 * @class Map
 * @extends PureComponent
 */
class Map extends PureComponent {
    /** @constructor */
    constructor (props) {
        super(props)
        this.state = {
            map: undefined,
            markerGroup: undefined
        }
    }

    /**
     * handle add mark to location
     * @function addMarkers
     */
    addMarkers = () => {
        this.state.markerGroup.clearLayers()
        for (let index = 0; index < this.props.markers.length; index++) {
            L.marker([
                this.props.markers[index].latitude, 
                this.props.markers[index].longitude
            ]).addTo(this.state.markerGroup)
        }
        if (this.props.markers[0]) {
            this.state.map.setZoom(10)
            this.state.map.panTo(
                new L.LatLng(
                    this.props.markers[this.props.markers.length - 1].latitude, 
                    this.props.markers[this.props.markers.length - 1].longitude
                )
            )
        }
    }

    componentDidMount () {
        setTimeout(() => { 
            const map = L.map('map', {
                minZoom: 1,
                maxZoom: 18,
                center: [30.481913, 6.499247],
                zoom: 1,
                layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
                attributionControl: true,
                preferCanvas: true,
            })
            this.setState({ 
                map, 
                markerGroup: L.layerGroup().addTo(map)
            }, () => this.addMarkers())
        }, 0)
    }

    componentDidUpdate = (prevProps) => {
        if (this.state.map) {
            this.addMarkers()
            if (prevProps.selectedLocation !== this.props.selectedLocation) {
                this.state.map.panTo([
                    this.props.selectedLocation.latitude,
                    this.props.selectedLocation.longitude
                ])
                this.state.map.setZoom(10)
            }
        }
    }

    render () {
        return <div id="map" style={{...this.props.style, zIndex: 0}} />
    }
}
/** Map defaultProps */
Map.defaultProps = {
    style: { height: '40%' },
    markers: [],
    selectedLocation: null
}
/** Map propTypes */
Map.propTypes = {
    style: PropTypes.object,
    markers: PropTypes.array,
    selectedLocation: PropTypes.object
}

export default Map