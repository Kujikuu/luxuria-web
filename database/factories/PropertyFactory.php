<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $propertyTypes = Property::PROPERTY_TYPES;
        $propertyCategories = Property::PROPERTY_CATEGORIES;
        $propertyDescriptions = Property::PROPERTY_DESCRIPTIONS;

        $title = fake()->randomElement([
            'Luxury Villa with Pool',
            'Modern Apartment Downtown',
            'Commercial Office Space',
            'Spacious Land Plot',
            'Cozy Studio Apartment',
            'Prime Commercial Building',
            'Family House with Garden',
            'Retail Shop in Mall',
        ]);

        return [
            'title' => $title,
            'title_ar' => $this->generateArabicTitle(),
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1000, 9999),
            'property_type' => fake()->randomElement($propertyTypes),
            'property_category' => fake()->randomElement($propertyCategories),
            'property_description' => fake()->randomElement($propertyDescriptions),
            'description' => $this->generateHtmlDescription(),
            'description_ar' => $this->generateArabicHtmlDescription(),
            'property_area' => fake()->numberBetween(50, 2000),
            'property_location' => $this->generateGoogleMapsLink(),
            'property_location_ar' => $this->generateArabicLocation(),
            'images' => $this->generateImageUrls(),
            'price' => fake()->numberBetween(50000, 5000000),
            'advertising_license_number' => 'ADV-'.fake()->numberBetween(100000, 999999),
            'pdf' => fake()->boolean(70) ? 'property-documents/'.fake()->uuid().'.pdf' : null,
            'featured' => fake()->boolean(30), // 30% chance of being featured
        ];
    }

    private function generateGoogleMapsLink(): string
    {
        $lat = fake()->latitude(16.0, 32.0); // KSA latitude range
        $lng = fake()->longitude(34.0, 56.0); // KSA longitude range

        return "https://maps.google.com/?q={$lat},{$lng}";
    }

    private function generateImageUrls(): array
    {
        $availableImages = [
            'https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?scale-down-to=1024&width=904&height=1200',
            'https://framerusercontent.com/images/5rbBnU4EZudjdrSDJqFkv0L6wk.png?scale-down-to=512&width=2912&height=1664',
            'https://framerusercontent.com/images/h47Rv2shExyEhkfIVA3PIrL5bY.png?scale-down-to=1024&width=960&height=1200',
            'https://framerusercontent.com/images/wAdSPQGdzEABwWjwwWOqCZX5pQ.png?scale-down-to=1024&width=800&height=1200',
            'https://framerusercontent.com/images/Oasrwz28dGKaQ476CQW1saXGo68.png?scale-down-to=1024&width=684&height=1200',
            'https://framerusercontent.com/images/QSxpletV1pAh5fbUXfkmyftm2Kg.png?scale-down-to=1024&width=800&height=1200',
        ];

        $imageCount = fake()->numberBetween(1, 3);

        return collect($availableImages)
            ->shuffle()
            ->take($imageCount)
            ->values()
            ->all();
    }

    private function generateHtmlDescription(): string
    {
        $descriptions = [
            '<h2>Property Overview</h2><p>This exceptional property offers <strong>modern living</strong> with premium amenities and finishes throughout. Located in a desirable neighborhood, it features:</p><ul><li>Spacious living areas with natural light</li><li>Contemporary kitchen with high-end appliances</li><li>Master suite with walk-in closet</li><li>Private outdoor space</li></ul><blockquote>Perfect for families or professionals seeking luxury and convenience.</blockquote>',

            '<h2>Luxury Features</h2><p>Experience <em>unparalleled comfort</em> in this beautifully designed space. Key highlights include:</p><ul><li><strong>Premium flooring</strong> throughout</li><li>Central air conditioning system</li><li>Built-in storage solutions</li><li>24/7 security services</li></ul><h3>Additional Amenities</h3><p>Residents enjoy access to exclusive facilities including fitness center, swimming pool, and landscaped gardens.</p>',

            '<h2>Investment Opportunity</h2><p>This property represents an <strong>excellent investment</strong> in a rapidly developing area. Features include:</p><ol><li>High rental yield potential</li><li>Strategic location near business districts</li><li>Modern infrastructure and utilities</li><li>Growing neighborhood with future developments</li></ol><p><em>Contact us today</em> to schedule a private viewing and learn more about financing options.</p>',

            '<h2>Prime Location Benefits</h2><p>Strategically positioned for <strong>maximum convenience</strong>, this property offers:</p><ul><li>Easy access to major highways</li><li>Walking distance to shopping centers</li><li>Top-rated schools nearby</li><li>Public transportation connections</li></ul><h3>Neighborhood Highlights</h3><p>The area boasts <em>excellent dining</em>, entertainment venues, and recreational facilities, making it perfect for modern lifestyle needs.</p>',
        ];

        return fake()->randomElement($descriptions);
    }

    private function generateArabicTitle(): string
    {
        $arabicTitles = [
            'فيلا فاخرة مع مسبح',
            'شقة عصرية في وسط المدينة',
            'مساحة مكتبية تجارية',
            'قطعة أرض واسعة',
            'شقة استوديو مريحة',
            'مبنى تجاري في موقع مميز',
            'منزل عائلي مع حديقة',
            'محل تجاري في مول',
        ];

        return fake()->randomElement($arabicTitles);
    }

    private function generateArabicLocation(): string
    {
        $arabicLocations = [
            'الرياض، المملكة العربية السعودية',
            'جدة، المملكة العربية السعودية',
            'مكة المكرمة، المملكة العربية السعودية',
            'الدمام، المملكة العربية السعودية',
            'الخبر، المملكة العربية السعودية',
            'المدينة المنورة، المملكة العربية السعودية',
            'تبوك، المملكة العربية السعودية',
            'أبها، المملكة العربية السعودية',
        ];

        return fake()->randomElement($arabicLocations);
    }

    private function generateArabicHtmlDescription(): string
    {
        $descriptions = [
            '<h2>نظرة عامة على العقار</h2><p>يقدم هذا العقار الاستثنائي <strong>معيشة عصرية</strong> مع وسائل الراحة والتشطيبات المتميزة في جميع الأنحاء. يقع في حي مرغوب فيه ويتميز بـ:</p><ul><li>مساحات معيشة واسعة مع الضوء الطبيعي</li><li>مطبخ عصري مع أجهزة عالية الجودة</li><li>جناح رئيسي مع خزانة ملابس</li><li>مساحة خارجية خاصة</li></ul><blockquote>مثالي للعائلات أو المهنيين الذين يسعون للرفاهية والراحة.</blockquote>',

            '<h2>المميزات الفاخرة</h2><p>استمتع بـ <em>الراحة التي لا مثيل لها</em> في هذا المساحة المصممة بجمال. النقاط المهمة تشمل:</p><ul><li><strong>أرضيات متميزة</strong> في جميع الأنحاء</li><li>نظام تكييف مركزي</li><li>حلول تخزين مدمجة</li><li>خدمات أمنية على مدار الساعة</li></ul><h3>وسائل الراحة الإضافية</h3><p>يتمتع السكان بالوصول إلى مرافق حصرية تشمل مركز للياقة البدنية ومسبح وحدائق منسقة.</p>',

            '<h2>فرصة استثمارية</h2><p>يمثل هذا العقار <strong>استثماراً ممتازاً</strong> في منطقة سريعة التطور. المميزات تشمل:</p><ol><li>إمكانية عائد إيجاري مرتفع</li><li>موقع استراتيجي بالقرب من المناطق التجارية</li><li>بنية تحتية حديثة ومرافق</li><li>حي متنامي مع تطورات مستقبلية</li></ol><p><em>اتصل بنا اليوم</em> لجدولة معاينة خاصة وتعرف على المزيد حول خيارات التمويل.</p>',

            '<h2>فوائد الموقع المتميز</h2><p>يقع بشكل استراتيجي لتحقيق <strong>أقصى درجات الراحة</strong>، ويقدم هذا العقار:</p><ul><li>وصول سهل إلى الطرق الرئيسية</li><li>على مسافة قريبة من مراكز التسوق</li><li>مدارس مرموقة في المنطقة</li><li>وصلات النقل العام</li></ul><h3>معالم الحي</h3><p>تفتخر المنطقة بـ <em>تناول طعام ممتاز</em> وأماكن ترفيهية ومرافق ترفيهية، مما يجعلها مثالية لاحتياجات نمط الحياة الحديث.</p>',
        ];

        return fake()->randomElement($descriptions);
    }
}
