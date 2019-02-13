type FileType = 'jpeg' | 'png'

interface ChromeConfigs {
  args: string[];
  executablePath: string;
  headless: boolean;
}
