import React from "react";
import Svg, { Path } from "react-native-svg";

const Logo = ({ color = "#3d5a80", width = 144, height = 144 }) => (
  <Svg viewBox="0 0 1556 2309" width={width} height={height}>
    <Path
      fill={color}
      d="m1540.5 1462.8c8.7 45.6 28.1 166.7 2.9 352.9-52.4 359.6-371.3 492.5-760.1 492.5-404.4 0-782.5-144.5-782.5-626.3v-164.8h577.9v207.4c0 117.3 80.5 195.9 215.2 195.9 143.5 0 192-72.7 210.4-145.4 9.7-40.8 16.5-106.7-4.8-159-110.6-278.3-875.5-406.2-968.6-846.4-22.3-108.6-20.4-193.9-3.9-289.8 56.2-352 368.4-479 751.4-479 303.5 0 725.2 74.7 725.2 542.9v151.3h-536.1v-132.8c0-117.3-73.7-195.9-199.8-195.9-135.7 0-182.2 76.6-196.8 145.5-5.8 24.2-8.7 69.8 2 113.4 61 252 877.4 385.8 967.6 837.6z"
    />
  </Svg>
);

export default Logo;