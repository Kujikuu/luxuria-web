<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            [
                'title' => 'Premium Property Portfolio',
                'title_ar' => 'محفظة عقارات متميزة',
                'description' => 'Curated selection of luxury properties in prime locations with exceptional quality and unique characteristics.',
                'description_ar' => 'مجموعة مختارة من العقارات الفاخرة في مواقع رئيسية بجودة استثنائية وخصائص فريدة.',
                'image' => 'https://framerusercontent.com/images/FnGLm2yRNviYdXrQyrqRuUBnz0.png?width=904&height=1200',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Expert Advisory Services',
                'title_ar' => 'خدمات استشارية خبيرة',
                'description' => 'Professional guidance from experienced real estate experts to help you make informed investment decisions.',
                'description_ar' => 'إرشاد مهني من خبراء عقاريين ذوي خبرة لمساعدتك على اتخاذ قرارات استثمارية مدروسة.',
                'image' => 'https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?width=1200&height=800',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Personalized Service',
                'title_ar' => 'خدمة شخصية',
                'description' => 'Tailored approach to meet your specific needs with dedicated support throughout your real estate journey.',
                'description_ar' => 'نهج مخصص لتلبية احتياجاتك المحددة مع دعم مخصص طوال رحلتك العقارية.',
                'image' => 'https://framerusercontent.com/images/OKoiSJ7boY71o8nLuIvbtaihs4.png?width=1200&height=923',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }
    }
}
