type FileType = 'jpeg' | 'png'

interface PropTypes {
  [key: string]: any
}

interface ChromeConfigs {
  args: string[];
  executablePath: string;
  headless: boolean;
}