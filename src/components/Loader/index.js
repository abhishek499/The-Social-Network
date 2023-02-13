import React, { Suspense } from "react";

export default function LoaderComponent({ component }) {
  return <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>;
}
