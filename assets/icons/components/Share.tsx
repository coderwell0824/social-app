import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Share = (props: SvgProps) => (
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
      d="M11.1002 3C7.45057 3.00657 5.53942 3.09617 4.31806 4.31754C3 5.63559 3 7.75698 3 11.9997C3 16.2425 3 18.3639 4.31806 19.6819C5.63611 21 7.7575 21 12.0003 21C16.243 21 18.3644 21 19.6825 19.6819C20.9038 18.4606 20.9934 16.5494 21 12.8998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.9995 6.02511L20 6.02258C16.2634 6.01313 14.3951 6.0084 13.0817 6.95247C12.6452 7.2662 12.2622 7.64826 11.9474 8.08394C11 9.39497 11 11.2633 11 14.9998M20.9995 6.02511C21.0062 5.86248 20.9481 5.69887 20.8251 5.55315C20.0599 4.64668 18.0711 2.99982 18.0711 2.99982M20.9995 6.02511C20.9934 6.17094 20.9352 6.31598 20.8249 6.44663C20.0596 7.35292 18.0711 8.99982 18.0711 8.99982"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Share;
