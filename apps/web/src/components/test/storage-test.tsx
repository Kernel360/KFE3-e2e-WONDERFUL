'use client';

import { useState, useEffect } from 'react';

import { uploadMultipleImages, deleteImage, listImages } from '@/lib/supabase/storage';

interface UploadedFile {
  name: string;
  url: string;
  path: string;
  auctionId?: string;
}

const StorageTest = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string>('');

  // 경매별 파일 목록
  const [auctionFiles, setAuctionFiles] = useState<{ [key: string]: UploadedFile[] }>({});
  const [loadingAuctions, setLoadingAuctions] = useState(false);

  // 전체 파일 목록
  const [allFiles, setAllFiles] = useState<UploadedFile[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  // 컴포넌트 마운트 시 파일 목록 로드
  useEffect(() => {
    loadAuctionFiles();
    loadAllFiles();
  }, []);

  // 다중 파일 업로드
  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setResult('');

    try {
      const auctionId = `auction-${Date.now().toString().slice(-6)}`;
      const fileArray = Array.from(files);
      const results = await uploadMultipleImages(fileArray, 'auction-images', auctionId);

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        setResult(
          `${successCount}개 업로드 성공! (${auctionId})${failCount > 0 ? ` | ${failCount}개 실패` : ''}`
        );
        setFiles(null);
        // 목록 새로고침
        loadAuctionFiles();
        loadAllFiles();
      } else {
        setResult(`모든 파일 업로드 실패`);
      }
    } catch (error) {
      setResult(`업로드 오류: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  // 경매별 파일 목록 로드
  const loadAuctionFiles = async () => {
    setLoadingAuctions(true);
    try {
      const result = await listImages('auction-images', '');

      if (result.success && result.files) {
        const auctionData: { [key: string]: UploadedFile[] } = {};

        for (const folder of result.files) {
          if (folder.name && folder.name.startsWith('auction-')) {
            const folderResult = await listImages('auction-images', folder.name);

            if (folderResult.success && folderResult.files) {
              const folderFiles = folderResult.files
                .filter((file) => file.name && !file.name.endsWith('/'))
                .map((file) => ({
                  name: file.name,
                  url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/auction-images/${folder.name}/${file.name}`,
                  path: `${folder.name}/${file.name}`,
                  auctionId: folder.name,
                }));

              if (folderFiles.length > 0) {
                auctionData[folder.name] = folderFiles;
              }
            }
          }
        }

        setAuctionFiles(auctionData);
      }
    } catch (error) {
      console.error('경매별 파일 로드 실패:', error);
    } finally {
      setLoadingAuctions(false);
    }
  };

  // 전체 파일 목록 로드
  const loadAllFiles = async () => {
    setLoadingAll(true);
    try {
      const result = await listImages('auction-images', '');

      if (result.success && result.files) {
        const allFilesList: UploadedFile[] = [];

        for (const folder of result.files) {
          if (folder.name && folder.name.startsWith('auction-')) {
            const folderResult = await listImages('auction-images', folder.name);

            if (folderResult.success && folderResult.files) {
              const folderFiles = folderResult.files
                .filter((file) => file.name && !file.name.endsWith('/'))
                .map((file) => ({
                  name: file.name,
                  url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/auction-images/${folder.name}/${file.name}`,
                  path: `${folder.name}/${file.name}`,
                  auctionId: folder.name,
                }));

              allFilesList.push(...folderFiles);
            }
          }
        }

        setAllFiles(allFilesList);
      }
    } catch (error) {
      console.error('전체 파일 로드 실패:', error);
    } finally {
      setLoadingAll(false);
    }
  };

  // 파일 삭제
  const handleDelete = async (filePath: string, fileName: string) => {
    if (!confirm(`"${fileName}" 삭제하시겠습니까?`)) return;

    try {
      const deleteResult = await deleteImage('auction-images', filePath);

      if (deleteResult.success) {
        setResult(`"${fileName}" 삭제 완료`);
        loadAuctionFiles();
        loadAllFiles();
      } else {
        setResult(`삭제 실패: ${deleteResult.error}`);
      }
    } catch (error) {
      setResult(`삭제 오류: ${error}`);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold">Storage 테스트</h1>

      {/* 파일 업로드 */}
      <div className="border p-4">
        <h2 className="mb-2 font-semibold">다중 파일 업로드</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="mb-2 block"
        />
        {files && files.length > 0 && <p className="mb-2 text-sm">선택된 파일: {files.length}개</p>}
        <button
          onClick={handleUpload}
          disabled={!files || files.length === 0 || uploading}
          className="bg-blue-500 px-3 py-1 text-white disabled:bg-gray-400"
        >
          {uploading ? '업로드 중...' : '업로드'}
        </button>
      </div>

      {/* 결과 메시지 */}
      {result && (
        <div className="border bg-gray-50 p-2">
          <p className="text-sm">{result}</p>
        </div>
      )}

      {/* 경매별 파일 목록 */}
      <div className="border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">경매별 파일 목록</h2>
          <button
            onClick={loadAuctionFiles}
            disabled={loadingAuctions}
            className="bg-green-500 px-2 py-1 text-sm text-white disabled:bg-gray-400"
          >
            {loadingAuctions ? '로딩...' : '새로고침'}
          </button>
        </div>

        {loadingAuctions ? (
          <p>로딩 중...</p>
        ) : Object.keys(auctionFiles).length === 0 ? (
          <p>업로드된 경매가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(auctionFiles).map(([auctionId, files]) => (
              <div key={auctionId} className="border p-2">
                <h3 className="mb-2 font-medium">
                  {auctionId} ({files.length}개)
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="border p-1">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="mb-1 h-16 w-full object-cover"
                      />
                      <p className="truncate text-xs">{file.name}</p>
                      <div className="flex gap-1 text-xs">
                        <a
                          href={file.url}
                          target="_blank"
                          className="text-blue-600"
                          rel="noreferrer"
                        >
                          보기
                        </a>
                        <button
                          onClick={() => handleDelete(file.path, file.name)}
                          className="text-red-600"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 전체 파일 목록 */}
      <div className="border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">전체 파일 목록 ({allFiles.length}개)</h2>
          <button
            onClick={loadAllFiles}
            disabled={loadingAll}
            className="bg-purple-500 px-2 py-1 text-sm text-white disabled:bg-gray-400"
          >
            {loadingAll ? '로딩...' : '새로고침'}
          </button>
        </div>

        {loadingAll ? (
          <p>로딩 중...</p>
        ) : allFiles.length === 0 ? (
          <p>업로드된 파일이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-6 gap-2">
            {allFiles.map((file, index) => (
              <div key={index} className="border p-1">
                <img src={file.url} alt={file.name} className="mb-1 h-12 w-full object-cover" />
                <p className="truncate text-xs">{file.auctionId?.replace('auction-', '')}</p>
                <p className="truncate text-xs">{file.name}</p>
                <div className="flex gap-1 text-xs">
                  <a href={file.url} target="_blank" className="text-blue-600" rel="noreferrer">
                    보기
                  </a>
                  <button
                    onClick={() => handleDelete(file.path, file.name)}
                    className="text-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageTest;
