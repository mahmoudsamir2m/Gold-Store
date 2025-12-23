"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


const signupSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
    email: z.string().email("الرجاء إدخال بريد إلكتروني صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loginWithGoogle, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data.email, data.password, data.name);
      toast(
        <div className="text-right">
          <strong>تم إنشاء الحساب</strong>
          <p>مرحبًا بك في دهبنا!</p>
        </div>
      );
      router.push("/");
    } catch (err) {
      toast(
        <div className="text-right">
          <strong>فشل التسجيل</strong>
          <p>لم نتمكن من إنشاء الحساب. حاول مرة أخرى.</p>
        </div>
      );
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      toast(
        <div className="text-right">
          <strong>تم إنشاء الحساب</strong>
          <p>مرحبًا بك في دهبنا!</p>
        </div>
      );
      router.push("/");
    } catch (err) {
      toast(
        <div className="text-right">
          <strong>فشل التسجيل</strong>
          <p>لم نتمكن من التسجيل باستخدام Google. حاول مرة أخرى.</p>
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-4 py-12 "
      dir="rtl"
    >
      <div className="w-full max-w-md md:max-w-lg shadow-2xl p-12 rounded-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image src="/icon-gold.png" alt="دهبنا" width={100} height={100} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب</h1>
          <p className="text-gray-600">انضم إلينا وابدأ رحلتك اليوم.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-right"
        >
          {/* الاسم */}
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              الاسم الكامل
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="أدخل اسمك الكامل"
              className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              كلمة المرور
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="أنشئ كلمة مرور"
                className={`h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 pr-12 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              تأكيد كلمة المرور
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="أعد إدخال كلمة المرور"
                className={`h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 pr-12 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </Button>
        </form>

        {/* Google Signup */}
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                أو المتابعة باستخدام
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 mt-4 border-gray-200 hover:bg-gray-50"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <FcGoogle className="w-5 h-5 ml-2" />
            المتابعة باستخدام Google
          </Button>
        </div> */}

        <p className="text-center mt-6 text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}