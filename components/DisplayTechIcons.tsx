"use client"; // This marks the file as a client component

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

interface TechIconProps {
  techStack: { tech: string; url: string }[];
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchTechLogos = async () => {
      const logos = await getTechLogos(techStack);
      setTechIcons(logos);
    };
    fetchTechLogos();
  }, [techStack]);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
