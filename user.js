const readline = require("readline");

// Create a readline interface for command line input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class userLibrary {
  constructor() {
    this.users = [];
  }

  // Method to add a user
  adduser(user) {
    if (this._validateuser(user)) {
      this.users.push(user);
      console.log(`user '${user.username}' added successfully!`);
    } else {
      console.log(
        "Invalid user structure. Please ensure all required fields are present."
      );
    }
  }

  // Method to remove a user by username
  removeuserField(username) {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      console.log(`user '${username}' not found.`);
      return;
    }

    rl.question(
      "Which field do you want to remove? (username, Email, street, age, phone, address)\n",
      (field) => {
        if (
          ["username", "Email", "street", "age", "phone"].includes(field)
        ) {
          user[field] = "";
          console.log(`Field '${field}' has been removed from user '${username}'.`);
        } else if (field === "address") {
          rl.question(
            "Which address field do you want to remove? (name, street, city, postalcode)\n",
            (addressField) => {
              if (
                [
                  "name",
                  "street",
                  "city",
                  "postalcode",
                ].includes(addressField)
              ) {
                user.address[addressField] = "";
                console.log(
                  `address field '${addressField}' has been removed from user '${username}'.`
                );
              } else {
                console.log("Invalid address field. Please try again.");
              }
              userMenu();
            }
          );
        } else {
          console.log("Invalid field. Please try again.");
          userMenu();
        }
      }
    );
  }

  // Method to update a user by username
  updateuser(username, updatedFields) {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      Object.assign(user, updatedFields);
      console.log(`user '${username}' updated successfully!`);
    } else {
      console.log(`user '${username}' not found.`);
    }
  }

  // Method to delete a user by username
  deleteuser(username) {
    const userIndex = this.users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      console.log(`user '${username}' deleted successfully.`);
    } else {
      console.log(`user '${username}' not found.`);
    }
  }

  // Method to list all users
  listusers() {
    if (this.users.length === 0) {
      console.log("No users found.");
    } else {
      console.log("Listing all users:");
      this.users.forEach((user, index) => {
        console.log(`\nuser ${index + 1}:`);
        console.log(`username: ${user.username}`);
        console.log(`Email: ${user.Email}`);
        console.log(`street: ${user.street}`);
        console.log(`age: ${user.age}`);
        console.log(`phone: ${user.phone}`);
        console.log("address:");
        console.log(`  - address name: ${user.address.name}`);
        console.log(`  - street: ${user.address.street}`);
        console.log(`  - address Email: ${user.address.city}`);
        console.log(`  - address Phone: ${user.address.postalcode}`);
      });
    }
  }

  // Internal method to validate user structure
  _validateuser(user) {
    const requiredFields = [
      "username",
      "Email",
      "street",
      "age",
      "phone",
      "address",
    ];
    const requiredaddressFields = [
      "name",
      "street",
      "city",
      "postalcode",
    ];

    // Check if required fields are present in user object
    for (let field of requiredFields) {
      if (!user.hasOwnProperty(field)) {
        return false;
      }
    }

    // Check if required fields are present in address object
    for (let field of requiredaddressFields) {
      if (!user.address || !user.address.hasOwnProperty(field)) {
        return false;
      }
    }

    return true;
  }
}

// Initialize user library
const userLib = new userLibrary();

// Function to prompt the user for updated user details
function updateuserFromInput(username) {
  if (userLib.users.length === 0) {
    console.log("No users available to update.");
    userMenu(); // Return to the menu if no users are available
    return;
  }
  const updatedFields = { address: {} };

  rl.question("Enter new user username (or leave empty to skip): ", (newusername) => {
    if (newusername) updatedFields.username = newusername;

    rl.question(
      "Enter new user Email  (or leave empty to skip): ",
      (newEmail) => {
        if (newEmail) updatedFields.Email = newEmail;

        rl.question(
          "Enter new user street (or leave empty to skip): ",
          (newstreet) => {
            if (newstreet) updatedFields.street = newstreet;

            rl.question(
              "Enter new user age (or leave empty to skip): ",
              (newage) => {
                if (newage) updatedFields.age = newage;

                rl.question(
                  "Enter new user phone (or leave empty to skip): ",
                  (newphone) => {
                    if (newphone) updatedFields.phone = newphone;

                    rl.question(
                      "Enter new address name (or leave empty to skip): ",
                      (newaddressName) => {
                        if (newaddressName)
                          updatedFields.address.name = newaddressName;

                        rl.question(
                          "Enter new street (or leave empty to skip): ",
                          (newaddressstreet) => {
                            if (newaddressstreet)
                              updatedFields.address.street =
                                newaddressstreet;

                            rl.question(
                              "Enter new address  (or leave empty to skip): ",
                              (newcity) => {
                                if (newcity)
                                  updatedFields.address.city =
                                    newcity;

                                rl.question(
                                  "Enter new address postal code (or leave empty to skip): ",
                                  (newpostalcode) => {
                                    if (newpostalcode)
                                      updatedFields.address.postalcode =
                                        newpostalcode;

                                    // Only update the fields that have been provided
                                    const currentuser = userLib.users.find(
                                      (user) => user.username === username
                                    );

                                    // Merge only non-empty fields into the existing user
                                    Object.keys(updatedFields).forEach(
                                      (field) => {
                                        if (field === "address") {
                                          Object.keys(
                                            updatedFields.address
                                          ).forEach((addressField) => {
                                            if (
                                              updatedFields.address[
                                                addressField
                                              ]
                                            ) {
                                              currentuser.address[addressField] =
                                                updatedFields.address[
                                                  addressField
                                                ];
                                            }
                                          });
                                        } else if (updatedFields[field]) {
                                          currentuser[field] =
                                            updatedFields[field];
                                        }
                                      }
                                    );

                                    // Confirm the update
                                    console.log(
                                      `user '${username}' updated successfully!`
                                    );

                                    // Go back to the main menu
                                    userMenu();
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

// Menu function for user choice
function userMenu() {
  rl.question(
    "Select an option:\n1. Add user\n2. Remove user\n3. Update user\n4. Delete user\n5. List users\n6. Exit\n",
    (choice) => {
      switch (choice) {
        case "1":
          // Add user
          adduserFromInput();
          break;

        case "2":
          // Remove user field
          if (userLib.users.length === 0) {
            console.log("No users available to modify.");
            userMenu();
          } else {
            rl.question(
              "Enter the username of the user you want to modify: ",
              (removeusername) => {
                userLib.removeuserField(removeusername);
              }
            );
          }
          return;

        case "3":
          // Update user
          if (userLib.users.length === 0) {
            console.log("No users available to update.");
            userMenu();
          } else {
            rl.question(
              "Enter the username of the user you want to update: ",
              (updateusername) => {
                updateuserFromInput(updateusername);
              }
            );
          }
          return;

        case "4":
          // Delete user
          if (userLib.users.length === 0) {
            console.log("No users available to delete.");
            userMenu();
          } else {
            rl.question(
              "Enter the username of the user you want to delete: ",
              (deleteusername) => {
                userLib.deleteuser(deleteusername);
                userMenu();
              }
            );
          }
          return;

        case "5":
          // List all users
          userLib.listusers();
          userMenu();
          return;

        case "6":
          // Exit
          console.log("Exiting the program...");
          rl.close();
          return;

        default:
          console.log("Invalid choice. Please try again.");
      }

      // Call the menu again
      userMenu();
    }
  );
}

// Function to prompt the user for user details
function adduserFromInput() {
  const user = { address: {} };

  rl.question("Enter user username: ", (username) => {
    user.username = username;

    rl.question("Enter user Email : ", (Email) => {
      user.Email = Email;

      rl.question("Enter user street: ", (street) => {
        user.street = street;

        rl.question("Enter user age: ", (age) => {
          user.age = age;

          rl.question("Enter user phone: ", (phone) => {
            user.phone = phone;

            rl.question("Enter address name: ", (addressName) => {
              user.address.name = addressName;

              rl.question(
                "Enter street: ",
                (addressstreet) => {
                  user.address.street = addressstreet;

                  rl.question(
                    "Enter address : ",
                    (city) => {
                      user.address.city = city;

                      rl.question(
                        "Enter address postal code: ",
                        (postalcode) => {
                          user.address.postalcode = postalcode;

                          // Add the user to the library
                          userLib.adduser(user);

                          // Go back to the main menu
                          userMenu();
                        }
                      );
                    }
                  );
                }
              );
            });
          });
        });
      });
    });
  });
}

// Start the user menu
userMenu();
