#!/bin/bash

echo "========================================"
echo "   تثبيت Firebase لمنصة طريقتي العلاجي"
echo "========================================"
echo

echo "🔥 جاري تثبيت Firebase..."
npm install firebase

echo
echo "✅ تم تثبيت Firebase بنجاح!"
echo

echo "📦 تثبيت التبعيات الإضافية..."
npm install

echo
echo "🚀 بناء المشروع..."
npm run build

echo
echo "========================================"
echo "✅ تم الانتهاء من الإعداد!"
echo
echo "الخطوات التالية:"
echo "1. شغل: npm run dev"
echo "2. افتح: http://localhost:5173"
echo "3. جرب تسجيل الدخول بحساب المدير"
echo "4. تحقق من لوحة تحكم المدير"
echo "========================================"
echo

read -p "اضغط Enter للمتابعة..."
