import React from 'react';
import axios from 'axios';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import './app.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			points: [],
		};
	}

	componentDidMount = async () => {
		const res = await axios.get(
			'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
		);
		const points = res.data.features;
		this.setState({
			points: points,
		});
	};

	greenIcon = L.icon({
		iconUrl:
			'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	yellowIcon = L.icon({
		iconUrl:
			'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
		shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	redIcon = L.icon({
		iconUrl:
			'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	renderIcon(masks) {
		if (masks === 0) {
			return this.redIcon;
		} else if (masks < 200 && masks > 50) {
			return this.yellowIcon;
		} else {
			return this.greenIcon;
		}
	}

	render() {
		console.log(this.renderIcon(500));
		return (
			<MapContainer
				center={[23.79037129915711, 120.95281938174952]}
				zoom={8}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerClusterGroup>
					{this.state.points.map((point) => {
						return (
							<Marker
								key={point.properties.id}
								position={point.geometry.coordinates.reverse()}
								icon={this.renderIcon(
									point.properties.mask_adult
								)}
							>
								<Popup>
									藥局：{point.properties.name}
									<br />
									地址：{point.properties.address}
									<br />
									大人口罩：{point.properties.mask_adult}
									<br />
									小孩口罩：{point.properties.mask_child}
								</Popup>
							</Marker>
						);
					})}
				</MarkerClusterGroup>
			</MapContainer>
		);
	}
}

export default App;
