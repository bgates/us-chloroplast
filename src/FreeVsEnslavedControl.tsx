import React from "react";
import tw, { styled } from "twin.macro";
import { Population } from "./types";
import { capitalize } from "./utils";

const LabelContainer = tw.div`rounded-sm bg-gray-50 absolute bottom-8 right-2 w-44 z-1000 `;
const Label = styled.label(({ active }: { active: boolean }) => [
  tw`block p-1 flex justify-between text-gray-700`,
  active && tw`text-gray-900`,
]);
type InputType = {
  currentPopulation: Population;
  population: Population;
};
const Input = ({ currentPopulation, population }: InputType) => (
  <Label active={population === currentPopulation}>
    {capitalize(population)} population
    <input
      type="radio"
      name="population"
      value={population}
      checked={currentPopulation === population}
    />
  </Label>
);

type FreeVsEnslavedControlType = {
  date: number;
  currentPopulation: Population;
  handleChange: (p: Population) => void;
};
export const FreeVsEnslavedControl = ({
  date,
  currentPopulation,
  handleChange,
}: FreeVsEnslavedControlType) => (
  <LabelContainer
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(e.target.value as Population)
    }
  >
    <Input population="whole" currentPopulation={currentPopulation} />
    {date < 1870 ? (
      <>
        <Input population="free" currentPopulation={currentPopulation} />
        <Input population="enslaved" currentPopulation={currentPopulation} />
      </>
    ) : null}
  </LabelContainer>
);
