import React from 'react';

const ThreeDotLoader = ({color= "#2a7ffc", width = 80, height = 80, radius = 15 }) => {
  return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
      >
        <circle cx="15" cy="15" r={radius}>
          <animate
            attributeName="r"
            from={radius}
            to={radius}
            begin="0s"
            dur="0.8s"
            values={`${radius};${radius / 1.6};${radius}`}
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle
          cx="60"
          cy="15"
          r={radius / 1.6}
          attributeName="fill-opacity"
          from="1"
          to="0.3"
        >
          <animate
            attributeName="r"
            from={radius / 1.6}
            to={radius / 1.6}
            begin="0s"
            dur="0.8s"
            values={`${radius / 1.6};${radius};${radius / 1.6}`}
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="105" cy="15" r={radius}>
          <animate
            attributeName="r"
            from={radius}
            to={radius}
            begin="0s"
            dur="0.8s"
            values={`${radius};${radius / 1.6};${radius}`}
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
  );
};

export default ThreeDotLoader;