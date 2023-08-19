## Project setup
We can do this project locally on our machine or in the cloud using the pre-installed environment on VS code. Vs code is a great option if you're on a mobile phone,
or just want to get started without installing anything. We use remix here.

## ## Description
For this project, create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application.


### Executing program

To run the DApp, follow these steps:

1. Install the project dependencies by running the following command:

   ```
   npm install
   ```
2. Start a blockchain locally by running the command: 
   ```
   npx hardhat node
   ```

3. Deploy the Smart contract by running the deployment script:

   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```
4. Go to frontend directory by running the command:

   ```
   cd ./frontend
   ```
5. Install the project dependencies by running the following command:

   ```
   npm install
   ```
6. Start the React development server:

   ```
   npm start
   ```

   The DApp will be accessible in your web browser at `http://localhost:3000`.
### Code 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    string private _ownerName;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        string memory ownerName
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _ownerName = ownerName;
    }

    function getOwnerName() public view returns (string memory) {
        return _ownerName;
    }

    function mint(address account, uint256 amount) public  {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}

The project will be running on our localhost. 
Typically at http://localhost:3000


## Author
Aryan Rawat
aryanrawat5621@gmail.com

