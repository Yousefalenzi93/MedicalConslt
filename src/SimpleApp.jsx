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
              <h1 className="mr-3 text-xl font-bold text-white">طريقتي العلاجي</h1>
            </div>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg transition-colors font-semibold">
              دخول الأطباء
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            طريقتي العلاجي
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            منصة التعاون الطبي المتقدمة
          </p>
          <div className="space-x-4 space-x-reverse">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
              انضم كطبيب
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              تعرف على المنصة
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">خدمات المنصة للأطباء</h3>
            <p className="text-gray-600 text-lg">أدوات متقدمة لتعزيز التعاون والتطوير المهني في المجال الطبي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">استشارات زملاء المهنة</h4>
              <p className="text-gray-600">تبادل الخبرات والاستشارات الطبية مع الزملاء المتخصصين</p>
            </div>

            {/* Service 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">التعليم المستمر</h4>
              <p className="text-gray-600">دورات ومحاضرات طبية متقدمة لتطوير المهارات المهنية</p>
            </div>

            {/* Service 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">البحث والتطوير</h4>
              <p className="text-gray-600">منصة للبحوث الطبية والتطوير العلمي المشترك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2500+</div>
              <div className="text-blue-100">طبيب مسجل</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15000+</div>
              <div className="text-blue-100">استشارة متبادلة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">رضا الأطباء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">منصة متاحة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">طريقتي العلاجية جاهزة!</h3>
            <p className="text-gray-600 mb-6">
              انضم إلى شبكة الأطباء والعاملين في المجال الصحي لتطوير طرق العلاج وتبادل الخبرات.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-blue-800">👨‍⚕️ للأطباء المختصين</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">🏥 للعاملين الصحيين</strong>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <strong className="text-purple-800">📚 التعليم المستمر</strong>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <strong className="text-orange-800">🔬 البحث العلمي</strong>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>🏥 منصة طبية متخصصة</p>
              <p>👨‍⚕️ للمهنيين الصحيين</p>
              <p>🌐 متاحة على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ط</span>
            </div>
            <span className="mr-2 text-xl font-bold">طريقتي العلاجي</span>
          </div>
          <p className="text-gray-400 mb-4">شبكة مهنية للأطباء والعاملين في المجال الصحي</p>
          <p className="text-gray-500 text-sm">© 2024 طريقتي العلاجي - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleApp
