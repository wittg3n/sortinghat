"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserRound,
  Mail,
  MapPin,
  Shield,
  Settings,
  FileCheck,
  GraduationCap,
  Languages,
  University,
  Bell,
  Upload,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Avatar from "boring-avatars";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
// helper for cropping
const getCroppedImg = (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = (err) => reject(err);
  });
};

export default function Page({ token }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // cropper state
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setImageSrc(reader.result);
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    const blob = await fetch(croppedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append("avatar", blob, "avatar.jpg");

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/users/upload-avatar",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUser({ ...user, avatar: data.avatarUrl });
      setImageSrc(null);
      setCroppedImage(null);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, [token, setUser]);

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-6">
        {/* پروفایل کاربر */}
        <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          {user?.profilePicture ? (
            <div className="w-32 h-32 relative rounded-full overflow-hidden ">
              <Image
                src={`http://localhost:5000${user.profilePicture}`}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Avatar size={128} name={user?.name || "کاربر"} variant="marble" />
          )}

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{user?.name || "کاربر"}</h2>

              {/* دکمه ویرایش پروفایل */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" /> ویرایش پروفایل
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>ویرایش پروفایل</DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 py-2">
                    {/* آپلود تصویر */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="avatar">تصویر نمایه</Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />

                      {imageSrc && !croppedImage && (
                        <div className="relative w-full h-64 bg-black/20 rounded-md overflow-hidden">
                          <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                          />
                        </div>
                      )}

                      {imageSrc && !croppedImage && (
                        <div className="flex flex-col gap-2">
                          <Label>بزرگنمایی</Label>
                          <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(val) => setZoom(val[0])}
                          />
                        </div>
                      )}

                      {croppedImage && (
                        <div className="flex justify-center">
                          <img
                            src={croppedImage}
                            alt="Cropped preview"
                            className="w-24 h-24 rounded-full object-cover border"
                          />
                        </div>
                      )}
                    </div>

                    {/* نام */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">نام کامل</Label>
                      <Input
                        id="name"
                        type="text"
                        defaultValue={user?.name || ""}
                      />
                    </div>

                    {/* ایمیل */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                      />
                    </div>

                    {/* رمز عبور */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">رمز عبور جدید</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="*******"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    {!croppedImage ? (
                      <Button onClick={showCroppedImage}>پیش‌نمایش</Button>
                    ) : (
                      <Button onClick={handleUpload}>ذخیره تغییرات</Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <p className="text-muted-foreground">
              دانشجوی مهندسی کامپیوتر | متقاضی تحصیل در اروپا
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {user?.email}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> تهران، ایران
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> رشته: مهندسی کامپیوتر
              </span>
              <span className="flex items-center gap-2">
                <Languages className="w-4 h-4" /> زبان: IELTS 7.5
              </span>
            </div>
          </div>
        </Card>

        {/* وضعیت کاربر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex flex-col">
            <FileCheck className="w-6 h-6 mb-2 text-primary" />
            <p className="font-bold">مدارک آپلودشده</p>
            <span className="text-sm text-muted-foreground">
              CV، ریزنمرات، مدرک زبان
            </span>
          </Card>
          <Card className="p-4 flex flex-col">
            <University className="w-6 h-6 mb-2 text-green-500" />
            <p className="font-bold">انتخاب دانشگاه‌ها</p>
            <span className="text-sm text-muted-foreground">
              8 دانشگاه انتخاب شده
            </span>
          </Card>
          <Card className="p-4 flex flex-col">
            <UserRound className="w-6 h-6 mb-2 text-blue-500" />
            <p className="font-bold">پیشنهاد هوش مصنوعی</p>
            <span className="text-sm text-muted-foreground">
              15 پیشنهاد برتر آماده است
            </span>
          </Card>
        </div>

        {/* تب‌ها */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">نمای کلی</TabsTrigger>
            <TabsTrigger value="documents">مدارک</TabsTrigger>
            <TabsTrigger value="security">امنیت</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>خلاصه وضعیت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>👤 پروفایل شما تکمیل شده است (80%).</p>
                <p>📂 مدارک لازم آپلود شده‌اند.</p>
                <p>🎯 سیستم 15 دانشگاه مناسب برای شما پیشنهاد کرده است.</p>
                <Button size="sm" className="mt-2">
                  مشاهده لیست دانشگاه‌ها
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>مدارک بارگذاری شده</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>✔️ رزومه (CV.pdf)</p>
                <p>✔️ ریزنمرات کارشناسی (transcript.pdf)</p>
                <p>✔️ مدرک زبان (IELTS.pdf)</p>
                <Button size="sm" variant="outline" className="mt-2">
                  مدیریت مدارک
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>تنظیمات امنیتی</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> احراز هویت دو
                    مرحله‌ای
                  </span>
                  <Button size="sm" variant="outline">
                    فعال‌سازی
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" /> اعلان ورود
                  </span>
                  <Button size="sm" variant="outline">
                    مدیریت
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
