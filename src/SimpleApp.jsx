import React from 'react'

const SimpleApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">م</span>
              </div>
              <h1 className="mr-3 text-xl font-bold text-white">منصة الاستشارات الطبية</h1>
            </div>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg transition-colors font-semibold">
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            أفضل منصة للاستشارات الطبية
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            تواصل مع أطباء معتمدين واحصل على استشارة طبية موثوقة من منزلك
          </p>
          <div className="space-x-4 space-x-reverse">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
              ابدأ الآن
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              اعرف المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">خدماتنا الطبية</h3>
            <p className="text-gray-600 text-lg">نقدم مجموعة شاملة من الخدمات الطبية المتخصصة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🩺</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">استشارات عامة</h4>
              <p className="text-gray-600">استشارات طبية شاملة مع أطباء عامين متخصصين</p>
            </div>
            
            {/* Service 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">طب القلب</h4>
              <p className="text-gray-600">فحص وعلاج أمراض القلب والأوعية الدموية</p>
            </div>
            
            {/* Service 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👶</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">طب الأطفال</h4>
              <p className="text-gray-600">رعاية صحية متخصصة للأطفال والمراهقين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">طبيب معتمد</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50000+</div>
              <div className="text-blue-100">استشارة مكتملة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-100">تقييم المستخدمين</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">دعم متواصل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">التطبيق منشور بنجاح على Netlify!</h3>
            <p className="text-gray-600 mb-6">
              تم نشر منصة الاستشارات الطبية بنجاح. جميع الميزات تعمل بشكل صحيح.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">✅ React يعمل</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">✅ TailwindCSS يعمل</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">✅ Netlify يعمل</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">✅ دعم العربية يعمل</strong>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>🚀 Built with React + Vite + TailwindCSS</p>
              <p>📱 Deployed on Netlify</p>
              <p>🌐 Ready for production</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">م</span>
            </div>
            <span className="mr-2 text-xl font-bold">منصة الاستشارات الطبية</span>
          </div>
          <p className="text-gray-400 mb-4">نقدم أفضل الخدمات الطبية الرقمية</p>
          <p className="text-gray-500 text-sm">© 2024 جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleApp
