import simpleGit, { SimpleGit, SimpleGitTaskCallback } from 'simple-git';
import { exec, ExecException } from 'child_process';
import kleur from 'kleur';
import fs from 'fs';

const template = 'https://github.com/wicaromendes/Monalisa';
const git: SimpleGit = simpleGit(); // Instantiate the simple-git package

const createProject = (projectName: string): void => {
  // Check if the folder already exists
  if (fs.existsSync(projectName)) {
    console.error(kleur.red(`[Monalisa-CLI] The folder "${projectName}" already exists. Choose a different name.`));
    process.exit(1);
  }

  // Clone the project from the template URL
  git.clone(template, projectName, {}, (err: ExecException | null, result?: string) => {
    console.log(
      '\n' +
      kleur.bold().green('==== Project Creation Start ====\n') +
      kleur.green('Date: ') + new Date().toLocaleString() + '\n' +
      kleur.green('Author: ') + 'Wicaro Mendes\n' +
      kleur.green('Version: ') + '1.0.0\n' +
      kleur.green('Location: ') + 'https://github.com/wicaromendes/Monalisa\n' +
      kleur.green('Description: ') + 'Monalisa is a project that combines the use of Express.js, a web framework for Node.js, with a boilerplate. It was created to simplify the process of creating web applications by providing a robust and flexible initial structure.\n' +
      kleur.bold().green('\n=======================================\n')
    );

    // Check if there was an error cloning the project
    if (err) {
      console.error(kleur.red('[Monalisa-CLI] Could not create project! Try again later.'));
      console.error(err);
      process.exit(1);
    }

    // Project cloned successfully
    console.log('\n' + kleur.green('[Monalisa-CLI] Template successfully cloned!'));

    // Get the cloned project's path
    const projectPath = `${process.cwd()}/${projectName}`;
    process.chdir(projectPath);

    // Install cloned project dependencies
    const installCommand = 'npm install';

    // Execute the command to install packages
    exec(installCommand, (installErr: ExecException | null, installStdout: string, installStderr: string) => {
      // Check if there was an error installing project dependencies
      if (installErr) {
        console.error(kleur.red('Error installing dependencies.'));
        console.error(installErr);
        process.exit(1);
      }

      console.log('\n' + kleur.green('[Monalisa-CLI] Dependencies successfully installed!'));
      console.log(kleur.green(`\n[Monalisa-CLI] Project "${projectName}" successfully created!`));
      console.log(`\n[Monalisa-CLI] You can start working on the project by running:\n\n cd ${projectName}\n npm run start:dev \n`);
      process.exit(0); // Terminate the Node.js process with exit code 0 (success)
    });
  });
};

export default createProject;
