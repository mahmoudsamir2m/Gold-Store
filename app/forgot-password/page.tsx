"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


const forgotPasswordSchema = z.object({
  email: z.string().email("الرجاء إدخال بريد إلكتروني صحيح"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setEmailSent(true);
      toast.success(
        "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
      );
    } catch (error) {
      toast.error("تعذر إرسال البريد. حاول مرة أخرى.");
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <AiOutlineMail className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تحقق من بريدك الإلكتروني
          </h1>
          <p className="text-gray-600 mb-8">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى{" "}
            <span className="font-semibold text-gray-900">
              {getValues("email")}
            </span>
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50"
            >
              تجربة بريد آخر
            </Button>

            <Link href="/login">
              <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                العودة لتسجيل الدخول
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            لم يصلك البريد؟ تحقق من صندوق البريد المزعج أو{" "}
            <button
              onClick={() => onSubmit(getValues())}
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              أعد المحاولة
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
            <span className="font-medium">العودة لتسجيل الدخول</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <Image src="/icon-gold.png" alt="دهبنا" width={100} height={100} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            نسيت كلمة المرور؟
          </h1>
          <p className="text-gray-600">
            لا تقلق! أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة التعيين.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ادخل بريدك الإلكتروني"
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

          <Button
            type="submit"
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          تذكرت كلمة المرور؟{" "}
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
