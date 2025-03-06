import React, { useState, useEffect } from "react";
import Select from "react-select";
import fetchApi from "../../Config/fetchApi";
import configureAPI from "../../Config/configureAPI";

const IngredientDropdown = ({ value, onChange }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const [ingredients, setIngredients] = useState([]);

  console.log("Dropdown Value:", value); // For debugging

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetchApi(`${URL}/owner/ingredient`, "GET");
        const data = await response.json();
        const formattedIngredients = data.map((ingredient) => ({
          value: ingredient.ingredient_id,
          label: ingredient.ingredient_name,
          // Store the full ingredient data for reference
          ingredient: ingredient
        }));
        setIngredients(formattedIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, [URL]);

  // Find the current value in ingredients array
  const selectedValue = React.useMemo(() => {
    if (!value) return null;
    
    // If value is an object with ingredient_name (from existing data)
    if (typeof value === 'object' && value.ingredient_name) {
      return {
        value: value.ingredient_id,
        label: value.ingredient_name
      };
    }
    
    // If value is an ID, find the matching ingredient
    const found = ingredients.find(ing => ing.value === value);
    if (found) return found;
    
    // If value is a string (name), create a temporary option
    if (typeof value === 'string') {
      return {
        value: value,
        label: value
      };
    }
    
    return null;
  }, [value, ingredients]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #DD9F52",
      borderRadius: "30px",
      padding: "6px",
      color: "#4B5563",
      fontSize: "2xl",
    }),
  };

  return (
    <Select
      options={ingredients}
      onChange={(selected) => onChange(selected?.value, selected?.label)}
      value={selectedValue
        ? selectedValue:null}
      isClearable
      isSearchable
      placeholder="เลือกหรือพิมพ์ชื่อวัตถุดิบ..."
      styles={customStyles}
      noOptionsMessage={() => "ไม่มีวัตถุดิบที่กำลังหา"}
      onInputChange={(inputValue, { action }) => {
        if (action === "input-change") {
          onChange(inputValue, inputValue);
        }
      }}
    />
  );
};

export default IngredientDropdown;
