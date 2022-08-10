import { spawn } from 'child_process';
import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { userInfo } from 'os';

@Command({ name: 'run', arguments: '[task]', options: { isDefault: true } })
export class TaskRunner extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super();
  }
  async run(inputs: string[], options: Record<string, string>): Promise<void> {
    let task = inputs[0];
    if (!task) {
      task = (await this.inquirer.ask<{ task: string }>('task', undefined))
        .task;
    }
    const echo = spawn(task, { shell: options.shell ?? userInfo().shell });
    echo.stdout.on('data', (data: Buffer) => {
      console.log(data.toString());
    });
  }
  @Option({
    flags: '-s, --shell <shell>',
    description: 'A different shell to spawn than the default',
  })
  parseShell(val: string) {
    return val;
  }
}
