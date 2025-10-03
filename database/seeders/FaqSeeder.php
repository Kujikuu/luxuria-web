<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'What services do you offer?',
                'question_ar' => 'ما هي الخدمات التي تقدمونها؟',
                'answer' => 'We offer a comprehensive range of luxury real estate services including property sales, rentals, property management, and investment advisory. Our expert team is dedicated to providing personalized service to meet all your real estate needs.',
                'answer_ar' => 'نقدم مجموعة شاملة من خدمات العقارات الفاخرة بما في ذلك بيع العقارات والإيجار وإدارة العقارات والاستشارات الاستثمارية. فريق الخبراء لدينا مكرس لتقديم خدمة شخصية لتلبية جميع احتياجاتك العقارية.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'How do I schedule a property viewing?',
                'question_ar' => 'كيف يمكنني جدولة معاينة عقار؟',
                'answer' => 'You can schedule a property viewing by contacting our team through the contact form on our website, calling our office directly, or using our online booking system. We offer flexible viewing times to accommodate your schedule, including evenings and weekends.',
                'answer_ar' => 'يمكنك جدولة معاينة عقار عن طريق الاتصال بفريقنا من خلال نموذج الاتصال على موقعنا الإلكتروني، أو الاتصال بمكتبنا مباشرة، أو استخدام نظام الحجز عبر الإنترنت. نحن نقدم أوقات مشاهدة مرنة لتناسب جدولك، بما في ذلك المساء وعطلات نهاية الأسبوع.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'What are your commission rates?',
                'question_ar' => 'ما هي أسعار العمولة لديكم؟',
                'answer' => 'Our commission rates are competitive and vary depending on the type of service and property value. We believe in transparent pricing and will provide you with a detailed breakdown of all costs involved before any agreement is signed.',
                'answer_ar' => 'أسعار العمولة لدينا تنافسية وتختلف حسب نوع الخدمة وقيمة العقار. نحن نؤمن بالتسعير الشفاف وسنقدم لك توزيعًا مفصلاً لجميع التكاليف المتضمنة قبل توقيع أي اتفاقية.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Do you provide property management services?',
                'question_ar' => 'هل تقدمون خدمات إدارة العقارات؟',
                'answer' => 'Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance coordination, property inspections, and financial reporting. Our goal is to maximize your investment returns while minimizing your involvement in day-to-day operations.',
                'answer_ar' => 'نعم، نحن نقدم خدمات إدارة العقارات الشاملة بما في ذلك فحص المستأجرين وتحصيل الإيجار وتنسيق الصيانة وفحص العقارات والتقارير المالية. هدفنا هو تعظيم عوائد استثمارك مع تقليل مشاركتك في العمليات اليومية.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'What areas do you cover?',
                'question_ar' => 'ما هي المناطق التي تغطونها؟',
                'answer' => 'We specialize in luxury properties across prime locations in the city and surrounding metropolitan areas. Our extensive network allows us to serve clients looking for premium real estate opportunities in the most desirable neighborhoods.',
                'answer_ar' => 'نحن متخصصون في العقارات الفاخرة عبر المواقع الرئيسية في المدينة والمناطق الحضرية المحيطة. شبكتنا الواسعة تسمح لنا بخدمة العملاء الذين يبحثون عن فرص عقارية متميزة في أكثر الأحياء المرغوبة.',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
