import { Children, MutableRefObject, useEffect, useState } from "react";
import usePrevious from "react-hooks-use-previous";

type List = Array<
  JSX.Element & { key: string; ref: MutableRefObject<HTMLLIElement> }
>;
type BoundingBoxType = Record<string, DOMRect>;
const calculateBoundingBoxes = (children: List) => {
  const boundingBoxes: BoundingBoxType = {};

  Children.forEach(children, (child) => {
    console.log(child.ref);
    const domNode = child.ref.current;
    if (domNode) {
      const nodeBoundingBox = domNode.getBoundingClientRect();

      boundingBoxes[child.key] = nodeBoundingBox;
    }
  });

  return boundingBoxes;
};
export const AnimateList = ({ children }: { children: List }) => {
  const [boundingBox, setBoundingBox] = useState<BoundingBoxType>({});
  const [prevBoundingBox, setPrevBoundingBox] = useState<BoundingBoxType>({});
  const prevChildren = usePrevious<List>(children, []);

  useEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);
  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      console.log("has");
      Children.forEach(children, (child) => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInY = firstBox.top - lastBox.top;

        if (changeInY) {
          console.log("change");
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = "transform 0s";
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return <>{children}</>;
};
