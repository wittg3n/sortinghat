"use client";

import React, { useState, useCallback } from "react";
import {
  UserIcon,
  GraduationCap,
  Globe,
  Upload,
  X,
  FileText,
  BookCheck,
  Save,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedCard from "@/components/dashboard/AnimatedCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

const documentTypes = [
  { id: 1, label: "رونوشت", icon: GraduationCap, required: true },
  { id: 2, label: "گذرنامه", icon: Globe, required: true },
  { id: 3, label: "نامه توصیه", icon: UserIcon, required: false },
  { id: 4, label: "نمونه کار", icon: FileText, required: false },
];

const uploadedDocuments = [
  { typeId: 1, title: "transcript.pdf", status: "completed" },
  { typeId: 2, title: "passport.pdf", status: "pending" },
];

const getDocumentStatus = (id) => {
  const doc = uploadedDocuments.find((d) => d.typeId === id);
  return doc
    ? { status: doc.status, document: doc }
    : { status: "not_uploaded", document: null };
};

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return <UserIcon className="w-5 h-5 text-green-500" />;
    case "pending":
      return <UserIcon className="w-5 h-5 text-yellow-500" />;
    default:
      return <UserIcon className="w-5 h-5 text-gray-400" />;
  }
};

const getStatusBadge = (status, required) => {
  let text = "";
  let color = "bg-gray-300 text-gray-700";

  switch (status) {
    case "completed":
      text = "تکمیل شد";
      color = "bg-green-100 text-green-800";
      break;
    case "pending":
      text = "در انتظار";
      color = "bg-yellow-100 text-yellow-800";
      break;
    default:
      text = required ? "الزامی" : "اختیاری";
      color = required
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800";
  }
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${color}`}>
      {text}
    </span>
  );
};

export default function ProfilePage() {
  const user = {
    full_name: "علی رضایی",
    email: "ali.rezaei@example.com",
    profile_completion: 75,
  };

  const [profileData, setProfileData] = useState({
    gpa: 3.85,
    preferred_major: "computer_science",
    sat_score: 1450,
    toefl_score: 108,
    target_countries: [],
  });

  const [files, setFiles] = useState([]);

  const majors = [
    "علوم کامپیوتر",
    "مهندسی برق",
    "مهندسی مکانیک",
    "مدیریت بازرگانی",
    "روانشناسی",
  ];

  const countries = ["ایالات متحده", "کانادا", "آلمان", "فرانسه"];

  const profileCompletion = user?.profile_completion ?? 0;

  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (country) => {
    setProfileData((prev) => {
      const exists = prev.target_countries.includes(country);
      return {
        ...prev,
        target_countries: exists
          ? prev.target_countries.filter((c) => c !== country)
          : [...prev.target_countries, country],
      };
    });
  };

  const onFileReject = useCallback((file, message) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" رد شد`,
    });
  }, []);

  return (
    <main className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <section className="pt-6 px-4 md:px-6">
          <AnimatedCard
            title={
              user?.full_name || "با تکمیل پروفایل، تجربه شخصی‌سازی شده بگیرید"
            }
            subtitle={user?.email || "student@example.com"}
            icon={<UserIcon className="w-10 h-10 text-white" />}
            gradientFrom="#9333ea"
            gradientTo="#be185d"
            circleVariants={circleVariants}
            className="text-white"
          >
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm font-medium">
                فقط چند قدم تا کامل شدن پروفایل باقی مونده!
              </span>
              <Progress
                value={profileCompletion}
                className="w-32 h-2 bg-white/20 "
              />
              <span className="text-sm font-bold">{profileCompletion}%</span>
            </div>
          </AnimatedCard>
        </section>

        {/* ریسپانسیو */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 pt-5 px-4 md:px-6 mb-10">
          {/* doc upload */}
          <Card className="backdrop-blur-sm border-gray-800 sm:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                آپلود مدارک
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                maxFiles={5}
                maxSize={10 * 1024 * 1024}
                value={files}
                onValueChange={setFiles}
                onFileReject={onFileReject}
                multiple
              >
                <FileUploadDropzone>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                      <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">
                      کشیدن و رها کردن فایل‌ها اینجا
                    </p>
                    <p className="text-muted-foreground text-xs">
                      یا کلیک کنید تا مرور شود (حداکثر ۵ فایل، هرکدام تا ۱۰
                      مگابایت)
                    </p>
                  </div>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      آپلود فایل
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>

                <FileUploadList className={"max-h-30 overflow-y-auto "}>
                  {files.map((file, index) => (
                    <FileUploadItem key={index} value={file}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <X />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
            </CardContent>
          </Card>

          {/* educational info */}
          <Card className="backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 ">
                <GraduationCap className="w-5 h-5" />
                اطلاعات تحصیلی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gpa" className="pb-1">
                    معدل (GPA)
                  </Label>
                  <Input
                    id="gpa"
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={profileData.gpa}
                    onChange={(e) =>
                      handleInputChange("gpa", parseFloat(e.target.value))
                    }
                    placeholder="3.85"
                  />
                </div>
                <div>
                  <Label htmlFor="major" className="pb-1">
                    رشته موردنظر
                  </Label>
                  <Select
                    value={profileData.preferred_major || ""}
                    onValueChange={(value) =>
                      handleInputChange("preferred_major", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب رشته" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem
                          key={major}
                          value={major.toLowerCase().replace(/\s+/g, "_")}
                        >
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sat" className="pb-1">
                    نمره SAT
                  </Label>
                  <Input
                    id="sat"
                    type="number"
                    min="400"
                    max="1600"
                    value={profileData.sat_score}
                    onChange={(e) =>
                      handleInputChange("sat_score", parseInt(e.target.value))
                    }
                    placeholder="1450"
                  />
                </div>
                <div>
                  <Label htmlFor="toefl" className="pb-1">
                    نمره آیلتس
                  </Label>
                  <Input
                    id="toefl"
                    type="number"
                    min="0"
                    max="9"
                    value={profileData.toefl_score}
                    onChange={(e) =>
                      handleInputChange("toefl_score", parseInt(e.target.value))
                    }
                    placeholder="6.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* countries */}
          <Card className="backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                کشورهای مقصد
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-44 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.target_countries.map((country) => (
                  <Badge
                    key={country}
                    variant="secondary"
                    className="bg-orange-100 text-gray-700 cursor-pointer hover:bg-orange-200"
                    onClick={() => handleCountryChange(country)}
                  >
                    {country} ×
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {countries
                  .filter((c) => !profileData.target_countries.includes(c))
                  .map((country) => (
                    <Button
                      key={country}
                      variant="outline"
                      size="sm"
                      onClick={() => handleCountryChange(country)}
                      className="text-left justify-start"
                    >
                      + {country}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* checklist */}
          <Card className="backdrop-blur-sm border-gray-800 sm:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                <BookCheck className="w-5 h-5" />
                چک‌لیست مدارک
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-44 overflow-y-auto">
              <div className="space-y-4">
                {documentTypes.map((docType) => {
                  const { status, document } = getDocumentStatus(docType.id);

                  return (
                    <div
                      key={docType.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:bg-gray-800 transition duration-200 ease-in-out"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-linear-65 from-teal-800 to-teal-700">
                          <docType.icon className="w-4 h-4 text-gray-100" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-100">
                            {docType.label}
                          </h4>
                          {document && (
                            <p className="text-xs text-gray-300 mt-1">
                              فایل آپلود شد: {document.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        {getStatusBadge(status, docType.required)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* save button */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center">
            <Button className="bg-teal-400 hover:bg-teal-200 transition duration-300 ease-in-out w-full lg:w-1/3 ">
              <Save className="ml-2" />
              ذخیره تغییرات
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
