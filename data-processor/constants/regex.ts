// Use this regex on the last string in the array to check if it is ending with file extension
// File extension is typically located at the end of the file name and consists of dot symbol and then 3 or 4 letters
export const FILE_EXTENSION_REGEX = /\.\w{3,4}$/;

// This regex captures all sequences of characters that do not contain forward slashes, between forward slashes, across multiple lines.
// It puts into non-capturing group any symbol that is not forward slash (/) one or unlimited times and puts resulting string into capturing group
export const URL_SEGMENTS_REGEX = /(?:(?!\/).)+/gm;
