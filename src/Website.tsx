import { useState, useEffect } from "react";
import data from "../src/data.json";
import List from "./periodic-table-lookup.json";

export default function Website() {
  const [selectedElement, setSelectedElement] = useState("");

  useEffect(() => {
    console.log("The Selected Element", selectedElement);
  }, [selectedElement]);

  const handleElementChange = (event) => {
    setSelectedElement(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform actions with the selected element, e.g., log it
    console.log("Selected Element on Form Submit:", selectedElement);

    // Find the corresponding element in the List array based on the selected element
    if (Array.isArray(List)) {
      // List is an array
      const selectedListElement = List.find((element) => element.name === selectedElement);

      if (selectedListElement) {
        console.log("Corresponding element in List array:", selectedListElement);
        setSelectedElement(selectedElement);
        console.log("The Selected Element Data", setSelectedElement);
      } else {
        console.log("Element not found in List array.");
      }
    } else if (typeof List === "object" && List !== null) {
      // List is an object
      const selectedListElement = List[selectedElement];

      if (selectedListElement) {
        console.log("Corresponding element in List object:", selectedListElement);
        setSelectedElement(selectedListElement);
        console.log("The Selected Element Data", selectedListElement);
      } else {
        console.log("Element not found in List object.");
      }
    } else {
      console.error("List is not an array or object.");
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="bg-blue-200 p-4">
          <div className="">
            <label>Chemical : </label>
            <select
              className="bg-gray-300 border border-x-2"
              value={selectedElement}
              onChange={handleElementChange}>
              {data.order.map((order) => {
                return (
                  <option key={order} value={order}>
                    {order}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="m-4">
            <button
              className="p-4 m-3 rounded-lg bg-green-500 text-white hover:bg-green-800"
              type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      {selectedElement && (
        <div className="mt-4 flex flex-col bg-blue-200 text-justify">
          <h2>Selected Element Data:</h2>
          <pre className="whitespace-pre-wrap overflow-auto justify-start justify-text">
            {JSON.stringify(selectedElement, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
}
