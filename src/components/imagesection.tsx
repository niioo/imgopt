"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Images = ({ data }: any) => {
  // State to hold the current list of images
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  // State to track the number of images already loaded
  const [loadedImages, setLoadedImages] = useState(0);

  // Function to load more images
  const loadMoreImages = () => {
    // Determine the next set of images to load
    const nextImages = data.data
      .filter((d: any) => d.display_status === "public" && d.logo !== null)
      .slice(loadedImages, loadedImages + 300); // Load 400 more images each time
    setVisibleImages((prevImages) => [...prevImages, ...nextImages]);
    setLoadedImages(loadedImages + 400);
  };

  // Effect to load initial images on mount
  useEffect(() => {
    loadMoreImages();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to add scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled to the bottom of the visible content
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        loadMoreImages();
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadedImages]); // Depend on loadedImages to ensure we're always using the latest count

  return (
    <div>
      <div className="flex flex-wrap">
        {visibleImages.map((award: any, index) => (
          <div key={index}>
            <div>{award.name}</div>
            <div>
              <Image
                src={`https://sup.tocco.earth/storage/v1/object/public/supplier-img/${award.logo}`}
                alt={award.name}
                loading="lazy"
                width={100}
                height={100}
                className="transition-opacity opacity-0 duration-[2s]"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABzElEQVRIS+2Uz0oDQRSGz4"
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
