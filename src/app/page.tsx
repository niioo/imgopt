import type { Metadata } from "next";
import dynamic from "next/dynamic";
// import ImageSection from '@/components/images'
const ImageSection = dynamic(() => import("@/components/imagesection"), {
  ssr: false,
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Map of the entire world's materials that regenerate a cleaner future | tocco`,
    description: `tocco Awards 2024: honoring innovators in alternative materials for a cleaner future. Vote for visionary solutions for a greener future.`,
    alternates: {
      canonical: `/awards/2024`,
    },
  };
};

type Props = {
  searchParams?: {
    vote?: string;
  };
};

const Page = async () => {
  const data = await fetch("https://tocco.earth/api/awards/");
  const awards = await data.json();

  return (
    <div className="flex w-screen bg-white flex-col items-center">
      <div className="h-[50vh] w-screen bg-black flex justify-center items-center text-xl">
        Tocco component 1
      </div>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-600">
        Toco component 2
      </div>
      <ImageSection data={awards} />
    </div>
  );
};
export default Page;
