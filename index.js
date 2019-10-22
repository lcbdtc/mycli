#!/usr/bin/env node

const cm = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const down=require('./download')
cm.version('1.0.0','-v --version')
cm.command('init <name>').action((name)=>{
  //? What do you want to call this project hello
//{ projectName: 'hello' }
  inquirer.prompt([
    {
      type:'input',
      name:'projectName',
      message:'What do you want to call this project'
    }
  ]).then((answer)=>{
    down(answer.projectName)
  })
})
cm.parse(process.argv)