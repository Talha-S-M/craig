import React, { useState } from "react";
import { colors } from "./helpers";
import { Button } from "../Button/page";

const handleColorSelect = (color) => {
  if (stripesColors.includes(color)) {
    setStripesColors(
      stripesColors.filter((selectedColor) => selectedColor !== color)
    );
  } else {
    if (stripesColors.length < stripesNum) {
      setStripesColors([...stripesColors, color]);
    }
  }
};

const Step1 = ({ club, setClub, pattern, setPattern, nextStep }) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
        <h2>1. Club & Pom/Tassel</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-full border-gray-400 hover:border-blue-500">
            <i className="fa-solid fa-angle-left" />
          </button>
          <button className="p-2 border rounded-full border-gray-400 hover:border-blue-500">
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="font-semibold text-gray-700">Select Club</span>
          <select
            id="club"
            className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
            onChange={(e) => setClub(e.target.value)}
          >
            <option value="">-select-</option>
            <option value="driver">Driver</option>
            <option value="fairway">Fairway</option>
            <option value="hybrid">Hybrid</option>
            <option value="t-putter-blade">Traditional Blade Putter</option>
            <option value="w-putter-blade">Wide Blade Putter</option>
            <option value="l-mallet-putter">Large Mallet Putter</option>
          </select>
        </label>
        {club && (
          <label className="block">
            <span className="font-semibold text-gray-700">Select Pattern</span>
            <select
              id="club"
              className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
              onChange={(e) => setPattern(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="solid">SOLID HEAD & NECK</option>
              <option value="candy-neck"> CANDY STRIPE, JUST NECK</option>
              <option value="head-neck"> 1 HEAD COLOR, 1 NECK COLOR</option>
              <option value="candy-stripe"> CANDY STRIPE, FULL COVER</option>
            </select>
          </label>
        )}
        <Button
          name="Next"
          onClick={() => {
            nextStep("color");
          }}
          disable={!club || !pattern}
        />
      </div>
    </div>
  );
};

const StepDriverColor = ({
  prevStep,
  setSelectedColor,
  selectedColor,
  pattern,
  nextStep,
}) => {
  const handleColorSelect = (color) => {
    if (selectedColor.includes(color)) {
      setSelectedColor(
        selectedColor.filter((selectedColo) => selectedColo !== color)
      );
    } else {
      if (selectedColor.length < 2) {
        setSelectedColor([...selectedColor, color]);
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
        <h2>2. Sleeve Color</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevStep}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <button
            onClick={() => nextStep("topping")}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="font-semibold text-gray-700">
            Select Sleeve Color
          </span>
          <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
            {colors.map((color, index) => {
              return (
                <div
                  onClick={() => {
                    if (pattern == "candy-stripe") {
                      handleColorSelect(color.value);
                    } else {
                      setSelectedColor(color.value);
                    }
                  }}
                  key={index}
                  className={`w-14 h-14 border-2 border-transparent cursor-pointer hover:border-gray-800 ${
                    selectedColor == color.value && "border-borderColor"
                  }`}
                  style={{
                    backgroundColor: color.value,
                    backgroundImage: 'url("/assets/builder_swatch.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {selectedColor == color.value && (
                    <span className="flex justify-center items-center h-full">
                      sel
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </label>
        <button
          onClick={() => nextStep("detail")}
          className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Step3 = ({
  nextStep,
  prevStep,
  setDetailType,
  detailType,
  setStripesNum,
  stripesNum,
  setStripesColors,
  stripesColors,
  initial,
  setInitial,
  club,
}) => {
  const handleColorSelect = (color) => {
    if (stripesNum == "1") {
      setStripesColors(color);
      return;
    }
    if (detailType == "t-stripes") {
      if (stripesColors.includes(color)) {
        setStripesColors(
          stripesColors.filter((selectedColor) => selectedColor !== color)
        );
      } else {
        if (stripesColors.length < 2) {
          setStripesColors([...stripesColors, color]);
        }
      }
    } else {
      setStripesColors(color);
    }
  };

  const values = [...Array(10).keys()]
    .map(String)
    .concat([...Array(26).keys()].map((i) => String.fromCharCode(i + 65)));

  return (
    <div className="space-y-6 p-6">
      <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
        {/* <h2>3. Pom Color</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={prevStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
        <button
          onClick={nextStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      </div>
    </div> */}
        <h2>Select Detailing</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevStep}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <button
            onClick={nextStep}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="font-semibold text-gray-700">Select Detailing</span>
          <select
            id="detail"
            className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
            onChange={(e) => {
              setStripesColors([]);
              setDetailType(e.target.value);
            }}
          >
            <option value="">-select-</option>
            <option value="t-stripes"> TRADITIONAL STRIPES</option>
            <option value="in-nu">INITIALS/NUMERALS</option>
          </select>
        </label>
        {detailType && detailType == "t-stripes" && (
          <label className="block">
            <span className="font-semibold text-gray-700">
              Select Detailing
            </span>
            <select
              id="detail"
              className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
              onChange={(e) => {
                setStripesColors([]);
                setStripesNum(e.target.value);
              }}
            >
              <option value="">-select-</option>
              <option value="1"> 1 STRIPE</option>
              {/* {club == "t-putter-blade" && (
                <option value="2"> 2 STRIPES Alternating</option>
              )} */}
              {club == "driver" && (
                <>
                  <option value="2"> 2 STRIPE</option>
                  <option value="3"> 3 STRIPE</option>
                  <option value="4"> 4 STRIPE</option>
                  <option value="5"> 5 STRIPE</option>
                  <option value="6"> 6 STRIPE</option>
                  <option value="7"> 7 STRIPE</option>
                </>
              )}
            </select>
            {stripesNum && (
              <label className="block mt-2">
                <span className="font-semibold text-gray-700">
                  Select Stripe Color (s)
                </span>
                <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
                  {colors.map((color, index) => {
                    const isSelected = stripesColors.includes(color.value);
                    return (
                      <div
                        onClick={() => handleColorSelect(color.value)}
                        key={index}
                        className={`w-14 h-14 border-2 cursor-pointer hover:border-gray-800 ${
                          isSelected && "border-borderColor"
                        }`}
                        style={{
                          backgroundColor: color.value,
                          backgroundImage: 'url("/assets/builder_swatch.png")',
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {isSelected && (
                          <span className="flex justify-center items-center h-full">
                            sel
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </label>
            )}
          </label>
        )}
        {detailType && detailType == "in-nu" && (
          <label className="block">
            <span className="font-semibold text-gray-700">Select Numerals</span>
            <select
              id="detail"
              className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
              onChange={(e) => {
                setInitial(e.target.value);
              }}
            >
              <option value="" key="">
                -select-
              </option>
              {values.map((value, key) => (
                <option value={value} key={key}>
                  {value}
                </option>
              ))}
            </select>
            {initial && (
              <label className="block mt-2">
                <span className="font-semibold text-gray-700">
                  Select Initials Color
                </span>
                <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
                  {colors.map((color, index) => {
                    return (
                      <div
                        onClick={() => handleColorSelect(color.value)}
                        key={index}
                        className={`w-14 h-14 border-2 cursor-pointer hover:border-gray-800 ${
                          color.value == stripesColors && "border-borderColor"
                        }`}
                        style={{
                          backgroundColor: color.value,
                          backgroundImage: 'url("/assets/builder_swatch.png")',
                          backgroundSize: "repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        {stripesColors == color.value && (
                          <span className="flex justify-center items-center h-full">
                            sel
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </label>
            )}
          </label>
        )}
        <Button
          name="Next"
          onClick={() => nextStep("topping")}
          disable={
            !detailType ||
            (detailType == "t-stripes" && !stripesNum) ||
            (detailType == "in-nu" && !initial)
          }
        />
      </div>
    </div>
  );
};

const StepToppings = ({
  nextStep,
  prevStep,
  topping,
  setTopping,
  toppingColor,
  setToppingColors,
  toppingType,
  setToppingType,
}) => {
  const handleToppingColor = (color) => {
    let length = 0;
    if (toppingType == "2f") {
      length = 2;
    } else {
      length = parseInt(toppingType);
    }
    if (length == 1) {
      setToppingColors(color);
      return;
    }
    if (toppingColor.includes(color)) {
      setToppingColors(
        toppingColor.filter((selectedColor) => selectedColor !== color)
      );
    } else {
      if (toppingColor.length < length) {
        setToppingColors([...toppingColor, color]);
      }
    }
  };
  return (
    <div className="space-y-6 p-6">
      <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
        <h2>Select Toppings</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevStep}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <button
            onClick={nextStep}
            className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
          >
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="font-semibold text-gray-700">Select Toppings</span>

          <select
            id="toppings"
            className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
            onChange={(e) => {
              setToppingColors([]);
              setTopping(e.target.value);
            }}
          >
            <option value="">-select-</option>
            <option value="1-pom"> 1IN. POM</option>
            <option value="5-pom"> 5IN. POM</option>
            <option value="8-pom"> 8IN. POM</option>
            <option value="tassel"> TASSEL</option>
            <option value="no"> NO TOPPING</option>
          </select>
          {topping && (
            <div className="mt-2">
              <span className="font-semibold text-gray-700">
                Select Topping Type
              </span>
              <select
                id="topping-type"
                className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
                onChange={(e) => {
                  setToppingColors([]);
                  setToppingType(e.target.value);
                }}
              >
                <option value="">-select-</option>
                <option value="1"> 1 Color</option>
                <option value="2"> 2 Colors</option>
                <option value="2f"> 2 Colors, FLECKS</option>
                <option value="3"> 3 Colors</option>
                <option value="4"> 4 Colors</option>
              </select>
              {toppingType && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700">
                    Select Topping Colors
                  </span>
                  <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
                    {colors.map((color, index) => {
                      const isSelected = toppingColor.includes(color.value);
                      return (
                        <div
                          onClick={() => {
                            console.log(color.value);
                            handleToppingColor(color.value);
                          }}
                          key={index}
                          className={`w-14 h-14 border-2 border-transparent cursor-pointer hover:border-gray-800 ${
                            isSelected && "border-borderColor"
                          }`}
                          style={{
                            backgroundColor: color.value,
                            backgroundImage:
                              'url("/assets/builder_swatch.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {isSelected && (
                            <span className="flex justify-center items-center h-full">
                              sel
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </label>
        <button
          onClick={nextStep}
          className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Step6 = ({ nextStep, prevStep }) => (
  <div className="space-y-6 p-6">
    <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
      <h2>4. Confirm Details</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={prevStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
        <button
          onClick={nextStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      </div>
    </div>
    <div className="space-y-4">
      <p className="text-gray-700">
        Please confirm all the details before proceeding.
      </p>
      <button
        onClick={nextStep}
        className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500"
      >
        Confirm
      </button>
    </div>
  </div>
);

const Step7 = ({ prevStep }) => (
  <div className="space-y-6 p-6">
    <div className="text-lg font-bold flex justify-between items-center bg-gray-800 text-white py-2 px-4">
      <h2>5. Final Step</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={prevStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-left" />
        </button>
      </div>
    </div>
    <div className="space-y-4">
      <p className="text-gray-700">
        Thank you for customizing your product. You can now proceed to add it to
        the cart!
      </p>
      <button className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500">
        Add to Cart
      </button>
    </div>
  </div>
);

const Builder = ({
  selectedColor,
  setSelectedColor,
  setDetailType,
  detailType,
  setStripesNum,
  stripesNum,
  setStripesColors,
  stripesColors,
  club,
  setClub,
  pattern,
  setPattern,
  initial,
  setInitial,
  setTopping,
  topping,
  toppingColor,
  setToppingColors,
  toppingType,
  setToppingType,
}) => {
  const goToNextStep = () => {
    let nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
      setHistory([...history, nextStepIndex]);
      setCurrentStepIndex(nextStepIndex);
    }
  };
  const goToPreviousStep = () => {
    if (history.length > 1) {
      const prevStepIndex = history[history.length - 2];
      setHistory(history.slice(0, -1));
      setCurrentStepIndex(prevStepIndex);
    }
  };

  const steps = [
    {
      name: "default",
      component: (
        <Step1
          nextStep={goToNextStep}
          club={club}
          setClub={setClub}
          pattern={pattern}
          setPattern={setPattern}
        />
      ),
    },
    {
      name: "color",
      component: (
        <StepDriverColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          pattern={pattern}
          nextStep={goToNextStep}
          prevStep={goToPreviousStep}
        />
      ),
    },
    {
      name: "detail",
      component: (
        <Step3
          setDetailType={setDetailType}
          detailType={detailType}
          setStripesNum={setStripesNum}
          stripesNum={stripesNum}
          setStripesColors={setStripesColors}
          stripesColors={stripesColors}
          initial={initial}
          setInitial={setInitial}
          club={club}
          nextStep={goToNextStep}
          prevStep={goToPreviousStep}
        />
      ),
    },
    {
      name: "topping",
      component: (
        <StepToppings
          nextStep={goToNextStep}
          topping={topping}
          setTopping={setTopping}
          toppingColor={toppingColor}
          setToppingColors={setToppingColors}
          toppingType={toppingType}
          setToppingType={setToppingType}
          prevStep={goToPreviousStep}
        />
      ),
    },
    {
      name: 4,
      component: <Step1 nextStep={goToNextStep} prevStep={goToPreviousStep} />,
    },
    // {
    //   name: "default",
    //   component: (
    //     <Step1
    //       nextStep={goToNextStep}
    //       club={club}
    //       setClub={setClub}
    //       pattern={pattern}
    //       setPattern={setPattern}
    //     />
    //   ),
    // },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([currentStepIndex]);
  return (
    <>
      <div className="max-w-4xl mx-auto bg-gray-100 rounded shadow-lg mt-12">
        {/* {renderStep()} */}
        {steps[currentStepIndex].component}
        <div className="px-5 pb-5 leading-[1.7] font-normal text-base text-navy text-center">
          <p className="pb-3">
            Actual yarn colors may vary from the hues depicted on your screen.
            Please request yarn samples from us if you have precise color needs.
          </p>
          <p className="pb-3">
            Any pieces designed within this builder will be knit-to-order and
            subject to our current custom turnaround time. For fast turnaround,
            please shop our in stock features
          </p>
          <p className="pb-3">
            Interested in a design element that you don’t see here? Please
            include these details within the “Special Requests” box in the last
            step and someone from our team will be in touch
          </p>
          {/* <p>
            Want a more unique design?&nbsp; Send us your{" "}
            <a href="/about/super-custom-golf-headcovers/">sketch</a>
          </p> */}
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Builder;
