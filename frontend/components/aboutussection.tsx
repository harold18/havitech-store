import Image from "next/image";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getImageUrl(url: string | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = STRAPI_URL.endsWith("/") ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

interface AboutProps {
  data: {
    id: number;
    title: string;
    descrip: string;
    descrip_1: string;
    subtitle_1: string;
    descrip_2: string;
    subtitle_2: string;
    descrip_3: string;
    subtitle_3: string;
    image: {
      url: string;
      alternativeText: string;
    } | null;
  };
}

export default function AboutusSection({ data }: AboutProps) {
  const imageUrl = getImageUrl(data.image?.url) ?? null;
  return (
    <section className="container mx-auto w-full py-8 px-4 sm:px-6 md:py-15">
      <div className="about-back min-h-full md:min-h-[650px] bg-[#0c111cb3] backdrop-blur-md border border-[#c2c2c21a] rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
        <div className="about-wrapper w-full flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex flex-col flex-wrap justify-center">
            <div className="wrapper-title flex flex-col justify-center items-center md:justify-start md:items-start text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                {data.title}
              </h1>
              <p className="text-gray-400 mb-8 max-w-md">
                {data.descrip}
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center md:items-start gap-4">
                <div className="size-12 rounded-xl bg-[#135bec]/20 flex items-center justify-center shrink-0 border border-[#135bec]/30">
                  <span className="material-symbols-outlined text-[#135bec]">engineering</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{data.descrip_1}</h4>
                  <p className="text-sm text-gray-500">{data.subtitle_1}</p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <div className="size-12 rounded-xl bg-[#135bec]/20 flex items-center justify-center shrink-0 border border-[#135bec]/30">
                  <span className="material-symbols-outlined text-[#135bec]">fingerprint</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{data.descrip_2}</h4>
                  <p className="text-sm text-gray-500">{data.subtitle_2}</p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <div className="size-12 rounded-xl bg-[#135bec]/20 flex items-center justify-center shrink-0 border border-[#135bec]/30">
                  <span className="material-symbols-outlined text-[#135bec]">payments</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{data.descrip_3}</h4>
                  <p className="text-sm text-gray-500">{data.subtitle_3}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0 mb-0">
            <div className="w-full flex justify-center">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={data.image?.alternativeText || "Imagen sobre nosotros"}
                  width={800}
                  height={600}
                  className="rounded-3xl shadow-lg block max-w-[90vw] w-full sm:max-w-[500px] md:max-w-[700px] h-[220px] sm:h-[350px] md:h-[550px] object-cover object-center transition-all duration-300"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
