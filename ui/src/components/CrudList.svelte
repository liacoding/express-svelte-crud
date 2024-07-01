<script>
    import { onMount } from 'svelte'; // Import the onMount lifecycle function from Svelte

    let users = []; // Define an array to hold the list of users
    let newUser = { first_name: '', last_name: '', age: '', city: '', state: '' }; // Define an object to hold the new user's details
    let apiUrl = 'http://localhost:3000/users'; // Define the base URL for the API
    let errorMessage = ''; // Define a variable to hold error messages

    // Fetch users from API (GET request)
    async function fetchUsers() {
        const response = await fetch(apiUrl); // Make a GET request to the API endpoint
        users = await response.json(); // Parse the response as JSON and assign it to the users array
    }

    // Add a new user (POST request)
    async function addUser() {
        // Check if all fields of the new user are filled
        if (newUser.first_name.trim() && newUser.last_name.trim() && newUser.age && newUser.city.trim() && newUser.state.trim()) {
            errorMessage = ''; // Clear any previous error messages
            const response = await fetch(apiUrl, {
                method: 'POST', // Specify the request method as POST
                headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
                body: JSON.stringify(newUser) // Convert the new user object to JSON and send it in the request body
            });
            if (response.ok) { // If the response is OK (status 200-299)
                newUser = { first_name: '', last_name: '', age: '', city: '', state: '' }; // Reset the new user object to empty
                await fetchUsers(); // Fetch the updated list of users
            } else {
                console.error('Failed to add user'); // Log an error message if the request failed
            }
        } else {
            errorMessage = 'All fields are required.'; // Set an error message if validation fails
        }
    }

    // Update a user (PUT request)
    async function updateUser(id) {
        const userToUpdate = users.find(user => user.id === id); // Find the user to update by ID
        const updatedUser = { ...userToUpdate };

        // Use prompt to update each field
        updatedUser.first_name = prompt('Update First Name', userToUpdate.first_name) || userToUpdate.first_name;
        updatedUser.last_name = prompt('Update Last Name', userToUpdate.last_name) || userToUpdate.last_name;
        updatedUser.age = prompt('Update Age', userToUpdate.age) || userToUpdate.age;
        updatedUser.city = prompt('Update City', userToUpdate.city) || userToUpdate.city;
        updatedUser.state = prompt('Update State', userToUpdate.state) || userToUpdate.state;

        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT', // Specify the request method as PUT
            headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
            body: JSON.stringify(updatedUser) // Convert the updated user object to JSON and send it in the request body
        });

        if (response.ok) { // If the response is OK
            await fetchUsers(); // Fetch the updated list of users
        } else {
            console.error('Failed to update user'); // Log an error message if the request failed
        }
    }

    // Delete a user (DELETE request)
    async function deleteUser(id) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE' // Specify the request method as DELETE
        });
        if (response.ok) { // If the response is OK
            await fetchUsers(); // Fetch the updated list of users
        } else {
            console.error('Failed to delete user'); // Log an error message if the request failed
        }
    }

    onMount(fetchUsers); // Fetch the list of users when the component is mounted
</script>

<div>
    <h2>Add a new user</h2>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p> <!-- Display the error message if it exists -->
    {/if}
    <input bind:value={newUser.first_name} placeholder="First Name" /> <!-- Input for the user's first name -->
    <input bind:value={newUser.last_name} placeholder="Last Name" /> <!-- Input for the user's last name -->
    <input bind:value={newUser.age} type="number" placeholder="Age" /> <!-- Input for the user's age -->
    <input bind:value={newUser.city} placeholder="City" /> <!-- Input for the user's city -->
    <input bind:value={newUser.state} placeholder="State" /> <!-- Input for the user's state -->
    <button on:click={addUser}>Add</button> <!-- Button to add the new user -->
</div>

<h2>Users List</h2>
<ul>
    {#each users as user (user.id)}
        <li class="user-item">
            <span>{user.first_name} {user.last_name}, {user.age}, {user.city}, {user.state}</span> <!-- Display the user's details -->
            <div class="buttons">
                <button on:click={() => updateUser(user.id)}>Update</button> <!-- Button to update the user -->
                <button on:click={() => deleteUser(user.id)}>Delete</button> <!-- Button to delete the user -->
            </div>
        </li>
    {/each}
</ul>

<style>
    div {
        margin-bottom: 1em;
    }
    input {
        padding: 0.5em;
        margin-right: 0.5em;
    }
    button {
        padding: 0.5em;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li.user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5em 0;
    }
    span {
        flex-grow: 1; /* Allow the span to grow to fill the available space */
        text-align: left; /* Center text inside the span */
        padding-left: 25em; /* Adjust this value to control spacing to the left */
    }
    .buttons {
        display: flex;
        gap: 0.5em;
        transform: translateX(-27em);
        margin-top: 1.1em;
    }
</style>