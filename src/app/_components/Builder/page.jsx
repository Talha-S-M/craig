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

const Step1 = ({ nextStep }) => {
  const [club, setClub] = useState(null);
  const [pattern, setPattern] = useState(null);

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
            <span className="font-semibold text-gray-700">Select Club</span>
            <select
              id="club"
              className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
              onChange={(e) => setPattern(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="solid">SOLID HEAD & NECK</option>
              <option value="candy-stripe"> CANDY STRIPE, FULL COVER</option>
            </select>
          </label>
        )}
        {/* <label className="block">
        <span className="font-semibold text-gray-700">Select POM/Tassel</span>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pom-tassel"
              value="5in-pom"
              className="accent-gray-800"
            />{" "}
            5in. POM
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pom-tassel"
              value="8in-pom"
              className="accent-gray-800"
            />{" "}
            8in. POM
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pom-tassel"
              value="tassel"
              className="accent-gray-800"
            />{" "}
            Tassel
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pom-tassel"
              value="none"
              className="accent-gray-800"
            />{" "}
            NONE
          </label>
        </div>
      </label> */}
        <Button name="Next" onClick={nextStep} disable={!club || !pattern} />
        {/* <button
        onClick={nextStep}
        className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-blue-500"
        
      >
        Next
      </button> */}
      </div>
    </div>
  );
};

const Step2 = ({ nextStep, prevStep, setSelectedColor }) => (
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
          onClick={nextStep}
          className="p-2 border rounded-full border-gray-400 hover:border-blue-500"
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      </div>
    </div>
    <div className="space-y-4">
      <label className="block">
        <span className="font-semibold text-gray-700">Select Sleeve Color</span>
        <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
          {colors.map((color, index) => {
            return (
              <div
                onClick={() => setSelectedColor(color.value)}
                key={index}
                className={`w-14 h-14 border-2 border-transparent cursor-pointer hover:border-gray-800`}
                style={{
                  backgroundColor: color.value,
                  backgroundImage: 'url("/assets/builder_swatch.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            );
          })}
        </div>
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

const Step3 = ({
  nextStep,
  prevStep,
  setDetailType,
  detailType,
  setStripesNum,
  stripesNum,
  setStripesColors,
  stripesColors,
}) => {
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
            onChange={(e) => setDetailType(e.target.value)}
          >
            <option value="">-select-</option>
            <option value="t-stripes"> TRADITIONAL STRIPES</option>
            <option value="in-nu">INITIALS/NUMERALS</option>
          </select>
        </label>
        {detailType &&
          (detailType == "t-stripes" ? (
            <label className="block">
              <span className="font-semibold text-gray-700">
                Select Detailing
              </span>
              <select
                id="detail"
                className="w-full border-b border-gray-300 bg-gray-100 p-2 mt-1 text-sm uppercase font-bold"
                onChange={(e) => setStripesNum(e.target.value)}
              >
                <option value="">-select-</option>
                <option value="1"> 1 STRIPE</option>
                <option value="2"> 2 STRIPE</option>
                <option value="3"> 3 STRIPE</option>
              </select>
              {stripesNum && (
                <label className="block">
                  <span className="font-semibold text-gray-700">
                    Select Stripe Color (s)
                  </span>
                  <div className="grid grid-cols-5 max-lg:grid-cols-4 gap-4 mt-2">
                    {colors.map((color, index) => {
                      const isSelected = stripesColors.includes(color.value);
                      return (
                        <div
                          onClick={() => setStripesColors(color.value)}
                          key={index}
                          className={`w-14 h-14 border-2 border-transparent cursor-pointer hover:border-gray-800 ${
                            isSelected ? "border-gray-800" : ""
                          }`}
                          style={{
                            backgroundColor: color.value,
                            backgroundImage:
                              'url("/assets/builder_swatch.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </label>
              )}
            </label>
          ) : (
            <div>Numerals</div>
          ))}
        <Button
          name="Next"
          onClick={nextStep}
          disable={!detailType || stripesColors.length !== stripesNum}
        />
      </div>
    </div>
  );
};

const Step4 = ({ nextStep, prevStep }) => (
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

const Step5 = ({ prevStep }) => (
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
  setSelectedColor,
  setDetailType,
  detailType,
  setStripesNum,
  stripesNum,
  setStripesColors,
  stripesColors,
}) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = (setSelectedColor) => {
    switch (step) {
      case 0:
        return <Step1 nextStep={nextStep} />;
      case 1:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            setSelectedColor={setSelectedColor}
          />
        );
      case 2:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            setDetailType={setDetailType}
            detailType={detailType}
            setStripesNum={setStripesNum}
            stripesNum={stripesNum}
            setStripesColors={setStripesColors}
            stripesColors={stripesColors}
          />
        );
      case 3:
        return <Step4 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step5 nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-gray-100 rounded shadow-lg mt-12">
        {renderStep(setSelectedColor)}
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
