const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";
const WHATSAPP_MESSAGE = "Hola, me gustaría solicitar información sobre la compra asistida.";

interface CompraProps {
    data: {
        id: number;
        title: string;
        descrip: string;
    };
}

export default function CompraAsistida({ data }: CompraProps) {
    return (
        <section className="container mx-auto w-full py-20 px-6">
            <div className="compra-wrapper flex flex-col justify-center items-center w-full max-w-3xl mx-auto">
                <div className="rounded-3xl p-7 text-center w-full min-w-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{data.title}</h3>
                    <p className="text-gray-500 text-sm">{data.descrip}</p>
                    <div className="flex justify-center items-center mt-6">
                        <a
                        href={WHATSAPP_PHONE ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-50 gap-2 cursor-pointer items-center justify-center rounded-2xl h-12 px-2 bg-[#135bec] text-white text-base font-bold transition-all hover:scale-105 glow-primary">
                            <span className="material-symbols-outlined">shopping_bag</span> Comprar ahora
                        </a>
                        </div>
                    </div>
                </div>
        </section>
    );
}