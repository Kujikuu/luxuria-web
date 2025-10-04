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
                'title' => 'Expert Brokerage',
                'title_ar' => 'وساطة عقارية متخصصة',
                'description' => 'Professional sales & marketing to maximize property value and ensure smooth transactions.',
                'description_ar' => 'مبيعات وتسويق احترافي لتعزيز قيمة العقار وضمان سلاسة المعاملات.',
                'image' => 'https://framerusercontent.com/images/FnGLm2yRNviYdXrQyrqRuUBnz0.png?width=904&height=1200',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Property Management',
                'title_ar' => 'إدارة العقارات',
                'description' => 'End-to-end operational solutions for landlords and investors with efficiency and tenant satisfaction at the core.',
                'description_ar' => 'حلول تشغيلية شاملة للملاك والمستثمرين، مع التركيز على الكفاءة ورضا المستأجرين.',
                'image' => 'https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?width=1200&height=800',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Investment Guidance',
                'title_ar' => 'الإرشاد الاستثماري',
                'description' => 'Market analysis, valuation, and consultancy to optimize property investments.',
                'description_ar' => 'تحليل السوق، والتقييم، والاستشارات لتحسين استثماراتك العقارية.',
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
