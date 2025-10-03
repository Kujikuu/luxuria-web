<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'name_ar' => $this->generateArabicName(),
            'role' => fake()->randomElement(['Writer', 'Editor', 'Blogger', 'Journalist', 'Content Creator', 'Technical Writer']),
            'role_ar' => $this->generateArabicRole(),
            'image' => fake()->imageUrl(300, 300, 'people', true),
            'about' => fake()->paragraph(3),
            'about_ar' => $this->generateArabicAbout(),
        ];
    }

    private function generateArabicName(): string
    {
        $arabicNames = [
            'أحمد محمد الأحمد',
            'فاطمة علي السالم',
            'محمد عبدالله النور',
            'عائشة حسن الزهراني',
            'علي سالم القحطاني',
            'نورا أحمد العتيبي',
            'يوسف محمد الخليل',
            'مريم عبدالرحمن الشهري',
        ];

        return fake()->randomElement($arabicNames);
    }

    private function generateArabicRole(): string
    {
        $arabicRoles = [
            'كاتب محتوى',
            'محرر',
            'مدون',
            'صحفي',
            'منشئ محتوى',
            'كاتب تقني',
            'محلل عقاري',
            'خبير استثمار',
        ];

        return fake()->randomElement($arabicRoles);
    }

    private function generateArabicAbout(): string
    {
        $arabicAbouts = [
            'خبير في مجال العقارات مع أكثر من عشر سنوات من الخبرة في السوق المحلي. متخصص في تحليل الاتجاهات العقارية وتقديم المشورة للمستثمرين.',
            'كاتبة محتوى متخصصة في القطاع العقاري، تتمتع بخبرة واسعة في كتابة التقارير والتحليلات المتعمقة حول السوق العقاري.',
            'محلل استثمار عقاري مع خلفية قوية في الاقتصاد والتمويل. يقدم استشارات متخصصة للمطورين والمستثمرين الأفراد.',
            'صحفية اقتصادية متخصصة في تغطية أخبار السوق العقاري والتطورات العمرانية في المنطقة.',
            'خبير في التسويق العقاري الرقمي ومنشئ محتوى يركز على أحدث الاتجاهات في مجال التكنولوجيا العقارية.',
            'محرر تنفيذي مع خبرة في النشر والإعلام العقاري، متخصص في إنتاج المحتوى التعليمي والتوعوي للمستثمرين.',
        ];

        return fake()->randomElement($arabicAbouts);
    }
}
