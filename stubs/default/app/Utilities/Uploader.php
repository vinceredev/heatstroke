<?php

namespace App\Utils;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

final class Uploader
{
    private const FOLDER = 'heatstroke';

    private static function upload($image, $size, $filename)
    {
        $file = Image::make($image);

        if ($size) {
            $file->resize(null, $size, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $resource = $file->stream()->detach();

        Storage::disk('s3')->put(
            self::FOLDER . $filename,
            $resource
        );
    }

    private static function createImagePath($path, $size)
    {
        $dirs = explode('/', $path);
        $file = collect($dirs)->map(function ($path, $key) use ($dirs, $size) {
            if ($key === count($dirs) - 1) {
                return $size . '-' . $path;
            }

            return $path;
        })->join('/');

        return $file;
    }

    public static function processImages($name, $image, $sizes = [960])
    {
        $extension = explode('/', mime_content_type($image))[1];
        $timestamp = time();
        $filename = $name . '-' . $timestamp . '.' . $extension;

        $result = [
            'original' => config('app.cdn_url') . $filename,
        ];

        // Upload original file
        self::upload($image, null, $filename);

        foreach ($sizes as $size) {
            $sized_filename = self::createImagePath($filename, $size);

            self::upload($image, $size, $sized_filename);

            $result[$size] = config('app.cdn_url') . $sized_filename;
        }

        return $result;
    }

    public static function removeImages($picture, $sizes = [960])
    {
        $s3_path = self::FOLDER . str_replace(config('app.cdn_url'), '', $picture);

        foreach ($sizes as $size) {
            $compressed_file = self::createImagePath($s3_path, $size);
            Storage::disk('s3')->delete($compressed_file);
        }

        Storage::disk('s3')->delete($s3_path);
    }

    public static function processFiles($folder, $file)
    {
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $extension = $file->extension();
        $filename = $folder . $name . '-' . time() . '.' . $extension;

        Storage::disk('s3')->put(self::FOLDER . $filename, file_get_contents($file));

        return config('app.cdn_url') . $filename;
    }

    public static function removeFiles($file)
    {
        $s3_path = self::FOLDER . str_replace(config('app.cdn_url'), '', $file);
        Storage::disk('s3')->delete($s3_path);
    }
}
