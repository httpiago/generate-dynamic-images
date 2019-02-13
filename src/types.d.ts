type FileType = 'jpeg' | 'png'

interface ChromeLaunchConfigs {
  args: string[];
  executablePath?: string;
  headless?: boolean;
}
