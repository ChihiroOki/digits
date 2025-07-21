🧭 Application Walkthrough<br>
🏠 Home Page (/)<br>
Displays a welcoming landing page.
[](https://github.com/ChihiroOki/digits/blob/main/doc/1.png)

Provides links to sign in and view contacts.

👤 Sign In Page (/signin)
Allows users to sign in with a test account (john@foo.com).

Authentication is handled via session.

📇 Contact List (/list)
Displays a list of all contacts for the logged-in user.

Each contact shows name, phone, and email.

Users can navigate to Edit or Delete individual contacts.

➕ Add Contact Page (/add)
Provides a form to add a new contact.

Requires name, email, phone number, and contact type.

✏️ Edit Contact Page (/edit/[id])
Allows users to update existing contact details.

🛑 Not Authorized (/not-authorized)
If a user tries to access a restricted route, they are redirected here.
