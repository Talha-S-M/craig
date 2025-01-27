"use client";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./_components";
import MergeMultipleGLBs from "./_components/Merger/page";

export default function Home() {
  return (
    <>
      <div className="h-full w-full">
        <MergeMultipleGLBs />
          {/* <Experience /> */}
      </div>
    </>
  );
}
