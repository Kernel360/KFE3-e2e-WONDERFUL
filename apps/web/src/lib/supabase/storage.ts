import { createClient } from './client';

const supabase = createClient();

export type StorageBucket = 'auction-images';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

//이미지 업로드
export const uploadImage = async (
  file: File,
  bucket: StorageBucket,
  folder?: string
): Promise<UploadResult> => {
  try {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomStr}.${fileExt}`;

    //폴더 경로 생성
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    //업로드 실행
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    //공개 URL 생성
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Upload exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
};

//이미지 삭제
export const deleteImage = async (
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
};

// 폴더 전체 삭제
export const deleteFolder = async (
  bucket: StorageBucket,
  folderPath: string
): Promise<{ success: boolean; error?: string; deletedCount?: number }> => {
  try {
    // 폴더 내 모든 파일 목록 조회
    const { data: files, error: listError } = await supabase.storage.from(bucket).list(folderPath, {
      offset: 0,
    });

    if (listError) {
      console.error('List folder error:', listError);
      return { success: false, error: listError.message };
    }

    if (!files || files.length === 0) {
      return { success: true, deletedCount: 0 };
    }

    // 파일 경로 생성
    const filePaths = files.map((file) => {
      // 절대 경로인지 확인 (/ 로 시작)
      if (file.name.startsWith('/')) {
        return file.name.substring(1); // 맨 앞 / 제거
      }

      // 이미 folderPath가 포함되어 있는지 확인
      if (file.name.startsWith(folderPath + '/')) {
        return file.name;
      }

      // 일반적인 경우: 폴더 경로 추가
      return `${folderPath}/${file.name}`;
    });

    // 모든 파일 삭제
    const { error: deleteError } = await supabase.storage.from(bucket).remove(filePaths);

    if (deleteError) {
      console.error('Delete folder error:', deleteError);
      return { success: false, error: deleteError.message };
    }

    return { success: true, deletedCount: filePaths.length };
  } catch (error) {
    console.error('Delete folder exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete folder failed',
    };
  }
};

//이미지 URL 가져오기
export const getImageUrl = (bucket: StorageBucket, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};

//버킷 내 파일 목록 조회
export const listImages = async (
  bucket: StorageBucket,
  folder?: string
): Promise<{ success: boolean; files?: any[]; error?: string }> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder || '', {
      limit: 100,
      offset: 0,
    });

    if (error) {
      console.error('List error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, files: data };
  } catch (error) {
    console.error('List exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'List failed',
    };
  }
};

//여러 이미지 업로드
export const uploadMultipleImages = async (
  files: File[],
  bucket: StorageBucket,
  folder?: string
): Promise<UploadResult[]> => {
  const results = await Promise.all(files.map((file) => uploadImage(file, bucket, folder)));
  return results;
};
