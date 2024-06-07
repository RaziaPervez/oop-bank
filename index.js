#! /usr/bin/env node 
import inquirer from 'inquirer';
import chalk from "chalk";
class BankAccount {
    accountNumber;
    accountHolder;
    balance = 10000;
    constructor(accountNumber, accountHolder) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.green(`Deposited $${amount}`));
        }
        else {
            console.log(chalk.red('Invalid amount.'));
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawn $${amount}`));
        }
        else {
            console.log(chalk.red('Invalid amount or insufficient balance.'));
        }
    }
    getBalance() {
        console.log(chalk.blueBright(`Account balance: $${this.balance}`));
    }
}
async function manageAccount() {
    console.log(chalk.bgBlue("\n\tWelcome to MY BANK App \n"));
    const accountInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'accountNumber',
            message: 'Enter your account number:',
        },
        {
            type: 'input',
            name: 'accountHolder',
            message: 'Enter your account holder name:',
        },
    ]);
    const bankAccount = new BankAccount(accountInput.accountNumber, accountInput.accountHolder);
    const actions = [
        'Deposit funds',
        'Withdraw funds',
        'View account balance',
        'Exit',
    ];
    const actionChoice = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedAction',
            message: 'Select an action:',
            choices: actions,
        },
    ]);
    switch (actionChoice.selectedAction) {
        case actions[0]:
            const depositInput = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the amount to deposit:',
                    validate: (value) => parseFloat(value) >= 0 || 'Please enter a valid amount',
                },
            ]);
            bankAccount.deposit(parseFloat(depositInput.amount));
            break;
        case actions[1]:
            const withdrawInput = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the amount to withdraw:',
                    validate: (value) => parseFloat(value) >= 0 || 'Please enter a valid amount',
                },
            ]);
            bankAccount.withdraw(parseFloat(withdrawInput.amount));
            break;
        case actions[2]:
            bankAccount.getBalance();
            break;
        case actions[3]:
            console.log(chalk.bgGreenBright.bold('Thank you for using MyBank. Goodbye!'));
            return;
    }
    manageAccount();
}
manageAccount();
