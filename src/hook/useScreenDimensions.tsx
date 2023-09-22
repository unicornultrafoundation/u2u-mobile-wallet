import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

interface DimensionProps {
  window: ScaledSize;
  screen: ScaledSize;
}

export const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (e: DimensionProps) => {
      setScreenData(e.window);
    };

    Dimensions.addEventListener('change', onChange);

    // return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};