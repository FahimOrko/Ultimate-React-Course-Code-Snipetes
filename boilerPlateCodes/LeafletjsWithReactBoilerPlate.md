## Using Leaflet.js

Leaflet.js is a JavaScript library for interactive maps. This section demonstrates how to integrate it with React using `react-leaflet`.

To use Leaflet.js, install the required npm packages:

```sh
npm i react-leaflet leaflet
```

### Boilerplate Code

Below is a basic example of rendering a map with markers for different cities.

```jsx
<MapContainer
  center={mapPosition}
  zoom={13}
  scrollWheelZoom={true}
  className={styles.map}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  {cities.map((city) => (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
  ))}
</MapContainer>
```
