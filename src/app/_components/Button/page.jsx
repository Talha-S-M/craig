"use client";
import React from "react";

export const Button = ({
  name,
  textColor,
  type,
  placeholderIcon,
  iconSize,
  backGroundColor,
  onClick,
  disable,
  showBorder,
  isLoader,
  width
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disable}
        className={`bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500  disabled:bg-gray-400 ${width ? width : ""}`}
        style={{ fontFamily: "br-semi-bold" }}
      >
        <span
          className={`${textColor} rounded-full h-6 mr-2 flex items-center justify-center`}
        >
          {placeholderIcon && (
            <span
              className={`${placeholderIcon} pr-2`}
              style={{ fontSize: iconSize }}
            ></span>
          )}
          {isLoader ? (
            <div className=" flex items-center justify-center">
              <div className="loader flex justify-center items-center  " />
            </div>
          ) : (
            <p className={`text-xsmall font-bold ${textColor}`}> {name}</p>
          )}
        </span>
      </button>
    </>
  );
};
