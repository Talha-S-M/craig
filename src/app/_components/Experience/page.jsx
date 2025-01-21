import React, { useEffect, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import { PresentationControls, Stage } from "@react-three/drei";
import Builder from "../Builder/page";
import {
  driverStripeGroups,
  driverVisualOrder,
  models,
  stripeIndexOrder,
  topppingModels,
} from "./helper";

const Experience = () => {
  const modelRef = useRef();

  const [model, setModel] = useState(null);
  const [toppingModel, setToppingModel] = useState(null);
  const [club, setClub] = useState(null);
  const [topping, setTopping] = useState(null);
  const [toppingType, setToppingType] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    const selectedModel =
      models.find((item) => item.name === club)?.value ?? "Driver460.glb";

    if (selectedModel) {
      loader.load(`/models/${selectedModel}`, (gltf) => {
        setModel(gltf.scene);
      });
    }
  }, [club]);

  useEffect(() => {
    if (topping) {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);

      const selectedModel =
        topppingModels.find((item) => item.name === topping)?.value ??
        "Tassel.glb";

      if (selectedModel) {
        loader.load(`/models/${selectedModel}`, (gltf) => {
          setToppingModel(gltf.scene);
        });
      }
    }
  }, [topping]);

  useEffect(() => {
    if (model && toppingModel) {
      let headMesh = null;
      if (club == "t-putter-blade") {
        model.traverse((child) => {
          if (child.isMesh && child.name == "PutterBladecandy_head_A") {
            headMesh = child;
          }
        });
      } else if (club == "driver") {
        model.traverse((child) => {
          if (child.isMesh && child.name == "Driver460-candy_head_A") {
            headMesh = child;
          }
        });
      }

      if (headMesh) {
        const headPosition = new THREE.Vector3();
        headMesh.getWorldPosition(headPosition);
        toppingModel.position.copy(headPosition);
        toppingModel.position.y += 0.15;
        toppingModel.position.x += 0.18;
        toppingModel.position.z += 0.08;
      } else {
        console.warn("No head mesh found in the first model.");
      }
    }
  }, [toppingModel, club]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [stripesNum, setStripesNum] = useState(null);
  const [stripesColors, setStripesColors] = useState([]);
  const [pattern, setPattern] = useState(null);
  const [initial, setInitial] = useState(null);
  const [toppingColor, setToppingColors] = useState([]);

  //remove after done
  const [meshNames, setMeshNames] = useState([]);
  useEffect(() => {
    if (model && modelRef.current) {
      const names = [];
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          names.push(child.name);
        }
      });
      setMeshNames(names);
    }
  }, [model]);

  // console.log(meshNames);
  //

  useEffect(() => {
    if (model && modelRef.current && selectedColor) {
      if (pattern == "solid") {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.material.color.set(selectedColor);
          }
        });
        return;
      }
      if (club == "driver") {
        if (pattern == "candy-neck") {
          modelRef.current.traverse((child) => {
            if (child.isMesh) {
              child.material.color.set(selectedColor);
            }
          });
        } else if (pattern == "head-neck") {
        } else if (pattern == "candy-stripe") {
        }
      } else if (club == "t-blade-putter") {
      }

      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(selectedColor);
        }
      });
    }
  }, [model, club, pattern, selectedColor]);

  //putter meshes

  // PutterBladestripe1
  // PutterBladecandy_main_A
  // PutterBladecandy_main_B
  // PutterBladecandy_head_B
  // PutterBladecandy_head_A

  useEffect(() => {
    if (club) {
      console.log(club);
      if (club == "t-putter-blade") {
        // console.log("here");
        if (pattern == "solid") {
          if (modelRef.current && stripesColors) {
            modelRef.current.traverse((child) => {
              if (stripesNum == "1") {
                if (child.isMesh && child.name === "PutterBladestripe1") {
                  child.material.color.set(stripesColors);
                }
              }
              //  else {
              //   if (child.isMesh && child.name === "PutterBladecandy_main_A") {
              //     child.material.color.set(stripesColors[0]);
              //   }
              //   if (child.isMesh && child.name === "PutterBladecandy_main_B") {
              //     child.material.color.set(stripesColors[1]);
              //   }
              //   if (child.isMesh && child.name === "PutterBladecandy_head_B") {
              //     child.material.color.set(stripesColors[0]);
              //   }
              //   if (child.isMesh && child.name === "PutterBladecandy_head_A") {
              //     child.material.color.set(stripesColors[1]);
              //   }
              // }
            });
          }
        } else if (pattern == "candy-stripe") {
          modelRef.current.traverse((child) => {
            if (child.isMesh && child.name === "PutterBladecandy_main_A") {
              child.material.color.set(selectedColor[0]);
            }
            if (child.isMesh && child.name === "PutterBladecandy_main_B") {
              child.material.color.set(selectedColor[1]);
            }
            if (child.isMesh && child.name === "PutterBladecandy_head_B") {
              child.material.color.set(selectedColor[0]);
            }
            if (child.isMesh && child.name === "PutterBladecandy_head_A") {
              child.material.color.set(selectedColor[1]);
            }
          });
        }
      } else if (club == "driver") {
        if (modelRef.current && stripesColors) {
          if (stripesColors.length > 0) {
            const selectedStripes = driverStripeGroups[stripesNum] || [];
            const orderedStripes = driverVisualOrder.filter((stripe) =>
              selectedStripes.includes(stripe)
            );
        
            modelRef.current.traverse((child) => {
              if (child.isMesh && orderedStripes.includes(child.name)) {
                const stripeIndex = orderedStripes.indexOf(child.name);

                if (!Array.isArray(stripesColors)) {
                  child.material.color.set(stripesColors);
                } else {
                  const colorToApply = stripesColors[stripeIndex % 2];
                  child.material.color.set(colorToApply);
                }
              }
              // if (child.isMesh && selectedStripes.includes(child.name)) {
              //   child.material.color.set(stripesColors[0]);
              // }
            });
          } else if (stripesColors.length === 0) {
            modelRef.current.traverse((child) => {
              const selectedStripes = driverStripeGroups[7];
              if (child.isMesh && selectedStripes.includes(child.name)) {
                child.material.color.set(selectedColor);
              }
            });
          }
        }
      }
    }
  }, [stripesNum, stripesColors]);

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
                  {model && <primitive object={model} scale={0.8} />}{" "}
                  {toppingModel && (
                    <primitive object={toppingModel} scale={0.8} />
                  )}{" "}
                </Stage>
              </PresentationControls>
            </group>
          </Canvas>
          <div className="relative">
            {initial && (
              <div className="absolute bottom-12 right-12">
                <div
                  className="h-14 min-w-14 max-w-fit border-2 cursor flex items-center justify-center"
                  style={{
                    backgroundColor: selectedColor,
                    backgroundImage: 'url("/assets/thread_repeat.png")',
                    backgroundSize: "repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <defs>
                      <pattern
                        id="textPattern"
                        patternUnits="userSpaceOnUse"
                        width="42"
                        height="42"
                        className="flex items-center justify-center"
                      >
                        <text
                          x="28"
                          y="42"
                          textAnchor="middle"
                          fill={stripesColors}
                          fontSize="40"
                          fontWeight="bold"
                          fontFamily="Arial, sans-serif"
                        >
                          {initial}
                        </text>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#textPattern)" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-[1] ">
          <Builder
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setDetailType={setDetailType}
            detailType={detailType}
            setStripesNum={setStripesNum}
            stripesNum={stripesNum}
            setStripesColors={setStripesColors}
            stripesColors={stripesColors}
            club={club}
            setClub={setClub}
            pattern={pattern}
            setPattern={setPattern}
            initial={initial}
            setInitial={setInitial}
            topping={topping}
            setTopping={setTopping}
            toppingColor={toppingColor}
            setToppingColors={setToppingColors}
            toppingType={toppingType}
            setToppingType={setToppingType}
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
