type FileType = 'jpeg' | 'png'

interface PropTypes {
  [key: string]: any
}

interface ScreenshotOptions {
  filePath: string;
  fileType?: FileType;
  quality?: number;
  omitBackground?: boolean;
}

interface ChromeConfigs {
  args: string[];
  executablePath: string;
  headless: boolean;
}