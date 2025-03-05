import React, { useState, useEffect } from "react";
import Select from "react-select";
import fetchApi from "../../Config/fetchApi";
import configureAPI from "../../Config/configureAPI";

const IngredientDropdown = ({ value, onChange }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetchApi(`${URL}/owner/ingredient`, "GET");
        const data = await response.json();
        console.log("Fetched ingredients:", data);
        setIngredients(
          data.map((ingredient) => ({
            value: ingredient.ingredient_id,
            label: ingredient.ingredient_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, [URL]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      //   width: "100%",
      border: "1px solid #DD9F52",
      borderRadius: "30px",
      padding: "6px",
      color: "#4B5563",
      //   outline: "none",
      fontSize: "2xl",
      //   boxShadow: state.isFocused ? "0 0 0 1px #A86D3A" : "none",
    }),
  };

  return (
    <Select
      options={ingredients}
      onChange={(selected) => onChange(selected?.value, selected?.label)}
      value={
        value
          ? ingredients.find((ing) => ing.value === value) || {
              label: value,
              value: value,
            }
          : null
      }
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
