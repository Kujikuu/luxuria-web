import Button from "../Buttons/Button";
import FAQs from "../FAQs";
import Tag from "../Tag";
import { Text } from "../Typography";

export default function HomeFaqs() {
    return (
        <section className="flex gap-10 py-24 px-10 bg-ui-1 items-center justify-center">
            <div className="grid grid-cols-3 gap-6 max-w-6xl">
                <div className="col-span-1 flex flex-col gap-6">
                    <Tag text="FAQ" />
                    <div className="flex flex-col gap-6">
                        <Text variant="heading2" className="text-text-primary w-full">Your questions answered</Text>
                        <Text variant='bodyLarge' className="text-text-secondary max-w-[240px]">Here are the most common questions.</Text>
                    </div>
                    <Button variant='secondary' href="/contact" text="Get in touch" />
                </div>
                <div className="col-span-2">
                    <FAQs />
                </div>
            </div>
        </section>
    );
}