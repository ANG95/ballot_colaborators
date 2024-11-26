"use client";

import localFont from "next/font/local";
//  import '../../../public'
const latoBlack = localFont({
  src: "../../../public/fonts/lato_black.ttf",
  variable: "--font-lato-black",
  weight: "100 900",
});
const latoBold = localFont({
  src: "../../../public/fonts/lato_bold.ttf",
  variable: "--font-lato-bold",
  weight: "100 900",
});

const latoRegular = localFont({
  src: "../../../public/fonts/lato-regular.ttf",
  variable: "--font-lato-regular",
  weight: "100 900",
});

const latoItalic = localFont({
  src: "../../../public/fonts/lato_italic.ttf",
  variable: "--font-lato-italic",
  weight: "100 900",
});

const latoLight = localFont({
  src: "../../../public/fonts/lato_light.ttf",
  variable: "--font-lato-light",
  weight: "100 900",
});
export default function FontLoader() {
  return (
    <div
      className={`
      ${latoBlack.variable} 
    ${latoBold.variable} 
    ${latoRegular.variable}
    ${latoItalic.variable}
    ${latoLight.variable}
     antialiased`}>
      {/* Puedes usar esta clase dentro de tus componentes */}
    </div>
  );
}
