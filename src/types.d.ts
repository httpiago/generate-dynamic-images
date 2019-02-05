type FileType = 'jpeg' | 'png'

interface PropTypes {
  title?: string;
}

interface ChromeConfigs {
  args: string[];
  executablePath: string;
  headless: boolean;
}