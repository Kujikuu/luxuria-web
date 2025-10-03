<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);

        return [
            'title' => $title,
            'title_ar' => $this->generateArabicTitle(),
            'slug' => Str::slug($title),
            'about' => fake()->paragraph(2),
            'about_ar' => $this->generateArabicAbout(),
            'read_time' => fake()->numberBetween(2, 15),
            'publish_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'featured_image' => collect([
                'https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?scale-down-to=1024&width=904&height=1200',
                'https://framerusercontent.com/images/5rbBnU4EZudjdrSDJqFkv0L6wk.png?scale-down-to=512&width=2912&height=1664',
                'https://framerusercontent.com/images/h47Rv2shExyEhkfIVA3PIrL5bY.png?scale-down-to=1024&width=960&height=1200',
                'https://framerusercontent.com/images/wAdSPQGdzEABwWjwwWOqCZX5pQ.png?scale-down-to=1024&width=800&height=1200',
                'https://framerusercontent.com/images/Oasrwz28dGKaQ476CQW1saXGo68.png?scale-down-to=1024&width=684&height=1200',
                'https://framerusercontent.com/images/QSxpletV1pAh5fbUXfkmyftm2Kg.png?scale-down-to=1024&width=800&height=1200',
            ])
                ->shuffle()
                ->take(1)
                ->values()
                ->all(),
            'content' => $this->generateHtmlContent(),
            'content_ar' => $this->generateArabicHtmlContent(),
            'author_id' => Author::factory(),
        ];
    }

    private function generateHtmlContent(): string
    {
        $paragraphs = [];
        for ($i = 0; $i < fake()->numberBetween(3, 8); $i++) {
            $paragraphs[] = '<p>'.fake()->paragraph(fake()->numberBetween(3, 6)).'</p>';
        }

        return implode("\n\n", $paragraphs);
    }

    private function generateArabicTitle(): string
    {
        $arabicTitles = [
            'أحدث الاتجاهات في السوق العقاري',
            'نصائح للاستثمار في العقارات',
            'كيفية اختيار الموقع المثالي',
            'تطورات البناء الحديث',
            'الاستثمار العقاري للمبتدئين',
            'مستقبل العقارات الفاخرة',
            'أفضل الأحياء السكنية',
            'تمويل العقارات في المنطقة',
        ];

        return fake()->randomElement($arabicTitles);
    }

    private function generateArabicAbout(): string
    {
        $arabicAbouts = [
            'يستكشف هذا المقال أحدث التطورات في السوق العقاري وتأثيرها على المستثمرين والمشترين.',
            'دليل شامل لفهم أساسيات الاستثمار العقاري وكيفية تحقيق عوائد مجزية.',
            'نظرة عميقة على العوامل المؤثرة في اختيار الموقع الأمثل للاستثمار العقاري.',
            'تحليل للتقنيات الحديثة في البناء وكيف تؤثر على قيمة العقارات.',
            'معلومات أساسية للمبتدئين الراغبين في دخول عالم الاستثمار العقاري.',
            'استشراف مستقبل سوق العقارات الفاخرة والفرص الاستثمارية المتاحة.',
            'دليل لاختيار أفضل الأحياء السكنية بناءً على الاحتياجات والميزانية.',
            'شرح مفصل لخيارات التمويل العقاري المتاحة وكيفية الاستفادة منها.',
        ];

        return fake()->randomElement($arabicAbouts);
    }

    private function generateArabicHtmlContent(): string
    {
        $arabicTexts = [
            'يشهد السوق العقاري تطورات مستمرة تتطلب من المستثمرين والمشترين مواكبة أحدث الاتجاهات والتقنيات.',
            'تلعب التكنولوجيا الحديثة دوراً محورياً في تغيير شكل الاستثمار العقاري وطرق التقييم.',
            'من المهم فهم العوامل الاقتصادية والجغرافية التي تؤثر على قيمة العقارات في المناطق المختلفة.',
            'يتطلب النجاح في الاستثمار العقاري دراسة دقيقة للسوق والتخطيط الاستراتيجي طويل المدى.',
            'تتنوع خيارات التمويل العقاري لتلبي احتياجات مختلف شرائح المجتمع والمستثمرين.',
            'يجب على المستثمرين الجدد التعرف على أساسيات السوق قبل اتخاذ قرارات الاستثمار.',
        ];

        $paragraphs = [];
        for ($i = 0; $i < fake()->numberBetween(3, 6); $i++) {
            $paragraphs[] = '<p>'.fake()->randomElement($arabicTexts).' '.fake()->randomElement($arabicTexts).'</p>';
        }

        return implode("\n\n", $paragraphs);
    }
}
