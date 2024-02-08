"use client";
import CustomerForm from "@/components/customer/customer-form";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import React, { useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

interface Props {
  formBtnTitle: string;
  onNewOption: (newOption: { value: string; label: string; }[]) => void;
  btn: JSX.Element;
}

const animatedComponents = makeAnimated();
// const colourOptions = [
//   { value: "blues", label: "Blues" },
//   { value: "rock", label: "Rock" },
//   { value: "jazz", label: "Jazz" },
//   { value: "orchestra", label: "Orchestra" },
//   { value: "red", label: "red" },
//   { value: "blue", label: "blue" },
//   { value: "orange", label: "Orange" },
//   { value: "white", label: "white" },
// ];

export default function AnimatedMulti() {
  const [colourOptions, setColourOptions] = useState([
    [
      { value: "blues", label: "Blues" },
      { value: "rock", label: "Rock" },
      { value: "jazz", label: "Jazz" },
      { value: "orchestra", label: "Orchestra" },
      { value: "red", label: "red" },
      { value: "blue", label: "blue" },
      { value: "orange", label: "Orange" },
      { value: "white", label: "white" },
    ],
  ]);

  const addOption = (newOption: { value: string; label: string; }[]) => {
    setColourOptions((prevOptions) => [...prevOptions, newOption]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-md items-center space-x-4">
        <div>
          <Select
            placeholder="search customer"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={colourOptions}
            className="flex-grow" // Allow the Select to take up remaining space
          />
        </div>
        <div>
        <CustomerForm
        formBtnTitle="Add Product"
        onNewOption={addOption}
        btn={
          <Button size="sm" className="h-8 ">
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        }
      />
        </div>
      </div>
    </div>
  );
}
