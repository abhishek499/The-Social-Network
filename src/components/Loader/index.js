import React, { Suspense } from "react";

export default function LoaderComponent({ component }) {
  console.log("Hello world");
  return <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>;
}
