import { useState } from "react";
import "./App.css";
import data from "./data.json";
import { formatCents } from "./formatCents";

function App() {
  const [selectedLocationId, setSelectedLocation] = useState(-1);
  const [selectedPizzas, setSelectedPizzas] = useState<number[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const availableLocations = data.locations;

  const getLocationPizza = () => {
    return data.location_products.filter(
      (locationProduct) => locationProduct.location_id === selectedLocationId
    );
  };

  const handlePizzaSelected = (productId: number) => {
    const updatedSelectedPizzas = [...selectedPizzas];
    const selectedPizzaIndex = updatedSelectedPizzas.indexOf(productId);

    if (selectedPizzaIndex > -1) {
      updatedSelectedPizzas.splice(selectedPizzaIndex, 1);
      setSelectedPizzas(updatedSelectedPizzas);
    } else {
      setSelectedPizzas([...updatedSelectedPizzas, productId]);
    }
  };

  const handleToppingSelected = (toppingId: number) => {
    const updatedSelectedToppings = [...selectedToppings];
    const selectedPizzaIndex = updatedSelectedToppings.indexOf(toppingId);

    if (selectedPizzaIndex > -1) {
      updatedSelectedToppings.splice(selectedPizzaIndex, 1);
      setSelectedToppings(updatedSelectedToppings);
    } else {
      setSelectedToppings([...updatedSelectedToppings, toppingId]);
    }
  };

  const handleLocationSelected = (locationId: number) => {
    setSelectedPizzas([]);
    setSelectedToppings([]);
    setSelectedLocation(locationId);
  };

  const calculateTotal = () => {
    const pizzaTotal = data.location_products
      .filter(
        (locationProduct) =>
          selectedPizzas.indexOf(locationProduct.product_id) > -1 &&
          locationProduct.location_id === selectedLocationId
      )
      .map((locationProduct) => locationProduct.price_cents)
      .reduce((a, b) => a + b, 0);

    const toppingsTotal = data.toppings
      .filter((topping) => selectedToppings.indexOf(topping.id) > -1)
      .map((locationProduct) => locationProduct.price_cents)
      .reduce((a, b) => a + b, 0);

    const total = pizzaTotal + toppingsTotal;
    return formatCents(total);
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
            onClick={() => handleLocationSelected(location.id)}
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
      <>
        {selectedLocationId > 0 ? (
          <>
            <div>
              <h4>Select your pizzas</h4>
              {(getLocationPizza() || []).map((locationProduct) => {
                const product = data.products.find(
                  (product) => product.id === locationProduct.product_id
                );

                return (
                  <>
                    <label for={product?.name}>
                      <input
                        type="checkbox"
                        id={product?.name}
                        name={product?.name}
                        checked={selectedPizzas.indexOf(product?.id!) > -1}
                        onChange={() => handlePizzaSelected(product?.id!)}
                      />{" "}
                      {product?.name} -{" "}
                      {formatCents(locationProduct.price_cents)}
                    </label>
                    <br />
                  </>
                );
              })}
            </div>
            <hr />
            <div>
              <h4>Select your toppings</h4>
              {(data.toppings || []).map((topping) => {
                return (
                  <>
                    <label for={topping}>
                      <input
                        type="checkbox"
                        id={String(topping?.id!)}
                        name={topping.name}
                        checked={selectedToppings.indexOf(topping?.id!) > -1}
                        onChange={() => handleToppingSelected(topping?.id!)}
                      />{" "}
                      {topping.name} - {formatCents(topping.price_cents)}
                    </label>
                    <br />
                  </>
                );
              })}
            </div>
            <hr />
            <div>
              <h4>Order total: {calculateTotal()}</h4>
            </div>
          </>
        ) : (
          <p>Choose a location first</p>
        )}
      </>
    </>
  );
}

export default App;
