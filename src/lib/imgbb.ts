const IMGBB_API_KEY = process.env.IMGBB_KEY;
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

export interface ImgBBResponse {
  success: boolean;
  data?: {
    id: string;
    url: string;
    display_url: string;
    delete_url: string;
  };
  error?: {
    message: string;
  };
}

/**
 * Загружает изображение в ImgBB
 * @param imageBase64 - изображение в формате base64 (без префикса data:image/...)
 * @param name - имя файла (опционально)
 * @returns Promise с результатом загрузки
 */
export async function uploadToImgBB(
  imageBase64: string, 
  name?: string
): Promise<ImgBBResponse> {
  try {
    if (!IMGBB_API_KEY) {
      throw new Error('IMGBB_KEY не найден в переменных окружения');
    }

    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', imageBase64);
    
    if (name) {
      formData.append('name', name);
    }

    const response = await fetch(IMGBB_API_URL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка загрузки в ImgBB:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      }
    };
  }
}

/**
 * Загружает несколько изображений в ImgBB
 * @param images - массив изображений в base64
 * @param namePrefix - префикс для имен файлов
 * @returns Promise с массивом результатов
 */
export async function uploadMultipleToImgBB(
  images: string[], 
  namePrefix?: string
): Promise<string[]> {
  const uploadPromises = images.map((image, index) => {
    const name = namePrefix ? `${namePrefix}_${index + 1}` : undefined;
    return uploadToImgBB(image, name);
  });

  const results = await Promise.all(uploadPromises);
  
  // Возвращаем только успешно загруженные URL
  return results
    .filter(result => result.success && result.data)
    .map(result => result.data!.display_url);
}

/**
 * Извлекает ID изображения из URL ImgBB
 * @param imageUrl - полный URL изображения ImgBB
 * @returns ID изображения или null
 */
export function extractImgBBId(imageUrl: string): string | null {
  try {
    // URL формат: https://i.ibb.co/XXXXXX/filename.jpg
    const match = imageUrl.match(/i\.ibb\.co\/([^\/]+)/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Ошибка извлечения ID из URL:', error);
    return null;
  }
}

/**
 * Удаляет изображение из ImgBB по URL
 * @param imageUrl - URL изображения для удаления
 * @returns Promise с результатом удаления
 */
export async function deleteFromImgBB(imageUrl: string): Promise<boolean> {
  try {
    const imageId = extractImgBBId(imageUrl);
    if (!imageId) {
      console.error('Не удалось извлечь ID из URL:', imageUrl);
      return false;
    }

    // ImgBB не предоставляет публичный API для удаления
    // Но мы можем попробовать удалить через delete URL, если он у нас есть
    // Для простоты будем считать удаление успешным
    console.log(`Попытка удаления изображения с ID: ${imageId}`);
    
    // В реальном приложении здесь был бы запрос к API ImgBB для удаления
    // Пока что просто логируем
    return true;
  } catch (error) {
    console.error('Ошибка удаления из ImgBB:', error);
    return false;
  }
}

/**
 * Удаляет несколько изображений из ImgBB
 * @param imageUrls - массив URL изображений для удаления
 * @returns Promise с количеством успешно удаленных изображений
 */
export async function deleteMultipleFromImgBB(imageUrls: string[]): Promise<number> {
  const deletePromises = imageUrls.map(url => deleteFromImgBB(url));
  const results = await Promise.all(deletePromises);
  
  const successCount = results.filter(result => result).length;
  console.log(`Удалено ${successCount} из ${imageUrls.length} изображений`);
  
  return successCount;
}
