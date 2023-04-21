import { existsSync, unlink, readdirSync } from 'fs';
import { promisify } from 'util';

/**
 * Generate unique string with time now().
 *
 * @param {string} filename
 *
 * @returns {string}
 */
export const generateDate = (): string => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const date = today.toISOString();

  const year = date.substring(0, 10);
  const hour = date.substring(11, 19).replace(new RegExp(':', 'g'), '-');

  return `${year}-${hour}`;
};

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return existsSync(path);
};

/**
 * Gets files data from a given path via a promise interface.
 *
 * @param {string} path
 *
 * @returns {Promise<string[]>}
 */
export const getAllFiles = async (path: string): Promise<string[]> => {
  const files: string[] = [];
  readdirSync(path).map((file) => {
    if (file !== '.gitkeep') {
      const filename = file.slice(0, -5);
      files.push(filename);
    }
  });
  return files;
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 * @param {string} fileName
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string, filename: string): Promise<void> => {
  const unlinkFunction = promisify(unlink);

  return await unlinkFunction(`${path}${filename}.json`);
};
