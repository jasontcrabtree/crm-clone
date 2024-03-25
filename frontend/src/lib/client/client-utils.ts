'use client';

/**
 * Converts a URL or a path-like string into a nicely formatted string
 * This function removes any leading '/', and if the string contains a second '/',
 * everything before this second '/' is removed.
 * Then, it replaces remaining '/' with spaces and converts the string to title case.
 *
 * @param {string} item - The URL or path-like string to be formatted.
 * @returns {string} A human-readable string with title casing.
 */
export const formatUrlToReadable = (item: string) => {
  const pathEndIndex = item.indexOf('/', 1);
  let modifiedItem = item;

  if (pathEndIndex !== -1) {
    modifiedItem = item.substring(pathEndIndex + 1);
  }

  const tidyCharacters = modifiedItem.replace(/^\//, '').replace(/\//g, ' ');

  const convertToTitleCase = tidyCharacters
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return convertToTitleCase;
};
