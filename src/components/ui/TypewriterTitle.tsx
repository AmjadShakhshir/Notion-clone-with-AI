"use client";
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterTitle = () => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter.typeString("🚀 Boost Your Productivity").pauseFor(2000).deleteAll().typeString("Take your notes easily").pauseFor(2000).deleteAll().typeString("Start Now.").pauseFor(2000).deleteAll().start();
      }}
    />
  );
};

export default TypewriterTitle;
