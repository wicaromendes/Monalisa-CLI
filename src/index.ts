#!/usr/bin/env node

import { Command } from "commander";
import createProject from "./Commands/CreateProject/createProject";

const program = new Command();

program
  .command('new <project-name>')
  .description('Cria um novo projeto')
  .action((projectName) => {
    createProject(projectName);
  });

program
  .command('help')
  .description('Exibe informações sobre o Monalisa CLI')
  .action(() => {
    console.log('Informações sobre o Monalisa CLI');
  });

program.parse(process.argv);
