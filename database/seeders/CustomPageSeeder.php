<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'privacy-policy',
                'title' => [
                    'en' => 'Privacy Policy',
                    'ar' => 'سياسة الخصوصية'
                ],
                'subtitle' => [
                    'en' => 'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.',
                    'ar' => 'خصوصيتك مهمة بالنسبة لنا. تشرح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك.'
                ],
                'content' => [
                    'en' => '
                        <h3>1. Information We Collect</h3>
                        <p>We collect information you provide directly to us, such as when you create an account, make an inquiry, or contact us. This may include your name, email address, phone number, and any other information you choose to provide.</p>

                        <h3>2. How We Use Your Information</h3>
                        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.</p>

                        <h3>3. Information Sharing and Disclosure</h3>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in certain limited circumstances, such as with service providers who assist us in operating our website.</p>

                        <h3>4. Data Security</h3>
                        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

                        <h3>5. Your Rights</h3>
                        <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. To exercise these rights, please contact us using the information provided below.</p>

                        <h3>6. Cookies and Tracking Technologies</h3>
                        <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>

                        <h3>7. Changes to This Policy</h3>
                        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the "Last Updated" date.</p>

                        <h3>8. Contact Us</h3>
                        <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@luxuria.sa">privacy@luxuria.sa</a> or call us at +966 11 234 5678.</p>
                    ',
                    'ar' => '
                        <h3>1. المعلومات التي نجمعها</h3>
                        <p>نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب أو إجراء استفسار أو التواصل معنا. قد يشمل ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وأي معلومات أخرى تختار تقديمها.</p>

                        <h3>2. كيف نستخدم معلوماتك</h3>
                        <p>نستخدم المعلومات التي نجمعها لتقديم وصيانة وتحسين خدماتنا، ومعالجة المعاملات، وإرسال الإشعارات الفنية ورسائل الدعم، والتواصل معك حول المنتجات والخدمات والعروض الترويجية.</p>

                        <h3>3. مشاركة المعلومات والكشف عنها</h3>
                        <p>لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف ثالثة بدون موافقتك، باستثناء ما هو موضح في هذه السياسة. قد نشارك معلوماتك في ظروف محدودة معينة، مثل مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا.</p>

                        <h3>4. أمان البيانات</h3>
                        <p>ننفذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.</p>

                        <h3>5. حقوقك</h3>
                        <p>لديك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها. يمكنك أيضاً إلغاء الاشتراك في اتصالات معينة منا. لممارسة هذه الحقوق، يرجى التواصل معنا باستخدام المعلومات المقدمة أدناه.</p>

                        <h3>6. ملفات تعريف الارتباط وتقنيات التتبع</h3>
                        <p>نستخدم ملفات تعريف الارتباط وتقنيات التتبع المشابهة لتحسين تجربتك على موقعنا. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات متصفحك.</p>

                        <h3>7. تغييرات على هذه السياسة</h3>
                        <p>قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات من خلال نشر السياسة الجديدة على موقعنا وتحديث تاريخ "آخر تحديث".</p>

                        <h3>8. تواصل معنا</h3>
                        <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على <a href="mailto:privacy@luxuria.sa">privacy@luxuria.sa</a> أو الاتصال بنا على +966 11 234 5678.</p>
                    '
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'terms-of-service',
                'title' => [
                    'en' => 'Terms of Service',
                    'ar' => 'شروط الخدمة'
                ],
                'subtitle' => [
                    'en' => 'Please read these terms of service carefully before using our website and services.',
                    'ar' => 'يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقعنا وخدماتنا.'
                ],
                'content' => [
                    'en' => '
                        <h3>1. Acceptance of Terms</h3>
                        <p>By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.</p>

                        <h3>2. Description of Services</h3>
                        <p>LUXURIA provides real estate brokerage, property management, investment consulting, and related services. We facilitate property transactions and provide information about real estate opportunities.</p>

                        <h3>3. User Responsibilities</h3>
                        <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the website.</p>

                        <h3>4. Property Information</h3>
                        <p>While we strive to provide accurate and up-to-date property information, we do not guarantee the completeness or accuracy of all property details. We recommend independent verification of all property information.</p>

                        <h3>5. Intellectual Property</h3>
                        <p>The content, organization, graphics, design, and other matters related to the website are protected under applicable copyrights and other proprietary laws.</p>

                        <h3>6. Limitation of Liability</h3>
                        <p>LUXURIA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

                        <h3>7. Termination</h3>
                        <p>We may terminate or suspend your access to our services at any time, with or without cause, and with or without notice.</p>

                        <h3>8. Governing Law</h3>
                        <p>These terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.</p>

                        <h3>9. Changes to Terms</h3>
                        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.</p>

                        <h3>10. Contact Information</h3>
                        <p>If you have any questions about these terms, please contact us at <a href="mailto:legal@luxuria.sa">legal@luxuria.sa</a> or call us at +966 11 234 5678.</p>
                    ',
                    'ar' => '
                        <h3>1. قبول الشروط</h3>
                        <p>من خلال الوصول واستخدام هذا الموقع وخدماتنا، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.</p>

                        <h3>2. وصف الخدمات</h3>
                        <p>تقدم لكجريا خدمات الوساطة العقارية وإدارة الممتلكات والاستشارات الاستثمارية والخدمات ذات الصلة. نحن نسهل المعاملات العقارية ونقدم معلومات حول الفرص العقارية.</p>

                        <h3>3. مسؤوليات المستخدم</h3>
                        <p>توافق على استخدام خدماتنا فقط للأغراض القانونية وبطريقة لا تنتهك حقوق الآخرين أو تقيد استخدامهم واستمتاعهم بالموقع.</p>

                        <h3>4. معلومات العقار</h3>
                        <p>بينما نسعى لتقديم معلومات عقارية دقيقة ومحدثة، فإننا لا نضمن اكتمال أو دقة جميع تفاصيل العقار. ننصح بالتحقق المستقل من جميع معلومات العقار.</p>

                        <h3>5. الملكية الفكرية</h3>
                        <p>المحتوى والتنظيم والرسوميات والتصميم والمسائل الأخرى المتعلقة بالموقع محمية تحت حقوق الطبع والنشر المعمول بها والقوانين الملكية الأخرى.</p>

                        <h3>6. حدود المسؤولية</h3>
                        <p>لن تكون لكجريا مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، أو أي فقدان في الأرباح أو الإيرادات.</p>

                        <h3>7. الإنهاء</h3>
                        <p>يجوز لنا إنهاء أو تعليق وصولك إلى خدماتنا في أي وقت، مع أو بدون سبب، ومع أو بدون إشعار.</p>

                        <h3>8. القانون الحاكم</h3>
                        <p>تحكم هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية.</p>

                        <h3>9. تغييرات على الشروط</h3>
                        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التغييرات سارية فوراً عند النشر على الموقع.</p>

                        <h3>10. معلومات التواصل</h3>
                        <p>إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا على <a href="mailto:legal@luxuria.sa">legal@luxuria.sa</a> أو الاتصال بنا على +966 11 234 5678.</p>
                    '
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($pages as $pageData) {
            \App\Models\CustomPage::create($pageData);
        }
    }
}
