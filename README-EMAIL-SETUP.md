# Rich Minds Contact Form Email Setup

## إعداد البريد الإلكتروني لنموذج الاتصال - ريتش مايندز

This guide explains how to set up the email functionality for the Rich Minds contact form using Node.js and Nodemailer.

## Prerequisites | المتطلبات الأساسية

- Node.js (version 14 or higher) | Node.js (الإصدار 14 أو أحدث)
- npm (Node Package Manager) | npm (مدير حزم Node)
- Gmail account with App Password enabled | حساب Gmail مع كلمة مرور التطبيق مفعلة

## Installation | التثبيت

### Step 1: Install Dependencies | الخطوة 1: تثبيت التبعيات

Open terminal/command prompt in your project directory and run:
افتح الترمينال/موجه الأوامر في مجلدك وشغل:

```bash
npm install
```

This will install all required packages:
سيتم تثبيت جميع الحزم المطلوبة:

- express (web server framework)
- nodemailer (email sending)
- cors (cross-origin requests)
- body-parser (request parsing)

### Step 2: Verify Email Configuration | الخطوة 2: التحقق من إعداد البريد

The email is already configured in `server.js` with:
البريد الإلكتروني مُعد مسبقاً في `server.js` مع:

- **Email:** info@richminds.ae
- **App Password:** euet xgvp bkli tylc
- **SMTP Server:** smtp.gmail.com

## Running the Server | تشغيل الخادم

### Option 1: Production Mode | الخيار 1: وضع الإنتاج

```bash
npm start
```

### Option 2: Development Mode (with auto-restart) | الخيار 2: وضع التطوير (مع إعادة التشغيل التلقائي)

```bash
npm run dev
```

The server will start on: http://localhost:3000
سيبدأ الخادم على: http://localhost:3000

## How It Works | كيف يعمل

### 1. Form Submission | إرسال النموذج

- User fills out the contact form | المستخدم يملأ نموذج الاتصال
- JavaScript validates the data | JavaScript يتحقق من البيانات
- Data is sent to `/send-email` endpoint | البيانات ترسل إلى نقطة `/send-email`

### 2. Email Processing | معالجة البريد الإلكتروني

- Server receives form data | الخادم يستقبل بيانات النموذج
- Two emails are sent: | يتم إرسال بريدين إلكترونيين:
  - **Company Email:** Notification to info@richminds.ae | بريد الشركة: إشعار إلى info@richminds.ae
  - **Customer Email:** Auto-reply to customer | بريد العميل: رد تلقائي للعميل

### 3. Response | الاستجابة

- Success/error message shown to user | رسالة نجاح/خطأ تظهر للمستخدم
- Form resets on successful submission | النموذج يُعاد تعيينه عند النجاح

## Email Templates | قوالب البريد الإلكتروني

### Company Notification Email | بريد إشعار الشركة

- Professional layout with Rich Minds branding | تصميم احترافي بهوية ريتش مايندز
- All contact information displayed clearly | جميع معلومات الاتصال معروضة بوضوح
- Service interest highlighted | الخدمة المهتم بها مميزة
- Timestamp included | الوقت والتاريخ مضمن

### Customer Auto-Reply | الرد التلقائي للعميل

- Personalized greeting | تحية شخصية
- Next steps explanation | شرح الخطوات التالية
- Complete contact information | معلومات الاتصال الكاملة
- WhatsApp integration | تكامل واتساب

## Features | المميزات

### ✅ Email Features | مميزات البريد الإلكتروني

- **Dual Email System:** Company notification + Customer auto-reply | نظام بريد مزدوج: إشعار الشركة + رد تلقائي للعميل
- **Professional Templates:** HTML emails with Rich Minds branding | قوالب احترافية: رسائل HTML بهوية ريتش مايندز
- **Validation:** Server-side and client-side validation | التحقق: من جانب الخادم والعميل
- **Error Handling:** Comprehensive error management | معالجة الأخطاء: إدارة شاملة للأخطاء

### ✅ User Experience | تجربة المستخدم

- **Loading States:** Button shows sending status | حالات التحميل: الزر يظهر حالة الإرسال
- **Success Animation:** Visual feedback on success | رسوم متحركة للنجاح: تفاعل بصري عند النجاح
- **Form Reset:** Automatic form clearing | إعادة تعيين النموذج: مسح تلقائي للنموذج
- **Smooth Scrolling:** Auto-scroll to messages | التمرير السلس: تمرير تلقائي للرسائل

## Testing | الاختبار

### 1. Start the server | ابدأ الخادم

```bash
npm start
```

### 2. Open your browser | افتح المتصفح

Navigate to: http://localhost:3000/contact.html
انتقل إلى: http://localhost:3000/contact.html

### 3. Fill out the form | املأ النموذج

- Enter valid information | أدخل معلومات صحيحة
- Select a service (optional) | اختر خدمة (اختياري)
- Write a test message | اكتب رسالة تجريبية

### 4. Submit and verify | أرسل وتحقق

- Check for success message | تحقق من رسالة النجاح
- Check info@richminds.ae inbox | تحقق من صندوق الوارد info@richminds.ae
- Check customer email for auto-reply | تحقق من بريد العميل للرد التلقائي

## Troubleshooting | استكشاف الأخطاء

### Common Issues | المشاكل الشائعة

**❌ "Email configuration error"**

- Check Gmail App Password | تحقق من كلمة مرور تطبيق Gmail
- Ensure 2FA is enabled on Gmail account | تأكد من تفعيل المصادقة الثنائية على Gmail

**❌ "Network error"**

- Check internet connection | تحقق من اتصال الإنترنت
- Verify server is running | تحقق من تشغيل الخادم
- Check firewall settings | تحقق من إعدادات الجدار الناري

**❌ "Port already in use"**

- Change port in server.js | غيّر المنفذ في server.js
- Kill existing Node processes | أوقف عمليات Node الموجودة

### Console Messages | رسائل وحدة التحكم

**✅ Success Messages | رسائل النجاح:**

```
✅ Email server is ready to send messages
🚀 Server running on http://localhost:3000
📧 Email service configured for: info@richminds.ae
✅ Email sent successfully from [Name] ([Email])
```

## Production Deployment | النشر الإنتاجي

### For Production Use | للاستخدام الإنتاجي:

1. **Environment Variables:** Move sensitive data to environment variables | متغيرات البيئة: انقل البيانات الحساسة إلى متغيرات البيئة
2. **HTTPS:** Use SSL certificate | HTTPS: استخدم شهادة SSL
3. **Process Manager:** Use PM2 for process management | مدير العمليات: استخدم PM2 لإدارة العمليات
4. **Rate Limiting:** Add rate limiting for security | تحديد المعدل: أضف تحديد معدل للأمان

## Support | الدعم

For technical support or questions:
للدعم الفني أو الأسئلة:

- **Email:** info@richminds.ae
- **Phone:** +971 56 147 5759
- **WhatsApp:** [Chat on WhatsApp](https://wa.me/971561475759)

---

**Rich Minds - Your Trusted Partner | ريتش مايندز - شريكك الموثوق**
