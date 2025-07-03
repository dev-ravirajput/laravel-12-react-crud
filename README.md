---

## 🚀 Laravel 12 + React + Inertia CRUD

A modern full-stack **CRUD application** using **Laravel 12**, **React (via Inertia.js)**, and **Vite**. This setup combines the power of Laravel’s backend with the flexibility of React’s frontend — without needing a traditional REST API.

---

### 📦 Tech Stack

* **Laravel 12** – Modern PHP framework for backend logic and routing
* **React 18** – Component-based frontend UI
* **Inertia.js** – Connects Laravel and React without a REST API
* **Vite** – Super-fast asset bundler and dev server
* **Tailwind CSS** – Utility-first styling framework
* **TypeScript** – For strong typing in React components

---

### 📁 Features

✅ Create, Read, Update, Delete (CRUD) operations
✅ Flash messages after success actions
✅ Reusable layout and breadcrumb system
✅ Clean UI with Tailwind CSS
✅ Fully typed React components (TypeScript)
✅ Server-side routing with Inertia

---

### 🧩 Folder Structure

```
├── app/Http/Controllers        → Laravel Controllers
├── resources/js                → React + Inertia frontend
│   ├── Pages/Posts             → Posts CRUD views
│   ├── Layouts                 → App layout wrapper
│   ├── Components              → Reusable components
│   └── types.ts                → Global TypeScript types
├── routes/web.php              → Laravel routes (Inertia-based)
└── public/                     → Public assets
```

---

### 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/laravel-12-react-crud.git
cd laravel-12-react-crud

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy env file
cp .env.example .env
php artisan key:generate

# Set up database and run migrations
php artisan migrate

# Start the dev server
npm run dev
php artisan serve
```

---

### 🔄 CRUD Flow Example

1. Go to `/posts`
2. Click `Create New Post`
3. Fill in the form and submit
4. See post listed with options to `View`, `Edit`, or `Delete`

---

### 💬 Flash Message Example

After a successful action (like creating a post), a success alert appears:

```php
return redirect()->route('posts.index')->with('flash', [
    'message' => 'Post created successfully.',
    'type' => 'success',
]);
```

And is shown in React via `usePage().props.flash`.

---

### 🧪 Testing

Add feature tests in `tests/Feature/PostTest.php`:

```php
public function test_user_can_create_post()
{
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('posts.store'), [
        'title' => 'Test Post',
        'content' => 'Lorem ipsum',
    ]);

    $response->assertRedirect(route('posts.index'));
    $this->assertDatabaseHas('posts', ['title' => 'Test Post']);
}
```

---

### 📚 Credits

* Laravel by [Taylor Otwell](https://github.com/taylorotwell)
* Inertia.js by [Jonathan Reinink](https://github.com/reinink)
* Tailwind CSS by [Adam Wathan](https://github.com/adamwathan)

---

### 🧑‍💻 Author

**Ravi Rajput**
🔗 [Portfolio](https://dev-ravirajput.github.io)
🔗 [GitHub](https://github.com/dev-ravirajput)
🔗 [LinkedIn](https://www.linkedin.com/in/dev-ravirajput/)

---

Let me know if you'd like:

* 🧪 API testing support
* 🐳 Docker setup
* 📦 Production build instructions
* 📝 Blog-style documentation

