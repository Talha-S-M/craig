import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Scene,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

function MergeMultipleGLBs() {
  const glbPaths = [
    "/models/Driver460.glb",
    "/models/Fairway.glb",
    "/models/Hybrid.glb",
    "/models/OverSizedPutter.glb",
    "/models/POM_1in.glb",
    "/models/POM_5in.glb",
    "/models/POM_8in.glb",
    "/models/PutterBladeHeadcover.glb",
    "/models/PutterMalletHeadcover.glb",
    "/models/Tassel.glb",
  ];

  useEffect(() => {
    const mergeGeometriesManually = (geometries) => {
      const mergedGeometry = new BufferGeometry();
      const positionArray = [];
      const normalArray = [];
      const uvArray = [];

      geometries.forEach((geometry) => {
        const position = geometry.getAttribute("position");
        const normal = geometry.getAttribute("normal");
        const uv = geometry.getAttribute("uv");

        if (position) positionArray.push(...position.array);
        if (normal) normalArray.push(...normal.array);
        if (uv) uvArray.push(...uv.array);
      });

      if (positionArray.length) {
        mergedGeometry.setAttribute(
          "position",
          new Float32BufferAttribute(positionArray, 3)
        );
      } else {
        console.error("No position attributes found. Merge aborted.");
        return null;
      }

      if (normalArray.length) {
        mergedGeometry.setAttribute(
          "normal",
          new Float32BufferAttribute(normalArray, 3)
        );
      } else {
        console.warn("Some geometries are missing normals. Proceeding without them.");
      }

      if (uvArray.length) {
        mergedGeometry.setAttribute("uv", new Float32BufferAttribute(uvArray, 2));
      } else {
        console.warn("Some geometries are missing UVs. Proceeding without them.");
      }

      return mergedGeometry;
    };

    const exportMergedModel = (scene) => {
        console.log("Scene children count: ", scene.children.length);
        scene.children.forEach(child => console.log(child)); // Check all objects in the scene
        
        
return;          

      const exporter = new GLTFExporter();

      console.log("Exporting scene with structure:", scene);

      exporter.parse(
        scene,
        (result) => {
          if (result instanceof ArrayBuffer) {
            console.log("Export successful. Preparing file for download...");
            const blob = new Blob([result], { type: "model/gltf-binary" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "merged-model.glb";
            link.click();
            console.log("Download initiated for merged GLB model.");
          } else {
            console.error("Unexpected result type from exporter:", result);
          }
        },
        { binary: true }
      );
    };

    const mergeModels = async () => {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);

      const geometries = [];
      try {
        for (const path of glbPaths) {
          await new Promise((resolve, reject) => {
            loader.load(
              path,
              (gltf) => {
                gltf.scene.traverse((child) => {
                  if (child.isMesh) {
                    geometries.push(child.geometry);
                  }
                });
                resolve();
              },
              undefined,
              (error) => {
                console.error(`Failed to load ${path}:`, error);
                reject(error);
              }
            );
          });
        }

        if (geometries.length === 0) {
          console.error("No geometries found in loaded models. Merge aborted.");
          return;
        }

        const mergedGeometry = mergeGeometriesManually(geometries);
        // mergedGeometry.children.forEach((child, index) => {
        //     if (child.isMesh) {
        //       console.log(`Mesh ${index}:`, child.geometry, child.material);
        //     } else {
        //       console.warn(`Child ${index} is not a Mesh:`, child);
        //     }
        //   });
        if (!mergedGeometry) return;

        const material = new MeshStandardMaterial({ color: "white" });
        const mergedMesh = new Mesh(mergedGeometry, material);

        const mergedScene = new Scene();
        mergedScene.add(mergedMesh);

        
        exportMergedModel(mergedScene);
      } catch (error) {
        console.error("An error occurred while merging models:", error);
      }
    };

    mergeModels();
  }, [glbPaths]);

  return null;
}

export default MergeMultipleGLBs;
