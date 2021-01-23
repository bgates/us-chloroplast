import React, { useState } from "react";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";

// https://codesandbox.io/s/w0w6xyon2w
type DateSliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (date: number) => void;
};
const DateSlider = ({ value, min, max, onChange }: DateSliderProps) => {
  return (
    <Slider
      style={{ zIndex: 100000 }}
      min={min}
      max={max}
      step={10}
      value={value}
      onChange={onChange}
    />
  );
};
export default DateSlider;
