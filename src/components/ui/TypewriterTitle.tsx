"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter.typeString("🚀 Supercharged Productivity.").pauseFor(2000).deleteAll().typeString("Take your notes easily").pauseFor(2000).deleteAll().typeString("Start Now.").pauseFor(2000).deleteAll().start();
      }}
    />
  );
};

export default TypewriterTitle;
