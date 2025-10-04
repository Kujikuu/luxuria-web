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
                'question' => 'What services does LUXURIA provide?',
                'question_ar' => 'ما هي الخدمات التي تقدمها لكجريا؟',
                'answer' => 'We specialize in brokerage, property management, luxury housing, and investment consultancy.',
                'answer_ar' => 'نتخصص في الوساطة العقارية، وإدارة العقارات، والإسكان الفاخر، والاستشارات الاستثمارية.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Where are your properties located?',
                'question_ar' => 'أين تقع عقاراتكم؟',
                'answer' => 'All properties are located in prime real estate areas, carefully selected for convenience and prestige.',
                'answer_ar' => 'جميع العقارات تقع في مناطق عقارية مميزة، مختارة بعناية لضمان راحتكم وفخامة عقاراتكم.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Why should I invest with LUXURIA?',
                'question_ar' => 'لماذا أستثمر مع لكجريا؟',
                'answer' => 'We offer diverse revenue streams, deep market expertise, and innovative real estate solutions tailored to client needs.',
                'answer_ar' => 'نقدم مصادر دخل متنوعة، وخبرة واسعة في السوق، وحلولاً عقارية مبتكرة مصممة خصيصاً لتلبية احتياجات عملائنا.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Do you handle property maintenance?',
                'question_ar' => 'هل تتولى لكجريا صيانة العقارات؟',
                'answer' => 'Yes. We provide complete facility management, tenant relations, and compliance with real estate regulations.',
                'answer_ar' => 'نعم. نحن نوفر إدارة كاملة للمرافق، وعلاقات مع المستأجرين، والامتثال للوائح العقارات.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'How can I contact your team?',
                'question_ar' => 'كيف يمكنني التواصل مع فريقكم؟',
                'answer' => 'You can reach us via email at broker@luxuria.sa  or call us at 0503422777 / 0580037374.',
                'answer_ar' => 'يمكنك التواصل معنا عبر البريد الإلكتروني على broker@luxuria.sa أو الاتصال بنا على 0503422777 / 0580037374.',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
