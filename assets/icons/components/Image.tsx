import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

const ImageIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="#000000"
    fill="none"
    {...props}
  >
    <Path
      d="M14 3.5H10C6.22876 3.5 4.34315 3.5 3.17157 4.67157C2 5.84315 2 7.72876 2 11.5V13.5C2 17.2712 2 19.1569 3.17157 20.3284C4.34315 21.5 6.22876 21.5 10 21.5H14C17.7712 21.5 19.6569 21.5 20.8284 20.3284C22 19.1569 22 17.2712 22 13.5V11.5C22 7.72876 22 5.84315 20.8284 4.67157C19.6569 3.5 17.7712 3.5 14 3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="8.5"
      cy="9"
      r="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.5 17.5L16.348 11.8797C16.1263 11.6377 15.8131 11.5 15.485 11.5C15.1744 11.5 14.8766 11.6234 14.6571 11.8429L10 16.5L7.83928 14.3393C7.62204 14.122 7.32741 14 7.02019 14C6.68931 14 6.37423 14.1415 6.15441 14.3888L2.5 18.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ImageIcon;