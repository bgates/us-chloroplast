import React from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import tw from "twin.macro";

// https://codesandbox.io/s/w0w6xyon2w
type DateSliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (date: number) => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
};

const Container = tw.div`py-2 px-8 absolute bottom-2 left-2 rounded z-1000 w-2/3 bg-gray-50`;
const DateSlider = ({
  value,
  min,
  max,
  onChange,
  onMouseOver,
  onMouseOut,
}: DateSliderProps) => (
  <Container onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
    <Slider
      style={{ zIndex: 10000 }}
      min={min}
      max={max}
      step={10}
      value={value}
      onChange={onChange}
    />
  </Container>
);
export default DateSlider;
