import { useState } from "react";
import "./App.css";
import data from "./data.json";
import { formatCents } from "./formatCents";

function App() {
  const [selectedLocationId, setSelectedLocation] = useState(-1);
  const availableLocations = data.locations;

  const getLocationPizza = () => {
    return data.location_products.filter(
      (locationProduct) => locationProduct.location_id === selectedLocationId
    );
  };

  return (
    <>
      <h1>Order a pizza</h1>
      <hr />
      {/* select location */}
      <div>
        <h4>Select a location</h4>
        {availableLocations.map((location) => (
          <button
            onClick={() => setSelectedLocation(location.id)}
            key={`location_${location.name}`}
            style={{
              backgroundColor:
                location.id === selectedLocationId ? "red" : "transparent",
            }}
          >
            {location.name}
          </button>
        ))}
      </div>
      <hr />
      {/* show menu if location is selected */}
      <div>
        {(getLocationPizza() || []).map((locationProduct) => {
          const product = data.products.find(
            (product) => product.id === locationProduct.product_id
          );

          return (
            <p>
              {product?.name} - {formatCents(locationProduct.price_cents)}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default App;
