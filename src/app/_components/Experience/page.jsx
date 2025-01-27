import React, { useEffect, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber"; // To load assets within react-three/fiber
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import { PresentationControls, Stage } from "@react-three/drei";
import Builder from "../Builder/page";



const Experience = () => {
  // const dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  // const gltf = useLoader(GLTFLoader, "/models/Driver460.glb", (loader) => {
  //   loader.setDRACOLoader(dracoLoader);
  // });
  const modelRef = useRef();

  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  
    loader.load("/models/Driver460.glb", (gltf) => {
      setModel(gltf.scene);
    });
  }, []);

  const [selectedColor, setSelectedColor] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [stripesNum, setStripesNum] = useState(null);
  const [stripesColors, setStripesColors] = useState([]);
  useEffect(() => {
    if (model && modelRef.current && selectedColor) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          // if (child.name === "Driver460-stripe7") {
          //   child.material.color.set(selectedColor);
          // }
          child.material.color.set(selectedColor);
        }
      });
    }
  }, [model, selectedColor]);

  // useEffect(() => {
  //   if (gltf && modelRef.current && selectedColor) {
  //     modelRef.current.traverse((child) => {
  //       if (child.isMesh) {
  //         // if (child.name === "Driver460-stripe7") {
  //         //   child.material.color.set(selectedColor);
  //         // }
  //         child.material.color.set(selectedColor);
  //       }
  //     });
  //   }
  // }, [gltf, stripesNum , ]);

  // "Driver460-stripe7"
  // "Driver460-candy_main_A"
  // "Driver460-candy_main_B"
  // "Driver460-candy_head_B"
  // "Driver460-candy_head_A"
  // "Driver460-stripe4"
  // "Driver460-stripe6"
  // "Driver460-stripe2"
  // "Driver460-stripe1"
  // "Driver460-stripe5"
  // "Driver460-stripe3"

  return (
    <>
      <div className="my-3 text-3xl border-b-2 border-navy mx-4">
        {" "}
        DESIGN YOUR HEADCOVER{" "}
      </div>

      <div className="flex justify-between px-12 flex-wrap">
        <div className="flex-[2]">
          <Canvas
            className="w-full h-[400px] max-h-[600px]"
            style={{ maxWidth: "800px" }}
            // camera={{ position: [3, 2, 5], fov: 50 }}
          >
            <color attach="background" arg={["#111"]} />
            <group ref={modelRef}>
              <PresentationControls
                speed={1.5}
                global
                zoom={0.7}
                polar={[-0.1, Math.PI / 4]}
              >
                {/* polar is used to adjust rotation and its limitations */}
                <Stage
                  environment={"city"}
                  intensity={0.6}
                  contactShadow={false}
                >
                  {model && (
                    <primitive object={model} scale={0.8} />
                  )}                </Stage>
              </PresentationControls>
            </group>
          </Canvas>
        </div>
        <div className="flex-[1] ">
          <Builder
            setSelectedColor={setSelectedColor}
            setDetailType={setDetailType}
            detailType={detailType}
            setStripesNum={setStripesNum}
            stripesNum={stripesNum}
            setStripesColors={setStripesColors}
            stripesColors={stripesColors}
          />
        </div>
      </div>
    </>
  );
};

export default Experience;

// function usePricing(baseConfig, personalizeConfig) {
//   const [price, setPrice] = useState(199);
//   useEffect(() => {
//     const priceAffectingOptions = {
//       // define price affecting options here
//       thumb: personalizeConfig["Thumb Logo/Graphic"],
//     };

//     let newPrice = 199;
//     if (priceAffectingOptions.thumb === "Graphic (+$7)") {
//       newPrice += 7;
//     }
//     if (priceAffectingOptions.thumb === "Premium Graphic (+$15)") {
//       newPrice += 15;
//     }

//     setPrice(newPrice);
//   }, [
//     baseConfig.logo_style,
//     baseConfig.inlay,
//     baseConfig.kippalm,
//     baseConfig,
//     personalizeConfig,
//   ]);

//   return { price }; // return price for usage
// }

// const setColor = (value) => {

// }

// const handlePeronalizeChangeText = (e) => {
//   let value = e.target.value;

//   if (data[currentPersonlize].texttype === "number") {
//     if (value.length > 2) {
//       value = value.slice(0, 2);
//     }
//     setPersonlizeConfig((prevOption) => ({
//       ...prevOption,
//       [currentPersonlize]: value,
//     }));
//   } else if (data[currentPersonlize].texttype === "long_text") {
//     setPersonlizeConfig((prevOption) => ({
//       ...prevOption,
//       [currentPersonlize + " Text"]: value,
//     }));
//   } else {
//     if (value.length > 17) {
//       value = value.slice(0, 17);
//     }
//     setPersonlizeConfig((prevOption) => ({
//       ...prevOption,
//       [currentPersonlize + " Text"]: value,
//     }));
//   }
// };