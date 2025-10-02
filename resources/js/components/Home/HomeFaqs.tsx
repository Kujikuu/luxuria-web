import Button from "../Buttons/Button";
import FAQs from "../FAQs";
import Tag from "../Tag";
import { Text } from "../Typography";

export default function HomeFaqs() {
    return (
        <section className="flex gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-ui-1 items-start justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6 max-w-6xl w-full">
                <div className="sticky top-24 lg:col-span-1 flex flex-col gap-4 sm:gap-6 self-start">
                    <Tag text="FAQ" />
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <Text variant="heading2" className="text-text-primary w-full">Your questions answered</Text>
                        <Text variant='bodyLarge' className="text-text-secondary max-w-none lg:max-w-[240px] lg:mx-0">Here are the most common questions.</Text>
                    </div>
                    <div className="flex">
                        <Button variant='secondary' href="/contact" text="Get in touch" />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <FAQs />
                </div>
            </div>
        </section>
    );
}