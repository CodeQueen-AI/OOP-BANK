import inquirer from "inquirer";

// Bank account interface
interface IBankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

// Bank account class
class BankAccount implements IBankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Debit money
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdraw of $${amount} successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient balance");
        }
    }

    // Credit money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    // Check balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}

// Customer class
class Customer {
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastname: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstname = firstName;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create bank accounts
const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2500),
];

// Create customers
const customers: Customer[] = [
    new Customer("Anusha", "Akhter", "Female", 18, 234632749, accounts[0]),
    new Customer("Fatima", "Iqbal", "Female", 22, 234222249, accounts[1]),
    new Customer("Jaweria", "Khan", "Female", 16, 625809749, accounts[2]),
];

// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        
        if (customer) {
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation:",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);
            
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the program!");
                    console.log("\nThank you for using our bank services. Have a nice day!");
                    return;
            }
        } else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
