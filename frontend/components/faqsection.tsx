interface FaqProps {
    data: {
        id: number;
        faq_question_1: string;
        faq_answer_1: string;
        faq_question_2: string;
        faq_answer_2: string;
        faq_question_3: string;
        faq_answer_3: string;
        faq_question_4: string;
        faq_answer_4: string;
        faq_question_5: string;
        faq_answer_5: string;
    };
}

export default function FaqSection({ data }: FaqProps) {
    return (
        <section className="container mx-auto w-full py-20 px-6">
            <div className="faq-wrapper text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl font-bold mb-6">{data.faq_question_1}</h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl text-gray-300 mb-8">{data.faq_answer_1}</p>
                </div>
            </div>
            
        </section>
    );
}