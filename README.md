# iShare

iShare is a React frontend for a community platform where people share reviews and digital experiences across dining, healthcare, education, and fashion, and where a business can register alongside an individual account. The client includes a marketing home page, account flows, a profile screen, and posts that can carry an image or a video.

This repository is the client (`ishare-frontend` in `package.json`). Account, profile, and create-post calls expect separate HTTP APIs. The posts list and post detail page read [DummyJSON](https://dummyjson.com). There is no hosted demo in this repository.

## Features

What follows is limited to behavior present in `src/`.

### Home (`/`)

- Fixed navbar with in-page links (Home, About, Services, Users Experience, Team, Contact). Register and Login show when `localStorage` has no `email`. Profile and Logout show when it does. Logout removes that key.
- Landing sections: hero, stat counters, marketing tabs, a services grid (food and beverage, healthcare, education, fashion, business promotion), an experience gallery, a testimonial carousel, membership tiers, a team grid, a contact block, and a footer.
- Experience cards link to `/posts`.
- Membership tiers are static copy: Community Explorer ($0), Experience Pro ($9.99), and Business Insights ($49.99). Their buttons are `#` links.
- The contact form posts to `forms/contact.php`. The footer newsletter posts to `forms/newsletter.php`. Those PHP paths are not in this repository.
- The About navbar target has no matching `id="about"` section.

### Accounts

- `/register-select` offers two paths: user (`/register`) and business owner (`/business-owner-register`).
- User signup validates username, email, password, confirmation, age, and at least one interest. The password rule requires 8 or more characters with an uppercase letter, a lowercase letter, a digit, and one of `@ $ ! % * ? &`. An e-wallet number is optional; if it is filled in, at least one wallet type from the built-in list is required. A “where did you hear about us” radio group is stored in component state and is omitted from the request. A valid form sends `POST http://localhost:5000/user/signup` with username, email, password, password confirmation, age, interests, wallet number, and wallet types, then saves `email` and returns to `/`.
- Business-owner signup collects the same account fields plus business name, business type, country, city, phone number, and description. It sends `POST ${VITE_API_BASE_URL}/businessOwner/login` and, on success, saves `email` and returns to `/`.
- Login (`/login`) checks email format and a password of at least 8 characters, sends `POST http://localhost:5000/user/login`, saves `email`, and navigates to `/`.
- Password fields on signup, business-owner signup, and login can be shown or hidden.

### Profile (`/profile`)

- Loads a single user with `GET http://localhost:1337/api/users/44` and displays that username and email.
- A new photo is previewed locally with `FileReader`. The file is not uploaded.
- Posts, reactions, followers, and following are fixed numbers in the component (25, 120, 300, 150).
- Delete sends `DELETE http://localhost:1337/api/users/:id`.
- `src/pages/UpdateUser.jsx` is a placeholder screen. The Update control links to `/profile/:id`. The nested route that would render `UpdateUser` is commented out in `src/App.jsx`.

### Posts

- `/posts` renders a header, a company-logo carousel, category chips (All Categories, Dining, Healthcare, Education, Fashion), and a card grid.
- Cards are products from `GET https://dummyjson.com/products`. Opening a card goes to `/posts/:id`. The search box and category chips do not change the query. Header links to `/transactions` and `/account` have no routes in `App.jsx`. The create control goes to `/create-post`. A notification badge is a static `3`.
- `/posts/:id` loads `GET https://dummyjson.com/products/:id` and `GET https://dummyjson.com/comments/post/:id`. From that screen the client can like or unlike (`/posts/:id/like` on DummyJSON), add a comment (`POST https://dummyjson.com/comments/add`), delete a comment, and delete the product, then return to `/posts`. Edit navigates to `/edit-post/:id`, which is not registered in `App.jsx`. The author label on the page is the fixed string `kareem Ragab`.
- `/create-post` collects a title, content, one business-name option, and a 1–5 star rating. An image file is required and a video file is optional. Both upload to Cloudinary cloud `dqmp5l622` with upload preset `original` (`/image/upload` and `/video/upload`). The form then sends `POST http://localhost:5000/posts` with title, content, category, image URL, image public id, video URL, video public id, and rating. The submit handler reads `category`, which is not declared in that component.

`PostProvider` in `src/context/context.jsx` wraps every route and calls `axios.get("https://dummyjson.com/products")`. That file does not import `axios`. The posts grid fetches the same URL on its own and does not read the context value.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18 |
| Routing | React Router DOM 7 |
| Build | Vite 6 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| HTTP | Axios |
| Icons | React Icons |
| Carousels | Swiper (testimonials on the home page, company logos on `/posts`) |
| Motion | AOS (posts categories and company carousel) |
| Production static server | `serve` (`npm start`) |
| Lint config | ESLint 9 with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` |

`package.json` also lists `@heroicons/react`, `lenis`, `react-slick`, and `react-toastify`. Nothing under `src/` imports them. ESLint is configured in `eslint.config.js` and ignores `dist`. `package.json` has no `lint` script. `engines` requires Node.js `18.x`.

Fonts (Roboto, Poppins, Raleway) load from Google Fonts in `index.html`. Tailwind maps them to `font-roboto`, `font-poppins`, and `font-raleway`, and maps `mainColor` to `#FF0000` and `hoverColor` to `#af1d24`.

## Getting started

### Prerequisites

- Node.js 18.x (the `engines` field in `package.json`)
- npm

### Install and run

```bash
git clone https://github.com/KareemRagabAbdelhameed/iShare.git
cd iShare
npm install
npm run dev
```

`vite.config.js` does not set a host or port, so the dev server uses Vite’s default: [http://localhost:5173](http://localhost:5173).

### Environment variables

The only environment variable read by the app is `VITE_API_BASE_URL`, in `src/pages/BusinessOwnerRegisterPage.jsx`. Vite exposes variables prefixed with `VITE_` from a `.env` file in the project root. `.gitignore` ignores `.env` and `.env.*.local`. No `.env` file is committed.

```bash
# .env
VITE_API_BASE_URL=http://localhost:5000
```

Restart `npm run dev` after changing it. Business-owner registration calls `${VITE_API_BASE_URL}/businessOwner/login`. With the variable unset, that base URL is `undefined`.

Other bases are string literals in the components. Setting `VITE_API_BASE_URL` does not change them.

| Caller | URL in source |
| --- | --- |
| User signup (`SignUpPage.jsx`) | `http://localhost:5000/user/signup` |
| Login (`LoginPage.jsx`) | `http://localhost:5000/user/login` |
| Create post (`PostsPage/CreatePost.jsx`) | `http://localhost:5000/posts` |
| Profile load (`ProfilePage.jsx`) | `http://localhost:1337/api/users/44` |
| Profile delete (`ProfilePage.jsx`) | `http://localhost:1337/api/users/:id` |
| Posts grid (`PostsPage/PostCard.jsx`, `context/context.jsx`) | `https://dummyjson.com/products` |
| Post detail (`PostsPage/ViewPosts.jsx`) | `https://dummyjson.com/products/:id`, comments, likes, and deletes on `dummyjson.com` |
| Image and video upload (`CreatePost.jsx`) | `https://api.cloudinary.com/v1_1/dqmp5l622/image/upload` and `.../video/upload`, preset `original` |

`ProfilePage.jsx` declares `apiBaseUrl` as `http://localhost:5000` and the profile requests use `http://localhost:1337` directly.

### Scripts

Defined in `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Development server with hot reload |
| `npm run build` | `vite build` | Production bundle written to `dist/` |
| `npm run preview` | `vite preview` | Serves the production build. Vite’s default preview port is 4173. Run `npm run build` first. |
| `npm start` | `serve dist` | Serves the existing `dist/` directory with the `serve` package. `serve` listens on port 3000 unless `PORT` is set. |

## Project structure

```
.
├── index.html                 # Document shell, title "iShare.com", Google Fonts
├── package.json
├── vite.config.js             # React plugin only
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── public/
│   └── vite.svg
├── src/
│   ├── main.jsx               # React root and BrowserRouter
│   ├── App.jsx                # Route table, wrapped in PostProvider
│   ├── App.css
│   ├── index.css              # Tailwind directives
│   ├── context/
│   │   └── context.jsx        # PostProvider
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── assets/
│   │   ├── react.svg
│   │   └── images/
│   │       └── select.jfif    # Image on the role picker and profile
│   └── pages/
│       ├── HomePage/          # Landing sections composed by index.jsx
│       ├── SelesctRPage.jsx   # /register-select
│       ├── SignUpPage.jsx     # /register
│       ├── BusinessOwnerRegisterPage.jsx
│       ├── LoginPage.jsx
│       ├── ProfilePage.jsx
│       ├── UpdateUser.jsx     # Not mounted; route is commented out
│       └── PostsPage/
│           ├── index.jsx      # /posts
│           ├── Header.jsx
│           ├── Companies.jsx
│           ├── Categories.jsx
│           ├── PostCard.jsx
│           ├── ViewPosts.jsx  # /posts/:id
│           └── CreatePost.jsx # /create-post
└── Isharee-Backend            # Gitlink (commit cc5876a) with no .gitmodules entry
```

`Isharee-Backend` is recorded in git as a gitlink (mode `160000`) at commit `cc5876afa41fe90ebc122a97752741b23caf0cd0`. This repository has no `.gitmodules` file, and the working-tree directory is empty, so backend source is not part of this checkout.

`dist/` is the Vite build output and is committed. `.vite/` is Vite’s pre-bundled dependency cache and is committed as well. ESLint ignores `dist`. `.gitignore` ignores `node_modules`, logs, `.env`, and `dist-ssr`.

### Routes

| Path | Component |
| --- | --- |
| `/` | `HomePage` |
| `/register-select` | `SelesctRPage` |
| `/register` | `SignUpPage` |
| `/business-owner-register` | `BusinessOwnerRegisterPage` |
| `/login` | `LoginPage` |
| `/profile` | `ProfilePage` |
| `/posts` | `PostsPage` |
| `/posts/:id` | `ViewPosts` |
| `/create-post` | `CreatePostPage` |

## Screenshots

<!-- TODO: Add screenshots of the home page, role selection, registration, login, profile, posts feed, post detail, and create-post form. The repository has UI assets (src/assets/images/select.jfif, public/vite.svg, src/assets/react.svg) and no application screenshots. -->
