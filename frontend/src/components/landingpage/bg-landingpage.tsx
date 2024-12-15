import React from "react";
import ImgDashboard from "../../../public/Dashboard.png";
import Image from "next/image";

const BgLandingPage = () => {
  return (
    <>
      <section className="relative h-[700px] z-[-10]">
        <hr className="w-full h-px" />
        <div className="absolute w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex justify-between relative overflow-hidden">
            <div className="gauche justify-between overflow-hidden relative z-10 gap-[118px] lg:flex">
              <hr className="h-screen w-px z-10 bg-[#2F7678] opacity-50" />
              <div className="absolute w-full -left-44 flex flex-col justify-between gap-3">
                {Array.from({ length: 70 }).map((_, index) => (
                  <hr
                    key={index}
                    className="w-[400px] h-px -rotate-[31.36deg] border border-[#2F7678] opacity-50"
                  />
                ))}
              </div>
              <hr className="h-screen w-px z-10 bg-[#2F7678] opacity-50" />
            </div>
            <hr className="absolute right-[314px] w-px h-full z-10 hidden border border-[#2F7678] opacity-50 lg:block 2xl:right-52" />
            <hr className="absolute left-[337px] w-px h-full z-10 hidden border border-[#2F7678] opacity-50 lg:block 2xl:left-52" />
            <hr className="absolute top-[271px] left-0 w-full h-px z-0 border-[#2F7678] opacity-50" />
            <hr className="absolute left-0 w-full h-px z-0 top-[365px] border-[#2F7678] opacity-50" />
            <hr className="absolute left-0 w-full h-px z-0 top-[538px] border-dashed border-[#2F7678] opacity-50 bg-transparent	" />
            <div className="absolute left-0 w-full h-full">
              <div className="circle-1 rounded-[100%] border border-[#19262F] -mt-[531px] h-[1681px] lg:mx-[120px] mx-0 mb-0 bg-gradient-to-t from-[#1F435C] from-10% via-[#1F435C] to-[#16252F] to-60% opacity-50"></div>
              <div className="circle-2 rounded-[100%] border border-[#19262F] -mt-[845px] h-[601px] lg:mx-[120px] bg-gradient-to-t from-[#172937] from-10% via-[#172937] to-[#142936] to-60% opacity-50 md:h-[1531px]"></div>
            </div>
            <div className="droite justify-between overflow-hidden relative gap-[118px] z-10 lg:flex">
              <hr className="h-screen w-px z-10 bg-[#2F7678] opacity-50" />
              <div className="absolute w-full -left-44 flex flex-col justify-between gap-3">
                {Array.from({ length: 70 }).map((_, index) => (
                  <hr
                    key={index}
                    className="w-[400px] h-px -rotate-[31.36deg] border border-[#2F7678] opacity-50"
                  />
                ))}
              </div>
              <hr className="h-screen w-px z-10 bg-[#2F7678] opacity-50" />
            </div>
          </div>
        </div>

        <div className="text-center absolute w-full mt-20 z-10 px-6">
          <h1 className="dayMode text-primary-900 lg-w-9/12 mx-auto text-[40px] font-medium max-w-[992px] leading-[40px] sm:text-[50px] sm:leading-[50px] md:text-[65px] md:leading-[65px] lg:text-[80px] lg:leading-[80px] xl:text-[94px] xl:leading-[90px]">
            Transformez vos projets en un portfolio professionnel
          </h1>
          <p className="dayMode text-primary-900 mx-auto mt-10 text-absolute top-64 left-0 w-full h-px z-0 color-white text-16 font-normal max-w-lg">
            Une plateforme intuitive pour aider les étudiants de BUT à valoriser
            leurs projets et leurs apprentissages critiques.
          </p>
        </div>

        <div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] -top-[104px] left-[181px] w-[300px] h-[250px] sm:w-[400px] sm:h-[350px] md:w-2/5 md:h-[413px] bg-[#2B4557] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] -top-[120px] right-[275px] w-[300px] h-[350px] bg-[#2F5E73] sm:w-[350px] sm:h-[400px] md:w-[423px] md:h-[486px] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] top-[337px] left-[228px] w-[200px] h-[250px] bg-[#184254] sm:w-[220px] sm:h-[300px] md:w-[236px] md:h-[339px] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] top-[242px] right-[231px] w-[100px] h-[300px] bg-[#2B4557] sm:w-[115px] sm:h-[350px] md:w-[129px] md:h-[414px] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] top-[385px] left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2 bg-[#3c607a] w-[300px] h-[150px] sm:w-[500px] sm:h-[180px] md:w-[700px] md:h-[200px] lg:w-[850px] lg:h-[220px] xl:w-[995px] xl:h-[253px] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2 bg-[#41657f] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[334px] md:h-[297px] opacity-50"></div>
<div className="hidden sm:block absolute rounded-[50%] blur-[90px] z-[4] left-1/2 right-1/2 -translate-x-[90%] -translate-y-1/2 bg-[#2B4557] w-[200px] h-[180px] sm:w-[240px] sm:h-[200px] md:w-[272px] md:h-[220px] opacity-50"></div>
      </section>
      <div>
        <Image
          src={ImgDashboard}
          alt="Dashboard"
          width={1640}
          height={300}
          priority
          className="dayMode -mt-52 lg:mt-0 w-10/12 z-40 text-center mx-auto relative -m-10 rounded-3xl  border-8  lg:border-[26px] border-[#2B4557]"
          sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 80vw,
         (max-width: 1024px) 70vw,
         60vw"
        />
      </div>
    </>
  );
};

export default BgLandingPage;
