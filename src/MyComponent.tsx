import React, { useState, useEffect } from "react";
import elementsData from "./periodic-table-lookup.json";

const ElementInfo = ({ element }) => {
  return (
    <div>
      <h2>{element.name}</h2>
      <p>Atomic Mass: {element.atomic_mass}</p>
      <p>Appearance: {element.appearance}</p>
      {/* Add more information as needed */}
      <img src={element.image.url} alt={element.image.title} />
      <p>{element.summary}</p>
    </div>
  );
};

const MyComponent = () => {
  const [elementsDataState, setElementsDataState] = useState(null);

  useEffect(() => {
    // Assuming 'order' is the key for the array of element names in your JSON
    const elementNames = elementsData.order;

    // Fetch data for each element and store in state
    const elementDataPromises = elementNames.map(async (elementName) => {
      const elementData = elementsData[elementName];
      return { [elementName]: elementData };
    });

    const elementDataArray = Promise.all(elementDataPromises);
    const elementsDataObject = Object.assign({}, ...elementDataArray);
    setElementsDataState(elementsDataObject);
  }, []); // The empty dependency array means this effect runs once when the component mounts.

  return (
    <div>
      {elementsDataState ? (
        Object.entries(elementsDataState).map(([elementName, elementData]) => (
          <ElementInfo key={elementName} element={elementData} />
        ))
      ) : (
        <p>Loading element data...</p>
      )}
    </div>
  );
};

export default MyComponent;
