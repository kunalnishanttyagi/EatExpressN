import React from 'react'
// import scooter from "../assets/scooter.png"
// import home from "../assets/home.png"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
const deliveryBoyIcon = new L.Icon({
    iconUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTRBSnrBiDJO700B_oka9mOAJbm95Nk6HR_XW5ARViBhILFurkw9hct6hZwEqRctu1GfXecYwrzVQ1eK7ogf2Gqwq2OP-M3lTaZqQr9X_BQpsA_xh3HqhX74Q",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
const customerIcon = new L.Icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAZlBMVEX///8AAAABAQG1tbU8PDw/Pz9ERETv7+/09PR2dnbb29uioqLU1NQgICDFxcW6urqFhYUsLCyLi4uTk5NsbGzn5+fLy8ubm5sODg4XFxcxMTE2NjZ+fn6qqqpMTEwlJSVWVlZeXl5Tn/4qAAAD00lEQVR4nO2bbZuqKhSGw8y3NCvD0Ezt///J7VqmougeOynOvs6658MAad3zSAjU7HYEQRAEQRAEQRAEQRAE8c8TRzljeeRv7SHjJgxJsq1NWrjJWky+tU2NY6FOWeIvy9naB7AvlYrYQ3EvquLF3tqoySmsK+HvyMouoH/HTTWGHl/UWXH/jW5JG3M6dQ0nzAqsTm33L/WOFHZQvWYQy00xNtm7mEnozErJCaizcs7M6KSOGp0SJScAszKrEd7Yh/t9eK+qV21OHHNSnHbvK2cwA2veRaMU9qdixKmyKjaS4oeJnNCqctpACsdxtT+1VsEGSfEH5NQbf1xXrvlwAfVK2Snk1BsLroOXPgWapXiq5gQtw6x0SuG1S3o5netB8iy3nXRKcbwHqzmpWemTwnmm6L3vMKcoUrLSJsXx3qLmdMW+PshKk1Q9H+/llL2d3lbDtcP6UhxetvDkJswpqsvRSFarS03lFDW1kaxAas01DuZ0UXO6d/W7klV9k1zNqs5J7eOR3KJeQX/N9SDmlMpOzjAnoM5KngD76WpZ1ffg3rW7KTkBmNVNbvGg5bGCFRfDnJT+1KD2K8xKLG7lpTNzAiaySr2xg/87PBjPaWKZchzPKlg0Kw/3C2bmBIxkJZTh5EsnmBdcZucEjGR1UW4GXwFrqeSDnICRrOBWbi3lFAsmXHUc/2HZq2blvYZzni8Ih+/828RY0OeuZAUt4UJSVe7JTXKY56RaPUsx6AXfcJfnlM5cp8aqueOcZ583j7M0I5nv1M8qG58tf0HUWDmvGX28A3v7y9kN513LkL2tPskJaLLKpKyXA589Q6fnJ+c90SpbuD81nNl7b+7D58a/Bk5dtD/Jz258viMNe9rGOjkBV7Q6tJv33l9p3O0DOq22oOHPnHVSF/Z3eCvF8ueaH9lkndTpB6cmG5Ba98Mtt5MKf5I6d1LKWn5Nqew4wTXZTmpyHuIH7XCmXeo0dRxIHUlqplT2G6W26ugkRVIkRVIktaKU1kkeSf0vpFbo6E4HSPG6uK+kQmcC+LpEVp8In8240kPLOB1zq6UKQNSlHPagH9YEZrX+LN7nCcaC7pF8kS/j8P7CyRgpjTJ54BLr0oHU9yyyWA4tc0EOS+3EEgRBEARBEARBEARBEARB/CvsfyG7pTekl2BnAFXh1TYZOhn6YOMO/o2SMdf0TTe9lXlZJvg/qO8fqfhhdeahRVAkiWGawkwfD/NSYCMmxco45ncex3bs+6bOqFhqlS/3YOVFmeaWVQSsSyqIQ372/Gu8j+OH1qTg+hVMGEKIRDQP/AFb4j/gMWoZQgAAAABJRU5ErkJggg==",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
function DeliveryBoyTracking({ data }) {

    const deliveryBoyLat = data.deliveryBoyLocation.lat
    const deliveryBoylon = data.deliveryBoyLocation.lon
    const customerLat = data.customerLocation.lat
    const customerlon = data.customerLocation.lon

    const path = [
        [deliveryBoyLat, deliveryBoylon],
        [customerLat, customerlon]
    ]

    const center = [deliveryBoyLat, deliveryBoylon]

    return (
        <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>
            <MapContainer
                className={"w-full h-full"}
                center={center}
                zoom={16}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
             <Marker position={[deliveryBoyLat,deliveryBoylon]} icon={deliveryBoyIcon}>
             <Popup>Delivery Boy</Popup>
             </Marker>
              <Marker position={[customerLat,customerlon]} icon={customerIcon}>
             <Popup>Delivery Boy</Popup>
             </Marker>


<Polyline positions={path} color='blue' weight={4}/>

            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking
